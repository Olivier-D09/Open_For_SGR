grammar StructuralOperationalSemantics


import "../../node_modules/langium/src/grammar/langium-grammar";

entry SoSSpec:
   name=ID
   imports=ImportStatement
   rtdAndRules+=(RuleOpening)+
   ;


//on purpose no if conditions. They should be queried and scheduled by CCSL like ordering
RuleOpening:
    {infer RuleOpening} 
    (name=ID)? 'open' onRule=[ParserRule:ID] '{'
    (m+=MemberCall "#####")*

    '}' 
;

VariableDeclaration returns NamedElement: 
    {infer VariableDeclaration} 
    ('var') ? name=ID (assignment?='=' value=ClassicalExpression)? ';' ; 


ImportStatement:
	'import' importURI=STRING; 


MemberCall infers ClassicalExpression:
	    Primary
	({infer MemberCall.previous=current}
        // Member call with function call
        ("." element=[NamedElement:ID] (
		explicitOperationCall?='('
		(
		    arguments+=ClassicalExpression (',' arguments+=ClassicalExpression)*
		)?
		')')? 
        // Chained function call
        | (
		explicitOperationCall?='('
		(
		    arguments+=ClassicalExpression (',' arguments+=ClassicalExpression)*
		)?
		')'))
    )*;

Primary infers ClassicalExpression:
    '(' ClassicalExpression ')';


type NamedElement = /*Parameter | FunctionDeclaration |*/ VariableDeclaration | RuleOpening | SoSPrimitiveType | RWRule 

RWRule:
    SoSPrimitiveType {infer Primary};


ClassicalExpression:
	{infer Primary};

SoSPrimitiveType:
    name=("string" | "integer" | "boolean" | "void" | "event" | "Timer"); 

// hidden terminal WS: /\s+/;
// terminal ID: /[_a-zA-Z][\w_]*/;
terminal NUMBER returns number: /[0-9]+(\.[0-9]+)?/;
// terminal STRING: /"[^"]*"/;

// hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
// hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
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
    'zaza'
	(m+=MemberCall "toto")*
    'stop'

    '}' 
;

ImportStatement:
	'import' importURI=STRING; 


ClassicalExpression:
    Addition;

// SoSAssignment infers Expression:
//     Addition ({infer BinaryExpression.left=current} operator=('=') right=Addition)*;

Addition infers ClassicalExpression: 
    Multiplication ({infer BinaryExpression.left=current} operator=('+' | '-') right=Multiplication)*;

Multiplication infers ClassicalExpression:
    Logical ({infer BinaryExpression.left=current} operator=('*' | '/') right=Logical)*;

Logical infers ClassicalExpression:
    Comparison ({infer BinaryExpression.left=current} operator=('and' | 'or' | 'xor') right=Comparison)*; 

Comparison infers ClassicalExpression:
    MemberCall ({infer BinaryExpression.left=current} operator=('<' | '<=' | '>' | '>=' | '==' | '!=') right=MemberCall)*; 

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

RWRule:
    NamedArgument;

Primary infers ClassicalExpression:
    ParserRule;


type NamedElement = Parameter | RuleOpening | ParserRule | MemberCall; 

// ClassicalExpression:
//     MemberCall(infers C)
//     elem = [NamedElement:ID];

// hidden terminal WS: /\s+/;
// terminal ID: /[_a-zA-Z][\w_]*/;
terminal NUMBER returns number: /[0-9]+(\.[0-9]+)?/;
// terminal STRING: /"[^"]*"/;

// hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
// hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
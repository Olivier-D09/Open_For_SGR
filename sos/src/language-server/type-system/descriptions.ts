
import { AstNode } from "langium";
import {
    RuleOpening,
    ParserRule
} from "../generated/ast.js"

export type TypeDescription =
    | NilTypeDescription
    | VoidTypeDescription
    | FunctionTypeDescription
    | RuleOpeningTypeDescription
    | ParserRuleTypeDescription
    | ErrorType;

export interface NilTypeDescription {
    readonly $type: "nil"
}

export function createNilType(): NilTypeDescription {
    return {
        $type: "nil"
    };
}

export function isNilType(item: TypeDescription): item is NilTypeDescription {
    return item.$type === "nil";
}

export interface VoidTypeDescription {
    readonly $type: "void"
}

export function createVoidType(): VoidTypeDescription {
    return {
        $type: "void"
    }
}

export function isVoidType(item: TypeDescription): item is VoidTypeDescription {
    return item.$type === "void";
}

export interface FunctionTypeDescription {
    readonly $type: "function"
    readonly returnType: TypeDescription
    readonly parameters: FunctionParameter[]
}

export interface FunctionParameter {
    name: string
    type: TypeDescription
}

export function createFunctionType(returnType: TypeDescription, parameters: FunctionParameter[]): FunctionTypeDescription {
    return {
        $type: "function",
        parameters,
        returnType
    };
}

export function isFunctionType(item: TypeDescription): item is FunctionTypeDescription {
    return item.$type === "function";
}



export interface ParserRuleTypeDescription {
    readonly $type: "ParserRule"
    readonly literal: ParserRule
}

export function createParserRuleType(literal: ParserRule): ParserRuleTypeDescription {
    return {
        $type: "ParserRule",
        literal
    };
}

export function isParserRuleType(item: TypeDescription): item is ParserRuleTypeDescription {
    return item.$type === "ParserRule";
}






export interface RuleOpeningTypeDescription {
    readonly $type: "ruleOpening"
    readonly literal: RuleOpening
}

export function createRuleOpeningType(literal: RuleOpening): RuleOpeningTypeDescription {
    return {
        $type: "ruleOpening",
        literal
    };
}

export function isRuleOpeningType(item: TypeDescription): item is RuleOpeningTypeDescription {
    return item.$type === "ruleOpening";
}

export interface ErrorType {
    readonly $type: "error"
    readonly source?: AstNode
    readonly message: string
}

export function createErrorType(message: string, source?: AstNode): ErrorType {
    return {
        $type: "error",
        message,
        source
    };
}

export function isErrorType(item: TypeDescription): item is ErrorType {
    return item.$type === "error";
}

export function typeToString(item: TypeDescription): string {
    if (isRuleOpeningType(item)) {
        return (item.literal.name === undefined)?"noName":item.literal.name;
    } else if (isFunctionType(item)) {
        const params = item.parameters.map(e => `${e.name}: ${typeToString(e.type)}`).join(', ');
        return `(${params}) => ${typeToString(item.returnType)}`;
    } else {
        return item.$type;
    }
}

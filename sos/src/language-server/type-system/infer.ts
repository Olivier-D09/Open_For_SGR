import { AstNode } from "langium";
import { /*RuleOpening, */isMemberCall, MemberCall, isRuleOpening, RuleOpening, isAssignment, isRuleCall, } from "../generated/ast.js";
import { createRuleOpeningType as createRuleOpeningType, createErrorType, TypeDescription, } from "./descriptions.js";

export function inferType(node: AstNode | undefined, cache: Map<AstNode, TypeDescription>): TypeDescription {
    let type: TypeDescription | undefined;
    if (!node) {
        return createErrorType('Could not infer type for undefined', node);
    }
    const existing = cache.get(node);
    if (existing) {
        return existing;
    }
    // Prevent recursive inference errors
    cache.set(node, createErrorType('Recursive definition', node));
    if ((node)) {
    // } else if ((node)) {
    //     type = inferTypeRef(node, cache);
    } else if (isMemberCall(node)) {
        type = inferMemberCall(node, cache);
    if ((node)) {
    } else if (isRuleOpening(node)) {
        type = createRuleOpeningType(node);
        }
    // } else if (isPrintStatement(node)) {
    //     type = createVoidType();
    // } else if (isReturnStatement(node)) {
    //     if (!node.value) {
    //         type = createVoidType();
    //     } else {
    //         type = inferType(node.value, cache);
    //     }
    } else if(isAssignment(node)){
    }else if(isRuleCall(node)){
        }
        


    if (!type) {
        type = createErrorType('Could not infer type for ' + node.$type, node);
    }

    cache.set(node, type);
    return type;
}

// function inferTypeRef(node: , cache: Map<AstNode, TypeDescription>): TypeDescription {
//     if (node.primitive) {
//         if (node.primitive.name === 'integer') {
//             return ();
//         } else if (node.primitive.name === 'string') {
//             return ();
//         } else if (node.primitive.name === 'boolean') {
//             return ();
//         } else if (node.primitive.name === 'void') {
//             return createVoidType();
//         }
//     } else if (node.reference) {
//         if (node.reference.ref && isRuleOpening(node.reference.ref)) {
//             return createRuleOpeningType(node.reference.ref);
//         }


    // } else if (node.returnType) {
    //     const returnType = inferType(node.returnType, cache);
    //     const parameters = node.parameters.map((e, i) => ({
    //         name: e.name ?? `$${i}`,
    //         type: inferType(e.type, cache)
    //     }));
    //     return createFunctionType(returnType, parameters);


//     }
//     return createErrorType('Could not infer type for this reference', node);
// }

function inferMemberCall(node: MemberCall, cache: Map<AstNode, TypeDescription>): TypeDescription {
    const element = node.element?.ref;
    if (element) {
        return inferType(element, cache);
    }
    // } else if (node.explicitOperationCall && node.previous) {
    //     const previousType = inferType(node.previous, cache);
    //     if (isFunctionType(previousType)) {
    //         return previousType.returnType;
    //     }
    //     return createErrorType('Cannot call operation on non-function type', node);
    // }
    return createErrorType('Could not infer type for element ' + node.element?.$refText, node);
}

// function infer(expr: , cache: Map<AstNode, TypeDescription>): TypeDescription {
//     if (['-', '*', '/', '%'].includes(expr.operator)) {
//         return ();
//     } else if (['and', 'or', '<', '<=', '>', '>=', '==', '!='].includes(expr.operator)) {
//         return ();
//     }
//     const left = inferType(expr.left, cache);
//     const right = inferType(expr.right, cache);
//     if (expr.operator === '+') {
//         if ((left) || (right)) {
//             return ();
//         } else {
//             return ();
//         }
//     }
//     /* else if (expr.operator === ':=') {
//         return right;
//     }*/
//     return createErrorType('Could not infer type from binary expression', expr);
// }

export function getRuleOpeningChain(ruleOpeningItem: RuleOpening): RuleOpening[] {
    const set = new Set<RuleOpening>();
    let value: RuleOpening | undefined = ruleOpeningItem;
    while (value && !set.has(value)) {
        set.add(value);
       // value = value.superClass?.ref;
    }
    // Sets preserve insertion order
    return Array.from(set);
}

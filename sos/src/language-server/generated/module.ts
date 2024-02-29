/******************************************************************************
 * This file was generated by langium-cli 2.1.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import type { LangiumGeneratedServices, LangiumGeneratedSharedServices, LangiumSharedServices, LangiumServices, LanguageMetaData, Module } from 'langium';
import { StructuralOperationalSemanticsAstReflection } from './ast.js';
import { StructuralOperationalSemanticsGrammar } from './grammar.js';

export const StructuralOperationalSemanticsLanguageMetaData = {
    languageId: 'structural-operational-semantics',
    fileExtensions: ['.sos'],
    caseInsensitive: false
} as const satisfies LanguageMetaData;

export const StructuralOperationalSemanticsGeneratedSharedModule: Module<LangiumSharedServices, LangiumGeneratedSharedServices> = {
    AstReflection: () => new StructuralOperationalSemanticsAstReflection()
};

export const StructuralOperationalSemanticsGeneratedModule: Module<LangiumServices, LangiumGeneratedServices> = {
    Grammar: () => StructuralOperationalSemanticsGrammar(),
    LanguageMetaData: () => StructuralOperationalSemanticsLanguageMetaData,
    parser: {}
};

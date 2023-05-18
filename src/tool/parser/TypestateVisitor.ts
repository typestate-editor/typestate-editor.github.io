// Generated from src/tool/Typestate.g4 by ANTLR 4.12.0

import {ParseTreeVisitor} from 'antlr4';


  import { tokenToPos, makeMember, makeId, makeArrayType, makeDecision, makeDecisionState, makeDeclaration, makeMethod, makeState, makePackage, makeImport, makeTypestate } from "../ast_nodes";


import { StartContext } from "./TypestateParser";
import { RefContext } from "./TypestateParser";
import { JavaTypeContext } from "./TypestateParser";
import { Package_statementContext } from "./TypestateParser";
import { Import_statementContext } from "./TypestateParser";
import { Typestate_declarationContext } from "./TypestateParser";
import { Typestate_bodyContext } from "./TypestateParser";
import { State_declarationContext } from "./TypestateParser";
import { State_bodyContext } from "./TypestateParser";
import { MethodContext } from "./TypestateParser";
import { Decision_stateContext } from "./TypestateParser";
import { DecisionContext } from "./TypestateParser";
import { IdContext } from "./TypestateParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `TypestateParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class TypestateVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `TypestateParser.start`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStart?: (ctx: StartContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.ref`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRef?: (ctx: RefContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.javaType`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJavaType?: (ctx: JavaTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.package_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPackage_statement?: (ctx: Package_statementContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.import_statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImport_statement?: (ctx: Import_statementContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.typestate_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypestate_declaration?: (ctx: Typestate_declarationContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.typestate_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypestate_body?: (ctx: Typestate_bodyContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.state_declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitState_declaration?: (ctx: State_declarationContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.state_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitState_body?: (ctx: State_bodyContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.method`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMethod?: (ctx: MethodContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.decision_state`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecision_state?: (ctx: Decision_stateContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.decision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecision?: (ctx: DecisionContext) => Result;
	/**
	 * Visit a parse tree produced by `TypestateParser.id`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitId?: (ctx: IdContext) => Result;
}


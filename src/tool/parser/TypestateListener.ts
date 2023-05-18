// Generated from src/tool/Typestate.g4 by ANTLR 4.12.0

import {ParseTreeListener} from "antlr4";


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
 * This interface defines a complete listener for a parse tree produced by
 * `TypestateParser`.
 */
export default class TypestateListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `TypestateParser.start`.
	 * @param ctx the parse tree
	 */
	enterStart?: (ctx: StartContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.start`.
	 * @param ctx the parse tree
	 */
	exitStart?: (ctx: StartContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.ref`.
	 * @param ctx the parse tree
	 */
	enterRef?: (ctx: RefContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.ref`.
	 * @param ctx the parse tree
	 */
	exitRef?: (ctx: RefContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.javaType`.
	 * @param ctx the parse tree
	 */
	enterJavaType?: (ctx: JavaTypeContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.javaType`.
	 * @param ctx the parse tree
	 */
	exitJavaType?: (ctx: JavaTypeContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.package_statement`.
	 * @param ctx the parse tree
	 */
	enterPackage_statement?: (ctx: Package_statementContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.package_statement`.
	 * @param ctx the parse tree
	 */
	exitPackage_statement?: (ctx: Package_statementContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.import_statement`.
	 * @param ctx the parse tree
	 */
	enterImport_statement?: (ctx: Import_statementContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.import_statement`.
	 * @param ctx the parse tree
	 */
	exitImport_statement?: (ctx: Import_statementContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.typestate_declaration`.
	 * @param ctx the parse tree
	 */
	enterTypestate_declaration?: (ctx: Typestate_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.typestate_declaration`.
	 * @param ctx the parse tree
	 */
	exitTypestate_declaration?: (ctx: Typestate_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.typestate_body`.
	 * @param ctx the parse tree
	 */
	enterTypestate_body?: (ctx: Typestate_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.typestate_body`.
	 * @param ctx the parse tree
	 */
	exitTypestate_body?: (ctx: Typestate_bodyContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.state_declaration`.
	 * @param ctx the parse tree
	 */
	enterState_declaration?: (ctx: State_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.state_declaration`.
	 * @param ctx the parse tree
	 */
	exitState_declaration?: (ctx: State_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.state_body`.
	 * @param ctx the parse tree
	 */
	enterState_body?: (ctx: State_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.state_body`.
	 * @param ctx the parse tree
	 */
	exitState_body?: (ctx: State_bodyContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.method`.
	 * @param ctx the parse tree
	 */
	enterMethod?: (ctx: MethodContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.method`.
	 * @param ctx the parse tree
	 */
	exitMethod?: (ctx: MethodContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.decision_state`.
	 * @param ctx the parse tree
	 */
	enterDecision_state?: (ctx: Decision_stateContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.decision_state`.
	 * @param ctx the parse tree
	 */
	exitDecision_state?: (ctx: Decision_stateContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.decision`.
	 * @param ctx the parse tree
	 */
	enterDecision?: (ctx: DecisionContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.decision`.
	 * @param ctx the parse tree
	 */
	exitDecision?: (ctx: DecisionContext) => void;
	/**
	 * Enter a parse tree produced by `TypestateParser.id`.
	 * @param ctx the parse tree
	 */
	enterId?: (ctx: IdContext) => void;
	/**
	 * Exit a parse tree produced by `TypestateParser.id`.
	 * @param ctx the parse tree
	 */
	exitId?: (ctx: IdContext) => void;
}


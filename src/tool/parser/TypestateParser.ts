// Generated from src/tool/Typestate.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import TypestateListener from "./TypestateListener.js";
import TypestateVisitor from "./TypestateVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


  import { tokenToPos, makeMember, makeId, makeArrayType, makeDecision, makeDecisionState, makeDeclaration, makeMethod, makeState, makePackage, makeImport, makeTypestate } from "../ast_nodes";

export default class TypestateParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly DROP = 18;
	public static readonly END = 19;
	public static readonly ID = 20;
	public static readonly WS = 21;
	public static readonly BlockComment = 22;
	public static readonly LineComment = 23;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_start = 0;
	public static readonly RULE_ref = 1;
	public static readonly RULE_javaType = 2;
	public static readonly RULE_package_statement = 3;
	public static readonly RULE_import_statement = 4;
	public static readonly RULE_typestate_declaration = 5;
	public static readonly RULE_typestate_body = 6;
	public static readonly RULE_state_declaration = 7;
	public static readonly RULE_state_body = 8;
	public static readonly RULE_method = 9;
	public static readonly RULE_decision_state = 10;
	public static readonly RULE_decision = 11;
	public static readonly RULE_id = 12;
	public static readonly literalNames: (string | null)[] = [ null, "'.'", 
                                                            "'[]'", "'package'", 
                                                            "';'", "'import'", 
                                                            "'static'", 
                                                            "'*'", "'typestate'", 
                                                            "'{'", "'}'", 
                                                            "'='", "','", 
                                                            "':'", "'('", 
                                                            "')'", "'<'", 
                                                            "'>'", "'drop'", 
                                                            "'end'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "DROP", "END", 
                                                             "ID", "WS", 
                                                             "BlockComment", 
                                                             "LineComment" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"start", "ref", "javaType", "package_statement", "import_statement", "typestate_declaration", 
		"typestate_body", "state_declaration", "state_body", "method", "decision_state", 
		"decision", "id",
	];
	public get grammarFileName(): string { return "Typestate.g4"; }
	public get literalNames(): (string | null)[] { return TypestateParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return TypestateParser.symbolicNames; }
	public get ruleNames(): string[] { return TypestateParser.ruleNames; }
	public get serializedATN(): number[] { return TypestateParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, TypestateParser._ATN, TypestateParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public start(): StartContext {
		let localctx: StartContext = new StartContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, TypestateParser.RULE_start);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 29;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===3) {
				{
				this.state = 26;
				localctx._p = this.package_statement();
				localctx.pkg = localctx._p.node;
				}
			}

			this.state = 34;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===5) {
				{
				{
				this.state = 31;
				localctx._import_statement = this.import_statement();
				localctx._i.push(localctx._import_statement);
				}
				}
				this.state = 36;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 37;
			localctx._t = this.typestate_declaration();
			localctx.ast = makeTypestate(localctx.pkg, localctx._i.map(i => i.node), localctx._t.node);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public ref(): RefContext;
	public ref(_p: number): RefContext;
	// @RuleVersion(0)
	public ref(_p?: number): RefContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: RefContext = new RefContext(this, this._ctx, _parentState);
		let _prevctx: RefContext = localctx;
		let _startState: number = 2;
		this.enterRecursionRule(localctx, 2, TypestateParser.RULE_ref, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 41;
			localctx._id = this.id();
			localctx.node = localctx._id.node;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 51;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new RefContext(this, _parentctx, _parentState);
					localctx._r = _prevctx;
					this.pushNewRecursionContext(localctx, _startState, TypestateParser.RULE_ref);
					this.state = 44;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 45;
					this.match(TypestateParser.T__0);
					this.state = 46;
					localctx._id = this.id();
					localctx.node = makeMember(localctx._r.node.pos, localctx._r.node, localctx._id.node);
					}
					}
				}
				this.state = 53;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public javaType(): JavaTypeContext;
	public javaType(_p: number): JavaTypeContext;
	// @RuleVersion(0)
	public javaType(_p?: number): JavaTypeContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: JavaTypeContext = new JavaTypeContext(this, this._ctx, _parentState);
		let _prevctx: JavaTypeContext = localctx;
		let _startState: number = 4;
		this.enterRecursionRule(localctx, 4, TypestateParser.RULE_javaType, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 55;
			localctx._ref = this.ref(0);
			localctx.node = localctx._ref.node;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 63;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new JavaTypeContext(this, _parentctx, _parentState);
					localctx._j = _prevctx;
					this.pushNewRecursionContext(localctx, _startState, TypestateParser.RULE_javaType);
					this.state = 58;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 59;
					this.match(TypestateParser.T__1);
					localctx.node = makeArrayType(localctx._j.node.pos, localctx._j.node);
					}
					}
				}
				this.state = 65;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public package_statement(): Package_statementContext {
		let localctx: Package_statementContext = new Package_statementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, TypestateParser.RULE_package_statement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 66;
			localctx._t = this.match(TypestateParser.T__2);
			this.state = 67;
			localctx._ref = this.ref(0);
			this.state = 68;
			this.match(TypestateParser.T__3);
			localctx.node = makePackage(tokenToPos(localctx._t), localctx._ref.node);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public import_statement(): Import_statementContext {
		let localctx: Import_statementContext = new Import_statementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, TypestateParser.RULE_import_statement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 71;
			localctx._t = this.match(TypestateParser.T__4);
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 72;
				localctx._s = this.match(TypestateParser.T__5);
				}
			}

			this.state = 75;
			localctx._ref = this.ref(0);
			this.state = 78;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===1) {
				{
				this.state = 76;
				this.match(TypestateParser.T__0);
				this.state = 77;
				localctx._star = this.match(TypestateParser.T__6);
				}
			}

			this.state = 80;
			this.match(TypestateParser.T__3);
			localctx.node = makeImport(tokenToPos(localctx._t), localctx._ref.node, localctx._s != null, localctx._star != null);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typestate_declaration(): Typestate_declarationContext {
		let localctx: Typestate_declarationContext = new Typestate_declarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, TypestateParser.RULE_typestate_declaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 83;
			localctx._t = this.match(TypestateParser.T__7);
			this.state = 84;
			localctx._ID = this.match(TypestateParser.ID);
			this.state = 85;
			this.match(TypestateParser.T__8);
			this.state = 86;
			localctx._typestate_body = this.typestate_body();
			this.state = 87;
			this.match(TypestateParser.T__9);
			this.state = 88;
			this.match(TypestateParser.EOF);
			localctx.node = makeDeclaration(tokenToPos(localctx._t), (localctx._ID != null ? localctx._ID.text : undefined), localctx._typestate_body.states);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typestate_body(): Typestate_bodyContext {
		let localctx: Typestate_bodyContext = new Typestate_bodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, TypestateParser.RULE_typestate_body);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 94;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 91;
				localctx._state_declaration = this.state_declaration();
				localctx._s.push(localctx._state_declaration);
				}
				}
				this.state = 96;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			localctx.states = localctx._s.map(s => s.node);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public state_declaration(): State_declarationContext {
		let localctx: State_declarationContext = new State_declarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, TypestateParser.RULE_state_declaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 99;
			localctx._name = this.match(TypestateParser.ID);
			this.state = 100;
			this.match(TypestateParser.T__10);
			this.state = 101;
			localctx._state_body = this.state_body();
			localctx.node = makeState(tokenToPos(localctx._name), (localctx._name != null ? localctx._name.text : undefined), localctx._state_body.node.methods, localctx._state_body.node.isDroppable);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public state_body(): State_bodyContext {
		let localctx: State_bodyContext = new State_bodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, TypestateParser.RULE_state_body);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 104;
			localctx._t = this.match(TypestateParser.T__8);
			this.state = 120;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1835008) !== 0)) {
				{
				this.state = 105;
				localctx._method = this.method();
				localctx._m.push(localctx._method);
				this.state = 110;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 106;
						this.match(TypestateParser.T__11);
						this.state = 107;
						localctx._method = this.method();
						localctx._m.push(localctx._method);
						}
						}
					}
					this.state = 112;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
				}
				this.state = 118;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===12) {
					{
					this.state = 113;
					this.match(TypestateParser.T__11);
					this.state = 114;
					this.match(TypestateParser.DROP);
					this.state = 115;
					this.match(TypestateParser.T__12);
					this.state = 116;
					this.match(TypestateParser.END);
					localctx.isDroppable = true;
					}
				}

				}
			}

			this.state = 122;
			this.match(TypestateParser.T__9);
			localctx.node = makeState(tokenToPos(localctx._t), null, localctx._m.map(it => it.node), localctx.isDroppable);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public method(): MethodContext {
		let localctx: MethodContext = new MethodContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, TypestateParser.RULE_method);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 125;
			localctx._return_type = this.javaType(0);
			this.state = 126;
			localctx._name = this.match(TypestateParser.ID);
			this.state = 127;
			this.match(TypestateParser.T__13);
			this.state = 136;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1835008) !== 0)) {
				{
				this.state = 128;
				localctx._javaType = this.javaType(0);
				localctx._args.push(localctx._javaType);
				this.state = 133;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===12) {
					{
					{
					this.state = 129;
					this.match(TypestateParser.T__11);
					this.state = 130;
					localctx._javaType = this.javaType(0);
					localctx._args.push(localctx._javaType);
					}
					}
					this.state = 135;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 138;
			this.match(TypestateParser.T__14);
			this.state = 139;
			this.match(TypestateParser.T__12);
			this.state = 149;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 18:
			case 19:
			case 20:
				{
				this.state = 140;
				localctx._id = this.id();
				localctx.destination = localctx._id.node;
				}
				break;
			case 9:
				{
				this.state = 143;
				localctx._state_body = this.state_body();
				localctx.destination = localctx._state_body.node;
				}
				break;
			case 16:
				{
				this.state = 146;
				localctx._decision_state = this.decision_state();
				localctx.destination = localctx._decision_state.node;
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			localctx.node = makeMethod(localctx._return_type.node.pos, localctx._return_type.node, (localctx._name != null ? localctx._name.text : undefined), localctx._args.map(a => a.node), localctx.destination);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public decision_state(): Decision_stateContext {
		let localctx: Decision_stateContext = new Decision_stateContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, TypestateParser.RULE_decision_state);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 153;
			localctx._t = this.match(TypestateParser.T__15);
			this.state = 154;
			localctx._decision = this.decision();
			localctx._decisions.push(localctx._decision);
			this.state = 159;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===12) {
				{
				{
				this.state = 155;
				this.match(TypestateParser.T__11);
				this.state = 156;
				localctx._decision = this.decision();
				localctx._decisions.push(localctx._decision);
				}
				}
				this.state = 161;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 162;
			this.match(TypestateParser.T__16);
			localctx.node = makeDecisionState(tokenToPos(localctx._t), localctx._decisions.map(d => d.node));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public decision(): DecisionContext {
		let localctx: DecisionContext = new DecisionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, TypestateParser.RULE_decision);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 165;
			localctx._label = this.match(TypestateParser.ID);
			this.state = 166;
			this.match(TypestateParser.T__12);
			this.state = 173;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 18:
			case 19:
			case 20:
				{
				this.state = 167;
				localctx._id = this.id();
				localctx.node = makeDecision(tokenToPos(localctx._label), (localctx._label != null ? localctx._label.text : undefined), localctx._id.node);
				}
				break;
			case 9:
				{
				this.state = 170;
				localctx._state_body = this.state_body();
				localctx.node = makeDecision(tokenToPos(localctx._label), (localctx._label != null ? localctx._label.text : undefined), localctx._state_body.node);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public id(): IdContext {
		let localctx: IdContext = new IdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, TypestateParser.RULE_id);
		try {
			this.state = 181;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 18:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 175;
				localctx._DROP = this.match(TypestateParser.DROP);
				localctx.node = makeId(tokenToPos(localctx._DROP), (localctx._DROP != null ? localctx._DROP.text : undefined));
				}
				break;
			case 19:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 177;
				localctx._END = this.match(TypestateParser.END);
				localctx.node = makeId(tokenToPos(localctx._END), (localctx._END != null ? localctx._END.text : undefined));
				}
				break;
			case 20:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 179;
				localctx._ID = this.match(TypestateParser.ID);
				localctx.node = makeId(tokenToPos(localctx._ID), (localctx._ID != null ? localctx._ID.text : undefined));
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
			return this.ref_sempred(localctx as RefContext, predIndex);
		case 2:
			return this.javaType_sempred(localctx as JavaTypeContext, predIndex);
		}
		return true;
	}
	private ref_sempred(localctx: RefContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private javaType_sempred(localctx: JavaTypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,23,184,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,1,0,1,0,1,0,3,0,30,8,0,1,0,5,0,33,8,0,10,0,
	12,0,36,9,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,50,8,1,
	10,1,12,1,53,9,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,62,8,2,10,2,12,2,65,9,
	2,1,3,1,3,1,3,1,3,1,3,1,4,1,4,3,4,74,8,4,1,4,1,4,1,4,3,4,79,8,4,1,4,1,4,
	1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,6,5,6,93,8,6,10,6,12,6,96,9,6,1,6,
	1,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,5,8,109,8,8,10,8,12,8,112,9,8,1,
	8,1,8,1,8,1,8,1,8,3,8,119,8,8,3,8,121,8,8,1,8,1,8,1,8,1,9,1,9,1,9,1,9,1,
	9,1,9,5,9,132,8,9,10,9,12,9,135,9,9,3,9,137,8,9,1,9,1,9,1,9,1,9,1,9,1,9,
	1,9,1,9,1,9,1,9,1,9,3,9,150,8,9,1,9,1,9,1,10,1,10,1,10,1,10,5,10,158,8,
	10,10,10,12,10,161,9,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,11,1,11,1,
	11,1,11,3,11,174,8,11,1,12,1,12,1,12,1,12,1,12,1,12,3,12,182,8,12,1,12,
	0,2,2,4,13,0,2,4,6,8,10,12,14,16,18,20,22,24,0,0,188,0,29,1,0,0,0,2,40,
	1,0,0,0,4,54,1,0,0,0,6,66,1,0,0,0,8,71,1,0,0,0,10,83,1,0,0,0,12,94,1,0,
	0,0,14,99,1,0,0,0,16,104,1,0,0,0,18,125,1,0,0,0,20,153,1,0,0,0,22,165,1,
	0,0,0,24,181,1,0,0,0,26,27,3,6,3,0,27,28,6,0,-1,0,28,30,1,0,0,0,29,26,1,
	0,0,0,29,30,1,0,0,0,30,34,1,0,0,0,31,33,3,8,4,0,32,31,1,0,0,0,33,36,1,0,
	0,0,34,32,1,0,0,0,34,35,1,0,0,0,35,37,1,0,0,0,36,34,1,0,0,0,37,38,3,10,
	5,0,38,39,6,0,-1,0,39,1,1,0,0,0,40,41,6,1,-1,0,41,42,3,24,12,0,42,43,6,
	1,-1,0,43,51,1,0,0,0,44,45,10,1,0,0,45,46,5,1,0,0,46,47,3,24,12,0,47,48,
	6,1,-1,0,48,50,1,0,0,0,49,44,1,0,0,0,50,53,1,0,0,0,51,49,1,0,0,0,51,52,
	1,0,0,0,52,3,1,0,0,0,53,51,1,0,0,0,54,55,6,2,-1,0,55,56,3,2,1,0,56,57,6,
	2,-1,0,57,63,1,0,0,0,58,59,10,1,0,0,59,60,5,2,0,0,60,62,6,2,-1,0,61,58,
	1,0,0,0,62,65,1,0,0,0,63,61,1,0,0,0,63,64,1,0,0,0,64,5,1,0,0,0,65,63,1,
	0,0,0,66,67,5,3,0,0,67,68,3,2,1,0,68,69,5,4,0,0,69,70,6,3,-1,0,70,7,1,0,
	0,0,71,73,5,5,0,0,72,74,5,6,0,0,73,72,1,0,0,0,73,74,1,0,0,0,74,75,1,0,0,
	0,75,78,3,2,1,0,76,77,5,1,0,0,77,79,5,7,0,0,78,76,1,0,0,0,78,79,1,0,0,0,
	79,80,1,0,0,0,80,81,5,4,0,0,81,82,6,4,-1,0,82,9,1,0,0,0,83,84,5,8,0,0,84,
	85,5,20,0,0,85,86,5,9,0,0,86,87,3,12,6,0,87,88,5,10,0,0,88,89,5,0,0,1,89,
	90,6,5,-1,0,90,11,1,0,0,0,91,93,3,14,7,0,92,91,1,0,0,0,93,96,1,0,0,0,94,
	92,1,0,0,0,94,95,1,0,0,0,95,97,1,0,0,0,96,94,1,0,0,0,97,98,6,6,-1,0,98,
	13,1,0,0,0,99,100,5,20,0,0,100,101,5,11,0,0,101,102,3,16,8,0,102,103,6,
	7,-1,0,103,15,1,0,0,0,104,120,5,9,0,0,105,110,3,18,9,0,106,107,5,12,0,0,
	107,109,3,18,9,0,108,106,1,0,0,0,109,112,1,0,0,0,110,108,1,0,0,0,110,111,
	1,0,0,0,111,118,1,0,0,0,112,110,1,0,0,0,113,114,5,12,0,0,114,115,5,18,0,
	0,115,116,5,13,0,0,116,117,5,19,0,0,117,119,6,8,-1,0,118,113,1,0,0,0,118,
	119,1,0,0,0,119,121,1,0,0,0,120,105,1,0,0,0,120,121,1,0,0,0,121,122,1,0,
	0,0,122,123,5,10,0,0,123,124,6,8,-1,0,124,17,1,0,0,0,125,126,3,4,2,0,126,
	127,5,20,0,0,127,136,5,14,0,0,128,133,3,4,2,0,129,130,5,12,0,0,130,132,
	3,4,2,0,131,129,1,0,0,0,132,135,1,0,0,0,133,131,1,0,0,0,133,134,1,0,0,0,
	134,137,1,0,0,0,135,133,1,0,0,0,136,128,1,0,0,0,136,137,1,0,0,0,137,138,
	1,0,0,0,138,139,5,15,0,0,139,149,5,13,0,0,140,141,3,24,12,0,141,142,6,9,
	-1,0,142,150,1,0,0,0,143,144,3,16,8,0,144,145,6,9,-1,0,145,150,1,0,0,0,
	146,147,3,20,10,0,147,148,6,9,-1,0,148,150,1,0,0,0,149,140,1,0,0,0,149,
	143,1,0,0,0,149,146,1,0,0,0,150,151,1,0,0,0,151,152,6,9,-1,0,152,19,1,0,
	0,0,153,154,5,16,0,0,154,159,3,22,11,0,155,156,5,12,0,0,156,158,3,22,11,
	0,157,155,1,0,0,0,158,161,1,0,0,0,159,157,1,0,0,0,159,160,1,0,0,0,160,162,
	1,0,0,0,161,159,1,0,0,0,162,163,5,17,0,0,163,164,6,10,-1,0,164,21,1,0,0,
	0,165,166,5,20,0,0,166,173,5,13,0,0,167,168,3,24,12,0,168,169,6,11,-1,0,
	169,174,1,0,0,0,170,171,3,16,8,0,171,172,6,11,-1,0,172,174,1,0,0,0,173,
	167,1,0,0,0,173,170,1,0,0,0,174,23,1,0,0,0,175,176,5,18,0,0,176,182,6,12,
	-1,0,177,178,5,19,0,0,178,182,6,12,-1,0,179,180,5,20,0,0,180,182,6,12,-1,
	0,181,175,1,0,0,0,181,177,1,0,0,0,181,179,1,0,0,0,182,25,1,0,0,0,16,29,
	34,51,63,73,78,94,110,118,120,133,136,149,159,173,181];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TypestateParser.__ATN) {
			TypestateParser.__ATN = new ATNDeserializer().deserialize(TypestateParser._serializedATN);
		}

		return TypestateParser.__ATN;
	}


	static DecisionsToDFA = TypestateParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class StartContext extends ParserRuleContext {
	public ast: makeTypestate;
	public pkg: makePackage;
	public _p!: Package_statementContext;
	public _import_statement!: Import_statementContext;
	public _i: Import_statementContext[] = [];
	public _t!: Typestate_declarationContext;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typestate_declaration(): Typestate_declarationContext {
		return this.getTypedRuleContext(Typestate_declarationContext, 0) as Typestate_declarationContext;
	}
	public package_statement(): Package_statementContext {
		return this.getTypedRuleContext(Package_statementContext, 0) as Package_statementContext;
	}
	public import_statement_list(): Import_statementContext[] {
		return this.getTypedRuleContexts(Import_statementContext) as Import_statementContext[];
	}
	public import_statement(i: number): Import_statementContext {
		return this.getTypedRuleContext(Import_statementContext, i) as Import_statementContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_start;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterStart) {
	 		listener.enterStart(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitStart) {
	 		listener.exitStart(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitStart) {
			return visitor.visitStart(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RefContext extends ParserRuleContext {
	public node: TRefNode;
	public _r!: RefContext;
	public _id!: IdContext;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public ref(): RefContext {
		return this.getTypedRuleContext(RefContext, 0) as RefContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_ref;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterRef) {
	 		listener.enterRef(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitRef) {
	 		listener.exitRef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitRef) {
			return visitor.visitRef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JavaTypeContext extends ParserRuleContext {
	public node: TRefNode;
	public _j!: JavaTypeContext;
	public _ref!: RefContext;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ref(): RefContext {
		return this.getTypedRuleContext(RefContext, 0) as RefContext;
	}
	public javaType(): JavaTypeContext {
		return this.getTypedRuleContext(JavaTypeContext, 0) as JavaTypeContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_javaType;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterJavaType) {
	 		listener.enterJavaType(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitJavaType) {
	 		listener.exitJavaType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitJavaType) {
			return visitor.visitJavaType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Package_statementContext extends ParserRuleContext {
	public node: makePackage;
	public _t!: Token;
	public _ref!: RefContext;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ref(): RefContext {
		return this.getTypedRuleContext(RefContext, 0) as RefContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_package_statement;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterPackage_statement) {
	 		listener.enterPackage_statement(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitPackage_statement) {
	 		listener.exitPackage_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitPackage_statement) {
			return visitor.visitPackage_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Import_statementContext extends ParserRuleContext {
	public node: makeImport;
	public _t!: Token;
	public _s!: Token;
	public _ref!: RefContext;
	public _star!: Token;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ref(): RefContext {
		return this.getTypedRuleContext(RefContext, 0) as RefContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_import_statement;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterImport_statement) {
	 		listener.enterImport_statement(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitImport_statement) {
	 		listener.exitImport_statement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitImport_statement) {
			return visitor.visitImport_statement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Typestate_declarationContext extends ParserRuleContext {
	public node: makeDeclaration;
	public _t!: Token;
	public _ID!: Token;
	public _typestate_body!: Typestate_bodyContext;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(TypestateParser.ID, 0);
	}
	public typestate_body(): Typestate_bodyContext {
		return this.getTypedRuleContext(Typestate_bodyContext, 0) as Typestate_bodyContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(TypestateParser.EOF, 0);
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_typestate_declaration;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterTypestate_declaration) {
	 		listener.enterTypestate_declaration(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitTypestate_declaration) {
	 		listener.exitTypestate_declaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitTypestate_declaration) {
			return visitor.visitTypestate_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Typestate_bodyContext extends ParserRuleContext {
	public states: List<makeState>;
	public _state_declaration!: State_declarationContext;
	public _s: State_declarationContext[] = [];
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public state_declaration_list(): State_declarationContext[] {
		return this.getTypedRuleContexts(State_declarationContext) as State_declarationContext[];
	}
	public state_declaration(i: number): State_declarationContext {
		return this.getTypedRuleContext(State_declarationContext, i) as State_declarationContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_typestate_body;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterTypestate_body) {
	 		listener.enterTypestate_body(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitTypestate_body) {
	 		listener.exitTypestate_body(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitTypestate_body) {
			return visitor.visitTypestate_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class State_declarationContext extends ParserRuleContext {
	public node: makeState;
	public _name!: Token;
	public _state_body!: State_bodyContext;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public state_body(): State_bodyContext {
		return this.getTypedRuleContext(State_bodyContext, 0) as State_bodyContext;
	}
	public ID(): TerminalNode {
		return this.getToken(TypestateParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_state_declaration;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterState_declaration) {
	 		listener.enterState_declaration(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitState_declaration) {
	 		listener.exitState_declaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitState_declaration) {
			return visitor.visitState_declaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class State_bodyContext extends ParserRuleContext {
	public node: makeState;
	public isDroppable: boolean;
	public _t!: Token;
	public _method!: MethodContext;
	public _m: MethodContext[] = [];
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public method_list(): MethodContext[] {
		return this.getTypedRuleContexts(MethodContext) as MethodContext[];
	}
	public method(i: number): MethodContext {
		return this.getTypedRuleContext(MethodContext, i) as MethodContext;
	}
	public DROP(): TerminalNode {
		return this.getToken(TypestateParser.DROP, 0);
	}
	public END(): TerminalNode {
		return this.getToken(TypestateParser.END, 0);
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_state_body;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterState_body) {
	 		listener.enterState_body(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitState_body) {
	 		listener.exitState_body(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitState_body) {
			return visitor.visitState_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodContext extends ParserRuleContext {
	public node: makeMethod;
	public destination: TNode;
	public _return_type!: JavaTypeContext;
	public _name!: Token;
	public _javaType!: JavaTypeContext;
	public _args: JavaTypeContext[] = [];
	public _id!: IdContext;
	public _state_body!: State_bodyContext;
	public _decision_state!: Decision_stateContext;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public javaType_list(): JavaTypeContext[] {
		return this.getTypedRuleContexts(JavaTypeContext) as JavaTypeContext[];
	}
	public javaType(i: number): JavaTypeContext {
		return this.getTypedRuleContext(JavaTypeContext, i) as JavaTypeContext;
	}
	public ID(): TerminalNode {
		return this.getToken(TypestateParser.ID, 0);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public state_body(): State_bodyContext {
		return this.getTypedRuleContext(State_bodyContext, 0) as State_bodyContext;
	}
	public decision_state(): Decision_stateContext {
		return this.getTypedRuleContext(Decision_stateContext, 0) as Decision_stateContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_method;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterMethod) {
	 		listener.enterMethod(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitMethod) {
	 		listener.exitMethod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitMethod) {
			return visitor.visitMethod(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Decision_stateContext extends ParserRuleContext {
	public node: makeDecisionState;
	public _t!: Token;
	public _decision!: DecisionContext;
	public _decisions: DecisionContext[] = [];
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public decision_list(): DecisionContext[] {
		return this.getTypedRuleContexts(DecisionContext) as DecisionContext[];
	}
	public decision(i: number): DecisionContext {
		return this.getTypedRuleContext(DecisionContext, i) as DecisionContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_decision_state;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterDecision_state) {
	 		listener.enterDecision_state(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitDecision_state) {
	 		listener.exitDecision_state(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitDecision_state) {
			return visitor.visitDecision_state(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DecisionContext extends ParserRuleContext {
	public node: makeDecision;
	public _label!: Token;
	public _id!: IdContext;
	public _state_body!: State_bodyContext;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(TypestateParser.ID, 0);
	}
	public id(): IdContext {
		return this.getTypedRuleContext(IdContext, 0) as IdContext;
	}
	public state_body(): State_bodyContext {
		return this.getTypedRuleContext(State_bodyContext, 0) as State_bodyContext;
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_decision;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterDecision) {
	 		listener.enterDecision(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitDecision) {
	 		listener.exitDecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitDecision) {
			return visitor.visitDecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdContext extends ParserRuleContext {
	public node: makeId;
	public _DROP!: Token;
	public _END!: Token;
	public _ID!: Token;
	constructor(parser?: TypestateParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DROP(): TerminalNode {
		return this.getToken(TypestateParser.DROP, 0);
	}
	public END(): TerminalNode {
		return this.getToken(TypestateParser.END, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(TypestateParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return TypestateParser.RULE_id;
	}
	public enterRule(listener: TypestateListener): void {
	    if(listener.enterId) {
	 		listener.enterId(this);
		}
	}
	public exitRule(listener: TypestateListener): void {
	    if(listener.exitId) {
	 		listener.exitId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: TypestateVisitor<Result>): Result {
		if (visitor.visitId) {
			return visitor.visitId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

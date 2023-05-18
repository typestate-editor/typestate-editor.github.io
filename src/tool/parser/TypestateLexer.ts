// Generated from src/tool/Typestate.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";

  import { tokenToPos, makeMember, makeId, makeArrayType, makeDecision, makeDecisionState, makeDeclaration, makeMethod, makeState, makePackage, makeImport, makeTypestate } from "../ast_nodes";

export default class TypestateLexer extends Lexer {
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

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: string[] = [ null, "'.'", "'[]'", 
                                                   "'package'", "';'", "'import'", 
                                                   "'static'", "'*'", "'typestate'", 
                                                   "'{'", "'}'", "'='", 
                                                   "','", "':'", "'('", 
                                                   "')'", "'<'", "'>'", 
                                                   "'drop'", "'end'" ];
	public static readonly symbolicNames: string[] = [ null, null, null, null, 
                                                    null, null, null, null, 
                                                    null, null, null, null, 
                                                    null, null, null, null, 
                                                    null, null, "DROP", 
                                                    "END", "ID", "WS", "BlockComment", 
                                                    "LineComment" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
		"DROP", "END", "ID", "WS", "BlockComment", "LineComment",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, TypestateLexer._ATN, TypestateLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "Typestate.g4"; }

	public get literalNames(): (string | null)[] { return TypestateLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return TypestateLexer.symbolicNames; }
	public get ruleNames(): string[] { return TypestateLexer.ruleNames; }

	public get serializedATN(): number[] { return TypestateLexer._serializedATN; }

	public get channelNames(): string[] { return TypestateLexer.channelNames; }

	public get modeNames(): string[] { return TypestateLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,23,158,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,1,0,1,0,
	1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,4,1,4,1,4,1,4,1,4,
	1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,1,7,
	1,7,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,1,11,1,11,1,12,1,12,1,13,1,13,1,14,
	1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,
	19,4,19,117,8,19,11,19,12,19,118,1,19,5,19,122,8,19,10,19,12,19,125,9,19,
	1,20,4,20,128,8,20,11,20,12,20,129,1,20,1,20,1,21,1,21,1,21,1,21,5,21,138,
	8,21,10,21,12,21,141,9,21,1,21,1,21,1,21,1,21,1,21,1,22,1,22,1,22,1,22,
	5,22,152,8,22,10,22,12,22,155,9,22,1,22,1,22,1,139,0,23,1,1,3,2,5,3,7,4,
	9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,
	35,18,37,19,39,20,41,21,43,22,45,23,1,0,4,4,0,36,36,65,90,95,95,97,122,
	5,0,36,36,48,57,65,90,95,95,97,122,3,0,9,10,13,13,32,32,2,0,10,10,13,13,
	162,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,
	0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,
	0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,
	0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,
	0,45,1,0,0,0,1,47,1,0,0,0,3,49,1,0,0,0,5,52,1,0,0,0,7,60,1,0,0,0,9,62,1,
	0,0,0,11,69,1,0,0,0,13,76,1,0,0,0,15,78,1,0,0,0,17,88,1,0,0,0,19,90,1,0,
	0,0,21,92,1,0,0,0,23,94,1,0,0,0,25,96,1,0,0,0,27,98,1,0,0,0,29,100,1,0,
	0,0,31,102,1,0,0,0,33,104,1,0,0,0,35,106,1,0,0,0,37,111,1,0,0,0,39,116,
	1,0,0,0,41,127,1,0,0,0,43,133,1,0,0,0,45,147,1,0,0,0,47,48,5,46,0,0,48,
	2,1,0,0,0,49,50,5,91,0,0,50,51,5,93,0,0,51,4,1,0,0,0,52,53,5,112,0,0,53,
	54,5,97,0,0,54,55,5,99,0,0,55,56,5,107,0,0,56,57,5,97,0,0,57,58,5,103,0,
	0,58,59,5,101,0,0,59,6,1,0,0,0,60,61,5,59,0,0,61,8,1,0,0,0,62,63,5,105,
	0,0,63,64,5,109,0,0,64,65,5,112,0,0,65,66,5,111,0,0,66,67,5,114,0,0,67,
	68,5,116,0,0,68,10,1,0,0,0,69,70,5,115,0,0,70,71,5,116,0,0,71,72,5,97,0,
	0,72,73,5,116,0,0,73,74,5,105,0,0,74,75,5,99,0,0,75,12,1,0,0,0,76,77,5,
	42,0,0,77,14,1,0,0,0,78,79,5,116,0,0,79,80,5,121,0,0,80,81,5,112,0,0,81,
	82,5,101,0,0,82,83,5,115,0,0,83,84,5,116,0,0,84,85,5,97,0,0,85,86,5,116,
	0,0,86,87,5,101,0,0,87,16,1,0,0,0,88,89,5,123,0,0,89,18,1,0,0,0,90,91,5,
	125,0,0,91,20,1,0,0,0,92,93,5,61,0,0,93,22,1,0,0,0,94,95,5,44,0,0,95,24,
	1,0,0,0,96,97,5,58,0,0,97,26,1,0,0,0,98,99,5,40,0,0,99,28,1,0,0,0,100,101,
	5,41,0,0,101,30,1,0,0,0,102,103,5,60,0,0,103,32,1,0,0,0,104,105,5,62,0,
	0,105,34,1,0,0,0,106,107,5,100,0,0,107,108,5,114,0,0,108,109,5,111,0,0,
	109,110,5,112,0,0,110,36,1,0,0,0,111,112,5,101,0,0,112,113,5,110,0,0,113,
	114,5,100,0,0,114,38,1,0,0,0,115,117,7,0,0,0,116,115,1,0,0,0,117,118,1,
	0,0,0,118,116,1,0,0,0,118,119,1,0,0,0,119,123,1,0,0,0,120,122,7,1,0,0,121,
	120,1,0,0,0,122,125,1,0,0,0,123,121,1,0,0,0,123,124,1,0,0,0,124,40,1,0,
	0,0,125,123,1,0,0,0,126,128,7,2,0,0,127,126,1,0,0,0,128,129,1,0,0,0,129,
	127,1,0,0,0,129,130,1,0,0,0,130,131,1,0,0,0,131,132,6,20,0,0,132,42,1,0,
	0,0,133,134,5,47,0,0,134,135,5,42,0,0,135,139,1,0,0,0,136,138,9,0,0,0,137,
	136,1,0,0,0,138,141,1,0,0,0,139,140,1,0,0,0,139,137,1,0,0,0,140,142,1,0,
	0,0,141,139,1,0,0,0,142,143,5,42,0,0,143,144,5,47,0,0,144,145,1,0,0,0,145,
	146,6,21,0,0,146,44,1,0,0,0,147,148,5,47,0,0,148,149,5,47,0,0,149,153,1,
	0,0,0,150,152,8,3,0,0,151,150,1,0,0,0,152,155,1,0,0,0,153,151,1,0,0,0,153,
	154,1,0,0,0,154,156,1,0,0,0,155,153,1,0,0,0,156,157,6,22,0,0,157,46,1,0,
	0,0,6,0,118,123,129,139,153,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!TypestateLexer.__ATN) {
			TypestateLexer.__ATN = new ATNDeserializer().deserialize(TypestateLexer._serializedATN);
		}

		return TypestateLexer.__ATN;
	}


	static DecisionsToDFA = TypestateLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}
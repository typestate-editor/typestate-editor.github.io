grammar Typestate;

@header {
  import { tokenToPos, makeMember, makeId, makeArrayType, makeDecision, makeDecisionState, makeDeclaration, makeMethod, makeState, makePackage, makeImport, makeTypestate } from "../ast_nodes";
}

// Info: https://github.com/antlr/antlr4/blob/master/doc/parser-rules.md

start returns [makeTypestate ast] locals [makePackage pkg] :
  ( p=package_statement {$pkg=$p.node;} )? ( i+=import_statement )* t=typestate_declaration
  {$ast=makeTypestate($pkg, $i.map(i => i.node), $t.node);}
;

ref returns [TRefNode node] :
  id {$node=$id.node;} |
  r=ref '.' id {$node=makeMember($r.node.pos, $r.node, $id.node);}
;

javaType returns [TRefNode node] :
  ref {$node=$ref.node;} |
  j=javaType '[]' {$node=makeArrayType($j.node.pos, $j.node);}
;

package_statement returns [makePackage node] :
  t='package' ref ';'
  {$node=makePackage(tokenToPos($t), $ref.node);}
;

import_statement returns [makeImport node] :
  t='import' s='static'? ref ( '.' star='*' )? ';'
  {$node=makeImport(tokenToPos($t), $ref.node, $s != null, $star != null);}
;

typestate_declaration returns [makeDeclaration node] :
  t='typestate' ID '{' typestate_body '}' EOF
  {$node=makeDeclaration(tokenToPos($t), $ID.text, $typestate_body.states);}
;

typestate_body returns [List<makeState> states] :
  ( s+=state_declaration )*
  {$states=$s.map(s => s.node);}
;

state_declaration returns [makeState node] :
  name=ID '=' state_body
  {$node=makeState(tokenToPos($name), $name.text, $state_body.node.methods, $state_body.node.isDroppable);}
;

state_body returns [makeState node] locals [boolean isDroppable] :
  t='{' ( m+=method ( ',' m+=method )* ( ',' DROP ':' END {$isDroppable=true;} )? )? '}'
  {$node=makeState(tokenToPos($t), null, $m.map(it => it.node), $isDroppable);}
;

method returns [makeMethod node] locals [TNode destination] :
  return_type=javaType name=ID '(' ( args+=javaType ( ',' args+=javaType )* )? ')' ':' (
    id {$destination=$id.node;} |
    state_body {$destination=$state_body.node;} |
    decision_state {$destination=$decision_state.node;}
  )
  {$node=makeMethod($return_type.node.pos, $return_type.node, $name.text, $args.map(a => a.node), $destination);}
;

decision_state returns [makeDecisionState node] :
  t='<' decisions+=decision ( ',' decisions+=decision )* '>'
  {$node=makeDecisionState(tokenToPos($t), $decisions.map(d => d.node));}
;

decision returns [makeDecision node] :
  label=ID ':' (
    id {$node=makeDecision(tokenToPos($label), $label.text, $id.node);} |
    state_body {$node=makeDecision(tokenToPos($label), $label.text, $state_body.node);}
  )
;

id returns [makeId node] :
  DROP {$node=makeId(tokenToPos($DROP), $DROP.text);} |
  END {$node=makeId(tokenToPos($END), $END.text);} |
  ID {$node=makeId(tokenToPos($ID), $ID.text);}
;

// keywords
DROP : 'drop' ;
END : 'end' ;

// match identifiers
ID : [$_a-zA-Z]+[$_a-zA-Z0-9]* ;

// skip spaces, tabs, newlines
WS : [ \t\r\n]+ -> skip ;

// skip comments
BlockComment : '/*' .*? '*/' -> skip ;
LineComment : '//' ~[\r\n]* -> skip ;

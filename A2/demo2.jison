/* 
    description: Parses simple arithmetic expressions
                 and evaluates them
    source:      this grammar is adapted from: 
                 https://gerhobbelt.github.io/jison/demos/calc/
*/

// lexical section of the grammar 
// ==============================

%lex
%%
\s+                   /* no return statement, so skip whitespace */
[0-9]+("."[0-9]+)?    return "NUMBER"
"*"                   return "TIMES"
"/"                   return "DIV"
"-"                   return "MINUS"
"+"                   return "PLUS"
"("                   return "LPAREN"
")"                   return "RPAREN"
<<EOF>>               return "EOF"
.                     return "INVALID"

/lex

%start program

// phrase-structure section of the grammar
// =======================================

%%

program
    : exp "EOF"
      { return $1; }
    ;
exp
    : term
      { $$ = $1; }
    | exp "PLUS" term
      { $$ = $1 + $3; }
    | exp "MINUS" term      
      { $$ = $1 - $3; }
    ;
term
    : factor
      { $$ = $1; }
    | term "TIMES" factor
      { $$ = $1 * $3; }
    | term "DIV" factor
      { $$ = $1 / $3; }
    ;
factor
    : "NUMBER"
      { $$ = Number( $1 ); }	
    | "LPAREN" exp "RPAREN"
      { $$ = $2; }
    ;
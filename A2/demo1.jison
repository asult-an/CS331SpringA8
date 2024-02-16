/* 
    description: Parses simple arithmetic expressions
    source:      this grammar is adapted from: 
                 https://gerhobbelt.github.io/jison/demos/calc/
*/

// lexical section of the grammar 
// ==============================

%lex
%%
\s+                   /* no return statement, so skip whitespace */
[0-9]+("."[0-9]+)?    return "NUMBER"
[a-zA-Z][a-zA-Z0-9_]* return "ID"
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
    ;
exp
    : term
    | exp "PLUS" term
    | exp "MINUS" term
    ;
term
    : factor
    | term "TIMES" factor
    | term "DIV" factor
    ;
factor
    : "ID"
    | "NUMBER"
    | "LPAREN" exp "RPAREN"
    ;
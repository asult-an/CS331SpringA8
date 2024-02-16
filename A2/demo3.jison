/* 
    description: Parses simple arithmetic expressions
                 and produces a parse tree
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
      { console.log(JSON.stringify( ['program',$1], null, 4)); }
    ;
exp
    : term
      { $$ = ['exp', $1]; }	
    | exp "PLUS" term
      { $$ = ['exp',$1, '+', $3]; }
    | exp "MINUS" term      
      { $$ = ['exp',$1, '-', $3]; }
    ;
term
    : factor
      { $$ = ['term', $1]; }	
    | term "TIMES" factor
      { $$ = ['term',$1, '*', $3]; }
    | term "DIV" factor
      { $$ = ['term',$1, '/', $3]; }
    ;
factor
    : "NUMBER"
      { $$ = ['factor',['NUMBER', $1]]; }	
    | "LPAREN" exp "RPAREN"
      { $$ = ['factor',['PARENS', '(', $2, ')']]; }	
    ;

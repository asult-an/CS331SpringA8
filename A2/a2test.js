var selectedTest = process.argv[2];

/////////////////////// define the test suite /////////////////////////
var tests= [ 
    /* 0 */ [ "1 > 2", '["(1>2)",false]' ],
    /* 1 */ [ "3 > 2 > 1", '["(3>(2>1))",true]' ],  
                                 // 3 > (2 > 1) => 3 > true => 3 > 1
    /* 2 */ [ "3 > 1 > 2", '["(3>(1>2))",true]' ],  
                                 // 3 > (1 > 2) => 3 > false => 3 > 0
    /* 3 */ [ "2 < 1", '["(2<1)",false]' ],
    /* 4 */ [ "0 < 1 < 2", '["(0<(1<2))",true]' ],  
                                 // 0 < (1 < 2) => 0 < true => 0 < 1
    /* 5 */ [ "1 < 2 < 3", '["(1<(2<3))",false]' ], 
                                 // 1 < (2 < 3) => 1 < true => 1 < 1
    /* 6 */ [ "2 > 1 < 3", '["(2>(1<3))",true]' ],  
                                 // 2>(1<3) => 2 > true => 2 > 1
    /* 7 */ [ "1 < 3 > 2", '["((1<3)>2)",false]' ], 
                                 // (1 < 3) > 2) => true > 2 => 1 > 2
    /* 8 */ [ "~0", '["(~0)",-1]' ],    
    /* 9 */ [ "~~0", '["(~(~0))",0]' ],
   /* 10 */ [ "~~~0", '["(~(~(~0)))",-1]' ],
   /* 11 */ [ "~0 < 0", '["((~0)<0)",true]' ],
   /* 12 */ [ "2 > ~1 < 2", '["(2>((~1)<2))",true]' ],
   /* 13 */ [ "1 & 3", '["(1&3)",1]' ],
   /* 14 */ [ "1 | 3", '["(1|3)",3]' ],
   /* 15 */ [ "1 ^ 3", '["(1^3)",2]' ],
   /* 16 */ [ "~0 & 3", '["(~(0&3))",-1]' ],  // watch out: same as ~(0 & 3)
   /* 17 */ [ "~(0 & 3)", '["(~(0&3))",-1]' ], 
   /* 18 */ [ "(~0) & 3", '["((~0)&3)",3]' ], 
   /* 19 */ [ "1 | 2 & 7 ^ 6", '["(((1|2)&7)^6)",5]' ], 
   /* 20 */ [ "1 - 2 - 3", '["(1-(2-3))",2]' ],   
   /* 21 */ [ "1 - 2 + 3", '["(1-(2+3))",-4]' ],
   /* 22 */ [ "4 - 2 + 3 & 1 + 2 | 4", '["(((4-(2+3))&(1+2))|4)",7]' ],
   /* 23 */ [ "4 + 6 - 2 < 1 + 2 | 4", '["((4+(6-2))<((1+2)|4))",false]' ],
   /* 24 */ [ "10 / 3", '["(10/3)",3]' ],
   /* 25 */ [ "10 % 3", '["(10%3)",1]'],
   /* 26 */ [ "100 % 30 * 2 / 6", '["(((100%30)*2)/6)",3]'],
   /* 27 */ [ "10 - 2 * 3 + 11 % 3 / 2", '["(10-((2*3)+((11%3)/2)))",3]' ],
   /* 28 */ [ "10 - 2 * (3 + 11) % 3 / 2", '["(10-(((2*(3+11))%3)/2))",10]' ],
   /* 29 */ [ "2 * 1 < 3  & 4 + 6 - 1 > 5 | 7", 
              '["(((2*1)<(3&(4+(6-1))))>(5|7))",false]'],
   /* 30 */ [ "2 * 1 < 3  & 4  + 6 - (1 > 5) | 7",
              '["((2*1)<((3&(4+(6-(1>5))))|7))",true]' ]
];

///////////////////////// load the parser /////////////////////////////
process.stdout.write("\nLoading parser... ");
try {
    parser = require('./a2');
    console.log(" done\n");
} catch (e) {
    console.log("\nError loading the parser from file a2.js\n");
    process.exit(1);
}

///////////////////////// run the test(s) /////////////////////////////
if (selectedTest) {
    if ( (/^[0-9]+$/.test(selectedTest)) &&
         (Number(selectedTest) < tests.length) ) {
        parseInput(selectedTest);
    } else {
        console.log("Error: Test number is invalid or out of range");
        process.exit(1);
    }
} else { 
    console.log("===========================");
    console.log("Test suite for a2.js");
    console.log("===========================");
    for(var i=0; i<tests.length; i++) {
        parseInput(i);
    }
}

/////////////// helper function to perform one test //////////////////
function parseInput(testNumber) {
    var input = tests[testNumber][0];
    var outcome = tests[testNumber][1];
    var result;
    try {
        console.log("Test #",testNumber,"    Input = ", input);
        result = "" + parser.parse( input );
        console.log(result);
        console.log("\t\t\t\t\tTest ", outcome ===  result ? 
                    "PASSED" : "FAILED");
    } catch (e) {
        // exception is presumably due to a parsing error
        console.log(e.message);
        console.log("\t\t\t\t\tTest ", outcome !== result ?
                    "PASSED" : "FAILED");
    }
    console.log("----------------------------------------------------");
}
    


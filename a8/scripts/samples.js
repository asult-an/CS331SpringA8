/* global SLang : true */

(function () {

"use strict";

var samples = [

/* 0 */   "",
/* 1 */   [ "lets",
	    "lets\n" +
	    "    u = 1\n" +
	    "    v = (u + 1)\n" +
	    "in\n" +
	    "    print v\n" +
	    "end"
          ],
/* 2 */   [ "lets",
            "lets\n" +
	    "    u = 1\n" +
	    "    v = (u * 2)\n" +
	    "in\n" +
	    "    lets\n" +
            "        u = v\n" +
            "        v = (u * 3)\n" +
	    "    in\n" +
            "        print v\n" +
	    "    end\n" +
	    "end"
          ],
/* 3 */   [ "lets",
            "lets\n" +
	    "    u = 1\n" +
	    "    v = (u * 2)\n" +
	    "in\n" +
	    "    let\n" +
            "        u = v\n" +
            "        v = (u * 3)\n" +
	    "    in\n" +
            "        print v\n" +
	    "    end\n" +
	    "end"
          ],
/* 4 */   [ "letmr",
	    "let\n" +
	    "    false = 0\n" +
	    "    true = 1\n" +
	    "in\n" +
	    "    letmr\n" +
            "        f1 = fn (n) => if (n===0) then true else (f2 (n - 1))\n" +
            "        f2 = fn (n) => if (n===0) then false else (f1 (n - 1))\n" +
	    "    in\n" +
            "        print (f1 25);\n" +
            "        print (f1 26);\n" +
            "        print (f2 25);\n" +
            "        print (f2 26)\n" +
	    "    end\n" +
	    "end"
          ],
/* 5 */   [ "letmr",
	    "letmr\n" +
            "    f = fn (n) => if (n===0) then 1 else (n - (m (f (n-1))))\n" +
            "    m = fn (n) => if (n===0) then 0 else (n - (f (m (n-1))))\n" +
	    "in\n" +
            "    print (m 4)\n" +
	    "end\n"
          ]
];

SLang.samples = samples;

}());

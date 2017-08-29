'use strict';

var RuleTester = require('eslint').RuleTester;

var Rule = require('../../lib/rules/align-equals');

var Tester = new RuleTester({ ecmaFeatures: { blockBindings: true } });

Tester.run('align-equals', Rule, {
  valid: [
    'let a = require("a");',
    'let a = require("a");\nlet b = require("b");',
    'let ab = require("ab");\nlet b  = require("b");',
    'let a  = require("a");\nlet ab = require("ab");',
    'let a = require("a");\n\nlet ab = require("ab");',
    'let a = require("a").a;',
    'let a = require("a").a;\nlet b = require("b").b;',
    'let ab = require("ab").ab;\nlet b  = require("b").b;',
    'let a  = require("a").a;\nlet ab = require("ab").ab;',
    'let a = require("a").a;\n\nlet ab = require("ab").ab;',
    'let a = require("a")();',
    'let a = require("a")();\nlet b = require("b")();',
    'let ab = require("ab")();\nlet b  = require("b")();',
    'let a  = require("a")();\nlet ab = require("ab")();',
    'let a = require("a")();\n\nlet ab = require("ab")();',
    'let a = Bluebird.promisifyAll(require("a"));',
    'let a = Bluebird.promisifyAll(require("a"));\nlet b = Bluebird.promisifyAll(require("b"));',
    'let ab = Bluebird.promisifyAll(require("ab"));\nlet b  = Bluebird.promisifyAll(require("b"));',
    'let a  = Bluebird.promisifyAll(require("a"));\nlet ab = Bluebird.promisifyAll(require("ab"));',
    'let a = Bluebird.promisifyAll(require("a"));\n\nlet ab = Bluebird.promisifyAll(require("ab"));',
    'let a = Bluebird.promisify(require("a").a);',
    'let a = Bluebird.promisify(require("a").a);\nlet b = Bluebird.promisify(require("b").b);',
    'let ab = Bluebird.promisify(require("ab").ab);\nlet b  = Bluebird.promisify(require("b").b);',
    'let a  = Bluebird.promisify(require("a").a);\nlet ab = Bluebird.promisify(require("ab").ab);',
    'let a = Bluebird.promisify(require("a").a);\n\nlet ab = Bluebird.promisify(require("ab").ab);',
    'let a = Factory.build("a");',
    'let a = Factory.build("a");\nlet b = Factory.build("b");',
    'let ab = Factory.build("ab");\nlet b  = Factory.build("b");',
    'let a  = Factory.build("a");\nlet ab = Factory.build("ab");',
    'let a = Factory.build("a");\n\nlet ab = Factory.build("ab");',
    'let a = NamedFactory.build();',
    'let a = NamedFactory.build();\nlet b = NamedFactory.build();',
    'let ab = NamedFactory.build();\nlet b  = NamedFactory.build();',
    'let a  = NamedFactory.build();\nlet ab = NamedFactory.build();',
    'let a = NamedFactory.build();\n\nlet ab = NamedFactory.build();',
    'let a = "a";\nlet ab = "ab";'
  ],
  invalid: [{
    code: 'let a  = require("a");',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a   = require("a");',
    errors: [{ message: 'Extra spaces before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a= require("a");',
    errors: [{ message: 'Missing space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =  require("a");',
    errors: [{ message: 'Extra space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =   require("a");',
    errors: [{ message: 'Extra spaces after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =require("a");',
    errors: [{ message: 'Missing space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = require("a");\nlet b = require("b");',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = require("a");\nlet b  = require("b");',
    errors: [
      { message: 'Extra space before equals for variable \'a\'.', line: 1 },
      { message: 'Extra space before equals for variable \'b\'.', line: 2 }
    ]
  }, {
    code: 'let a = require("a");\nlet b  = require("b");',
    errors: [{ message: 'Extra space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = require("ab");\nlet b = require("b");',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = require("ab");\nlet b  = require("b");\n\nlet c  = require("c");',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let ab = "ab";\nlet b = "b";\n\nlet c  = require("c");',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let a  = require("a").a;',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a   = require("a").a;',
    errors: [{ message: 'Extra spaces before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a= require("a").a;',
    errors: [{ message: 'Missing space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =  require("a").a;',
    errors: [{ message: 'Extra space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =   require("a").a;',
    errors: [{ message: 'Extra spaces after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =require("a").a;',
    errors: [{ message: 'Missing space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = require("a").a;\nlet b = require("b").b;',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = require("a").a;\nlet b  = require("b").b;',
    errors: [
      { message: 'Extra space before equals for variable \'a\'.', line: 1 },
      { message: 'Extra space before equals for variable \'b\'.', line: 2 }
    ]
  }, {
    code: 'let a = require("a").a;\nlet b  = require("b").b;',
    errors: [{ message: 'Extra space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = require("ab").ab;\nlet b = require("b").b;',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = require("ab").ab;\nlet b  = require("b").b;\n\nlet c  = require("c").c;',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let ab = "ab";\nlet b = "b";\n\nlet c  = require("c").c;',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let a  = require("a")();',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a   = require("a")();',
    errors: [{ message: 'Extra spaces before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a= require("a")();',
    errors: [{ message: 'Missing space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =  require("a")();',
    errors: [{ message: 'Extra space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =   require("a")();',
    errors: [{ message: 'Extra spaces after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =require("a")();',
    errors: [{ message: 'Missing space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = require("a")();\nlet b = require("b")();',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = require("a")();\nlet b  = require("b")();',
    errors: [
      { message: 'Extra space before equals for variable \'a\'.', line: 1 },
      { message: 'Extra space before equals for variable \'b\'.', line: 2 }
    ]
  }, {
    code: 'let a = require("a")();\nlet b  = require("b")();',
    errors: [{ message: 'Extra space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = require("ab")();\nlet b = require("b")();',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = require("ab")();\nlet b  = require("b")();\n\nlet c  = require("c")();',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let ab = "ab";\nlet b = "b";\n\nlet c  = require("c")();',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let a  = Bluebird.promisifyAll(require("a"));',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a   = Bluebird.promisifyAll(require("a"));',
    errors: [{ message: 'Extra spaces before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a= Bluebird.promisifyAll(require("a"));',
    errors: [{ message: 'Missing space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =  Bluebird.promisifyAll(require("a"));',
    errors: [{ message: 'Extra space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =   Bluebird.promisifyAll(require("a"));',
    errors: [{ message: 'Extra spaces after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =Bluebird.promisifyAll(require("a"));',
    errors: [{ message: 'Missing space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = Bluebird.promisifyAll(require("a"));\nlet b = Bluebird.promisifyAll(require("b"));',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = Bluebird.promisifyAll(require("a"));\nlet b  = Bluebird.promisifyAll(require("b"));',
    errors: [
      { message: 'Extra space before equals for variable \'a\'.', line: 1 },
      { message: 'Extra space before equals for variable \'b\'.', line: 2 }
    ]
  }, {
    code: 'let a = Bluebird.promisifyAll(require("a"));\nlet b  = Bluebird.promisifyAll(require("b"));',
    errors: [{ message: 'Extra space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = Bluebird.promisifyAll(require("ab"));\nlet b = Bluebird.promisifyAll(require("b"));',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = Bluebird.promisifyAll(require("ab"));\nlet b  = Bluebird.promisifyAll(require("b"));\n\nlet c  = Bluebird.promisifyAll(require("c"));',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let ab = "ab";\nlet b = "b";\n\nlet c  = Bluebird.promisifyAll(require("c"));',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let a  = Bluebird.promisify(require("a").a);',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a   = Bluebird.promisify(require("a").a);',
    errors: [{ message: 'Extra spaces before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a= Bluebird.promisify(require("a").a);',
    errors: [{ message: 'Missing space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =  Bluebird.promisify(require("a").a);',
    errors: [{ message: 'Extra space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =   Bluebird.promisify(require("a").a);',
    errors: [{ message: 'Extra spaces after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =Bluebird.promisify(require("a").a);',
    errors: [{ message: 'Missing space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = Bluebird.promisify(require("a").a);\nlet b = Bluebird.promisify(require("b").b);',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = Bluebird.promisify(require("a").a);\nlet b  = Bluebird.promisify(require("b").b);',
    errors: [
      { message: 'Extra space before equals for variable \'a\'.', line: 1 },
      { message: 'Extra space before equals for variable \'b\'.', line: 2 }
    ]
  }, {
    code: 'let a = Bluebird.promisify(require("a").a);\nlet b  = Bluebird.promisify(require("b").b);',
    errors: [{ message: 'Extra space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = Bluebird.promisify(require("ab").ab);\nlet b = Bluebird.promisify(require("b").b);',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = Bluebird.promisify(require("ab").ab);\nlet b  = Bluebird.promisify(require("b").b);\n\nlet c  = Bluebird.promisify(require("c").c);',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let ab = "ab";\nlet b = "b";\n\nlet c  = Bluebird.promisify(require("c").c);',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let a  = require("a")()();',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let ab = require("ab").ab;\nlet b = require("b");',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = require("ab")();\nlet b = require("b");',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = Bluebird.promisifyAll(require("ab"));\nlet b = require("b");',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = Bluebird.promisify(require("ab").ab);\nlet b = require("b");',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let a  = Factory.build("a");',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a   = Factory.build("a");',
    errors: [{ message: 'Extra spaces before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a= Factory.build("a");',
    errors: [{ message: 'Missing space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =  Factory.build("a");',
    errors: [{ message: 'Extra space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =   Factory.build("a");',
    errors: [{ message: 'Extra spaces after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =Factory.build("a");',
    errors: [{ message: 'Missing space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = Factory.build("a");\nlet b = Factory.build("b");',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = NamedFactory.build();\nlet b  = NamedFactory.build();',
    errors: [
      { message: 'Extra space before equals for variable \'a\'.', line: 1 },
      { message: 'Extra space before equals for variable \'b\'.', line: 2 }
    ]
  }, {
    code: 'let a = NamedFactory.build();\nlet b  = NamedFactory.build();',
    errors: [{ message: 'Extra space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = NamedFactory.build();\nlet b = NamedFactory.build();',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = NamedFactory.build();\nlet b  = NamedFactory.build();\n\nlet c  = NamedFactory.build();',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let ab = "ab";\nlet b = "b";\n\nlet c  = NamedFactory.build();',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let a  = NamedFactory.build();',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a   = NamedFactory.build();',
    errors: [{ message: 'Extra spaces before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a= NamedFactory.build();',
    errors: [{ message: 'Missing space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =  NamedFactory.build();',
    errors: [{ message: 'Extra space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =   NamedFactory.build();',
    errors: [{ message: 'Extra spaces after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a =NamedFactory.build();',
    errors: [{ message: 'Missing space after equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = NamedFactory.build();\nlet b = NamedFactory.build();',
    errors: [{ message: 'Extra space before equals for variable \'a\'.', line: 1 }]
  }, {
    code: 'let a  = NamedFactory.build();\nlet b  = NamedFactory.build();',
    errors: [
      { message: 'Extra space before equals for variable \'a\'.', line: 1 },
      { message: 'Extra space before equals for variable \'b\'.', line: 2 }
    ]
  }, {
    code: 'let a = NamedFactory.build();\nlet b  = NamedFactory.build();',
    errors: [{ message: 'Extra space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = NamedFactory.build();\nlet b = NamedFactory.build();',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = NamedFactory.build();\nlet b  = NamedFactory.build();\n\nlet c  = NamedFactory.build();',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let ab = "ab";\nlet b = "b";\n\nlet c  = NamedFactory.build();',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }]
});

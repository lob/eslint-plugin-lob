'use strict';

const RuleTester = require('eslint').RuleTester;

const Rule = require('../../lib/rules/align-equals');

const Tester = new RuleTester({ ecmaFeatures: { blockBindings: true } });

Tester.run('align-equals', Rule, {
  valid: [
    'let a = require("a");',
    'let a = require("a");\nlet b = require("b");',
    'let ab = require("ab");\nlet b  = require("b");',
    'let a  = require("a");\nlet ab = require("ab");',
    'let a = require("a");\n\nlet ab = require("ab");',
    'let a = Factory.build("a");',
    'let a = Factory.build("a");\nlet b = Factory.build("b");',
    'let ab = Factory.build("ab");\nlet b  = Factory.build("b");',
    'let a  = Factory.build("a");\nlet ab = Factory.build("ab");',
    'let a = Factory.build("a");\n\nlet ab = Factory.build("ab");',
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
    code: 'let a  = Factory.build("a");\nlet b  = Factory.build("b");',
    errors: [
      { message: 'Extra space before equals for variable \'a\'.', line: 1 },
      { message: 'Extra space before equals for variable \'b\'.', line: 2 }
    ]
  }, {
    code: 'let a = Factory.build("a");\nlet b  = Factory.build("b");',
    errors: [{ message: 'Extra space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = Factory.build("ab");\nlet b = Factory.build("b");',
    errors: [{ message: 'Missing space before equals for variable \'b\'.', line: 2 }]
  }, {
    code: 'let ab = Factory.build("ab");\nlet b  = Factory.build("b");\n\nlet c  = Factory.build("c");',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }, {
    code: 'let ab = "ab";\nlet b = "b";\n\nlet c  = Factory.build("c");',
    errors: [{ message: 'Extra space before equals for variable \'c\'.', line: 4 }]
  }]
});

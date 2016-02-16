'use strict';

const RuleTester = require('eslint').RuleTester;

const Rule = require('../../lib/rules/padded-describes');

const Tester = new RuleTester({ ecmaFeatures: { arrowFunctions: true } });

const TOP_ERROR_MESSAGE    = 'Missing new line at the top of a describe block.';
const BOTTOM_ERROR_MESSAGE = 'Missing new line at the bottom of a describe block.';

Tester.run('padded-describes', Rule, {
  valid: [
    'describe("", function () {});',
    'describe("", function () {\n\nvar a = "";\n\n});',
    'describe("", function () {\n\n// comment\n\n});',
    'describe("", function () {\n\n/* comment */\n\n});',
    'describe("", function () { // comment\n\nvar a = "";\n\n});',
    'describe("", function () {\n\nvar a = "";\n\n/* comment */ });',
    'describe("", () => {\n\nvar a = "";\n\n});',
    'it("", function () {\n\nvar a = "";\n\n});',
    'it("", function () {\nvar a = "";\n});',
    'it("", function () { var a = ""; });',
    'var a = function () {};',
    'function a () {}',
    '(function () {})(function () {});'
  ],
  invalid: [{
    code: 'describe("", function () { var a = ""; });',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }, { message: BOTTOM_ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", function () {\nvar a = "";\n});',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }, { message: BOTTOM_ERROR_MESSAGE, line: 3 }]
  }, {
    code: 'describe("", function () {\n\nvar a = "";\n});',
    errors: [{ message: BOTTOM_ERROR_MESSAGE, line: 4 }]
  }, {
    code: 'describe("", function () {\nvar a = "";\n\n});',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", function () {\n// comment\nvar a = "";\n});',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }, { message: BOTTOM_ERROR_MESSAGE, line: 4 }]
  }, {
    code: 'describe("", function () {\n/* comment */ var a = "";\n});',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }, { message: BOTTOM_ERROR_MESSAGE, line: 3 }]
  }, {
    code: 'describe("", function () {\nvar a = "";\n// comment\n});',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }, { message: BOTTOM_ERROR_MESSAGE, line: 4 }]
  }, {
    code: 'describe("", function () {\nvar a = ""; /* comment */\n});',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }, { message: BOTTOM_ERROR_MESSAGE, line: 3 }]
  }, {
    code: 'describe("", () => { var a = ""; });',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }, { message: BOTTOM_ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", () => {\nvar a = "";\n});',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }, { message: BOTTOM_ERROR_MESSAGE, line: 3 }]
  }, {
    code: 'describe("", () => {\n\nvar a = "";\n});',
    errors: [{ message: BOTTOM_ERROR_MESSAGE, line: 4 }]
  }, {
    code: 'describe("", () => {\nvar a = "";\n\n});',
    errors: [{ message: TOP_ERROR_MESSAGE, line: 1 }]
  }]
});

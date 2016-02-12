'use strict';

const RuleTester = require('eslint').RuleTester;

const Rule = require('../../lib/rules/newline-after-mocha');

const Tester = new RuleTester({ ecmaFeatures: { arrowFunctions: true } });

const ERROR_MESSAGE = 'It and describe blocks must be separated by new lines.';

Tester.run('newline-after-mocha', Rule, {
  valid: [
    'it("", function () {});\n\nit("", function () {});',
    'describe("", function () {});\n\ndescribe("", function () {});',
    'it("", function () {});\n\ndescribe("", function () {});',
    'describe("", function () {});\n\nit("", function () {});',
    'beforeEach("", function () {});\n\nbeforeEach("", function () {});',
    'afterEach("", function () {});\n\nafterEach("", function () {});',
    'before("", function () {});\n\nbefore("", function () {});',
    'after("", function () {});\n\nafter("", function () {});',
    'describe("", function () {\nit("", function () {});\n\nit("", function () {});\n});',
    'a("", function () {});\nb("", function () {});',
    'it("", () => {});\n\nit("", () => {});',
    'describe("", () => {});\n\ndescribe("", () => {});',
    'it("", () => {});\n\ndescribe("", () => {});',
    'describe("", () => {});\n\nit("", () => {});',
    'beforeEach("", () => {});\n\nbeforeEach("", () => {});',
    'afterEach("", () => {});\n\nafterEach("", () => {});',
    'before("", () => {});\n\nbefore("", () => {});',
    'after("", () => {});\n\nafter("", () => {});',
    'describe("", () => {\nit("", () => {});\n\nit("", () => {});\n});',
    'a("", () => {});\nb("", () => {});',
    'var a = b();'
  ],
  invalid: [{
    code: 'it("", function () {});it("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", function () {});describe("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'it("", function () {});describe("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", function () {});it("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'beforeEach("", function () {});beforeEach("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'afterEach("", function () {});afterEach("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'before("", function () {});before("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'after("", function () {});after("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'it("", function () {});\nit("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", function () {});\ndescribe("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'it("", function () {});\ndescribe("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", function () {});\nit("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'beforeEach("", function () {});\nbeforeEach("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'afterEach("", function () {});\nafterEach("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'before("", function () {});\nbefore("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'after("", function () {});\nafter("", function () {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", function () {\nit("", function () {});it("", function () {});\n});',
    errors: [{ message: ERROR_MESSAGE, line: 2 }]
  }, {
    code: 'describe("", function () {\nit("", function () {});\nit("", function () {});\n});',
    errors: [{ message: ERROR_MESSAGE, line: 2 }]
  }, {
    code: 'it("", () => {});it("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", () => {});describe("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'it("", () => {});describe("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", () => {});it("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'beforeEach("", () => {});beforeEach("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'afterEach("", () => {});afterEach("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'before("", () => {});before("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'after("", () => {});after("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'it("", () => {});\nit("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", () => {});\ndescribe("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'it("", () => {});\ndescribe("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", () => {});\nit("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'beforeEach("", () => {});\nbeforeEach("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'afterEach("", () => {});\nafterEach("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'before("", () => {});\nbefore("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'after("", () => {});\nafter("", () => {});',
    errors: [{ message: ERROR_MESSAGE, line: 1 }]
  }, {
    code: 'describe("", () => {\nit("", () => {});it("", () => {});\n});',
    errors: [{ message: ERROR_MESSAGE, line: 2 }]
  }, {
    code: 'describe("", () => {\nit("", () => {});\nit("", () => {});\n});',
    errors: [{ message: ERROR_MESSAGE, line: 2 }]
  }]
});

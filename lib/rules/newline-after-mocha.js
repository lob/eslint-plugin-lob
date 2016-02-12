'use strict';

const ERROR_MESSAGE = 'It and describe blocks must be separated by new lines.';

function isMochaCall (node) {
  return node.callee.name === 'it' ||
    node.callee.name === 'describe' ||
    node.callee.name === 'beforeEach' ||
    node.callee.name === 'afterEach' ||
    node.callee.name === 'before' ||
    node.callee.name === 'after';
}

function isLastNode (node) {
  return node.parent.body[node.parent.body.length - 1] === node;
}

module.exports = function (ctx) {
  return {
    CallExpression: (node) => {
      const statement = node.parent;

      if (!isMochaCall(node)) {
        return;
      }

      if (isLastNode(statement)) {
        return;
      }

      const lastToken = ctx.getLastToken(statement);
      const nextToken = ctx.getTokenAfter(statement);
      const expectedNextLineNum = lastToken.loc.end.line + 1;
      const hasNewLine = nextToken.loc.start.line > expectedNextLineNum;

      if (!hasNewLine) {
        ctx.report(node, ERROR_MESSAGE, { identifier: node.name });
      }
    }
  };
};

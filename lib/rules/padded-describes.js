'use strict';

const ERROR_MESSAGE = 'Describe blocks must be padded by blank lines.';

function isFunctionExpression (nodeType) {
  return nodeType === 'FunctionExpression' || nodeType === 'ArrowFunctionExpression';
}

function isDescribeBlock (node) {
  return isFunctionExpression(node.parent.type) &&
    node.parent.parent.type === 'CallExpression' &&
    node.parent.parent.callee.name === 'describe';
}

function isLocatedBefore (a, b) {
  return a.range[1] < b.range[0];
}

module.exports = function (ctx) {
  function isBlockTopPadded (node) {
    const blockStart = node.loc.start.line;
    const first = node.body[0];
    const expectedFirstLine = blockStart + 2;
    const leadingComments = (first.leadingComments || []).slice();
    let firstLine = first.loc.start.line;

    while (leadingComments.length > 0 && leadingComments[0].loc.start.line <= node.loc.start.line) {
      leadingComments.shift();
    }

    const firstComment = leadingComments[0];

    if (firstComment && isLocatedBefore(firstComment, first)) {
      firstLine = firstComment.loc.start.line;
    }

    return expectedFirstLine <= firstLine;
  }

  function isBlockBottomPadded (node) {
    const blockEnd = node.loc.end.line;
    const last = node.body[node.body.length - 1];
    const lastToken = ctx.getLastToken(last);
    const expectedLastLine = blockEnd - 2;
    const trailingComments = (last.trailingComments || []).slice();
    let lastLine = lastToken.loc.end.line;

    while (trailingComments.length > 0 && trailingComments[trailingComments.length - 1].loc.end.line >= node.loc.end.line) {
      trailingComments.pop();
    }

    const lastComment = trailingComments[trailingComments.length - 1];

    if (lastComment && isLocatedBefore(lastToken, lastComment)) {
      lastLine = lastComment.loc.end.line;
    }

    return lastLine <= expectedLastLine;
  }

  return {
    BlockStatement: (node) => {
      if (node.body.length > 0 && isDescribeBlock(node)) {
        const blockHasTopPadding = isBlockTopPadded(node);
        const blockHasBottomPadding = isBlockBottomPadded(node);

        if (!blockHasTopPadding) {
          ctx.report(node, ERROR_MESSAGE);
        }

        if (!blockHasBottomPadding) {
          ctx.report({
            node,
            loc: { line: node.loc.end.line, column: node.loc.end.column - 1 },
            message: ERROR_MESSAGE
          });
        }
      }
    }
  };
};

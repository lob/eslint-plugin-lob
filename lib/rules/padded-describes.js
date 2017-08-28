'use strict';

var ERROR_MESSAGE = 'Missing new line at the {{position}} of a describe block.';

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
    var blockStart = node.loc.start.line;
    var first = node.body[0];
    var expectedFirstLine = blockStart + 2;
    var leadingComments = (first.leadingComments || []).slice();
    var firstLine = first.loc.start.line;

    while (leadingComments.length > 0 && leadingComments[0].loc.start.line <= node.loc.start.line) {
      leadingComments.shift();
    }

    var firstComment = leadingComments[0];

    if (firstComment && isLocatedBefore(firstComment, first)) {
      firstLine = firstComment.loc.start.line;
    }

    return expectedFirstLine <= firstLine;
  }

  function isBlockBottomPadded (node) {
    var blockEnd = node.loc.end.line;
    var last = node.body[node.body.length - 1];
    var lastToken = ctx.getLastToken(last);
    var expectedLastLine = blockEnd - 2;
    var trailingComments = (last.trailingComments || []).slice();
    var lastLine = lastToken.loc.end.line;

    while (trailingComments.length > 0 && trailingComments[trailingComments.length - 1].loc.end.line >= node.loc.end.line) {
      trailingComments.pop();
    }

    var lastComment = trailingComments[trailingComments.length - 1];

    if (lastComment && isLocatedBefore(lastToken, lastComment)) {
      lastLine = lastComment.loc.end.line;
    }

    return lastLine <= expectedLastLine;
  }

  return {
    BlockStatement: function (node) {
      if (node.body.length > 0 && isDescribeBlock(node)) {
        var blockHasTopPadding = isBlockTopPadded(node);
        var blockHasBottomPadding = isBlockBottomPadded(node);

        if (!blockHasTopPadding) {
          ctx.report(node, ERROR_MESSAGE, { position: 'top' });
        }

        if (!blockHasBottomPadding) {
          var loc = { line: node.loc.end.line, column: node.loc.end.column - 1 };

          ctx.report(node, loc, ERROR_MESSAGE, { position: 'bottom' });
        }
      }
    }
  };
};

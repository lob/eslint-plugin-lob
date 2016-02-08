'use strict';

const ERROR_MESSAGE = 'Describe blocks must be padded by blank lines.';

/**
 * Determine if provided nodeType is a function type.
 * @private
 * @param {String} nodeType - type to test
 * @returns {Boolean} true if `nodeType` is a function type
 */
function isFunctionExpression (nodeType) {
  return nodeType === 'FunctionExpression' || nodeType === 'ArrowFunctionExpression';
}

/**
 * Checks if the given non empty block node is the callback of a describe function.
 * @param {ASTNode} node - the AST node of a BlockStatement
 * @returns {Boolean} whether or not the block is the callback of a describe function
 */
function isDescribeBlock (node) {
  return isFunctionExpression(node.parent.type) &&
    node.parent.parent.type === 'CallExpression' &&
    node.parent.parent.callee.name === 'describe';
}

/**
 * Checks if the location of a node or token is before the location of another node or token.
 * @param {ASTNode|Token} a - the node or token to check if its location is before b
 * @param {ASTNode|Token} b - the node or token which will be compared with a
 * @returns {Boolean} true if a is located before b
 */
function isLocatedBefore (a, b) {
  return a.range[1] < b.range[0];
}

module.exports = function (ctx) {
  /**
   * Checks if the given non empty block node has a blank line before its first child node.
   * @param {ASTNode} node - the AST node of a BlockStatement
   * @returns {Boolean} whether or not the block starts with a blank line
   */
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

  /**
   * Checks if the given non empty block node has a blank line after its last child node.
   * @param {ASTNode} node - the AST node of a BlockStatement
   * @returns {Boolean} whether or not the block ends with a blank line
   */
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

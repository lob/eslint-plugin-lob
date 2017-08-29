'use strict';

var ERROR_MESSAGE = '{{error}} {{plural}} {{position}} equals for variable \'{{variable}}\'.';

function isDirectRequire (declaration) {
  return declaration.init &&
    declaration.init.type === 'CallExpression' &&
    declaration.init.callee.name === 'require';
}

function isFunctionRequire (declaration) {
  if (declaration.init && declaration.init.type === 'CallExpression') {
    var callee = declaration.init.callee;

    while (callee.type === 'CallExpression') {
      callee = callee.callee;
    }

    return callee.name === 'require';
  }
}

function isPropertyRequire (declaration) {
  return declaration.init &&
    declaration.init.type === 'MemberExpression' &&
    declaration.init.object.type === 'CallExpression' &&
    declaration.init.object.callee.name === 'require';
}

function isRequire (declaration) {
  return isDirectRequire(declaration) || isPropertyRequire(declaration) || isFunctionRequire(declaration);
}

function isFactoryBuild (declaration) {
  return declaration.init &&
    declaration.init.type === 'CallExpression' &&
    declaration.init.callee.object && declaration.init.callee.object.name && declaration.init.callee.object.name.indexOf('Factory') !== -1 &&
    declaration.init.callee.property && declaration.init.callee.property.name === 'build';
}

function isPromisification (declaration) {
  return declaration.init &&
    declaration.init.type === 'CallExpression' &&
    declaration.init.callee.object && declaration.init.callee.object.name === 'Bluebird' &&
    declaration.init.callee.property &&
    (declaration.init.callee.property.name === 'promisify' || declaration.init.callee.property.name === 'promisifyAll');
}

function shouldBeAligned (declaration) {
  return isRequire(declaration) || isFactoryBuild(declaration) || isPromisification(declaration);
}

module.exports = function (ctx) {
  var expectedEqualsLocations = [];

  function getNextEqual (node) {
    while (node && (node.type !== 'Punctuator' || node.value !== '=')) {
      node = ctx.getTokenAfter(node);
    }

    return node;
  }

  function populateExpectedEqualsLocations (sourceNode) {
    var declarations = sourceNode.parent.body.filter(function (node) {
      var isDeclaration = node.type === 'VariableDeclaration';
      var isInSourceBlock = node.loc.start.line >= sourceNode.loc.start.line;

      return isDeclaration && isInSourceBlock && shouldBeAligned(node.declarations[0]);
    });
    var linesInBlock = [];
    var prevNode;

    var expectedEqualsLocation = declarations.reduce(function (maxLoc, node) {
      if (prevNode && prevNode.loc.start.line + 1 < node.loc.start.line) {
        return maxLoc;
      }
      linesInBlock.push(node.loc.start.line - 1);
      prevNode = node;

      var declaration = node.declarations[0];

      var variableToken = declaration.id;
      var newLoc = variableToken.loc.end.column + 1;

      return maxLoc < newLoc ? newLoc : maxLoc;
    }, 0);

    linesInBlock.forEach(function (line) {
      expectedEqualsLocations[line] = expectedEqualsLocation;
    });
  }

  return {
    VariableDeclaration: function (node) {
      var declaration = node.declarations[0];

      if (!shouldBeAligned(declaration)) {
        return;
      }

      var variableToken = declaration.id;
      var equalToken = getNextEqual(variableToken);
      var nextToken = ctx.getTokenAfter(equalToken);
      var line = variableToken.loc.start.line - 1;

      if (typeof expectedEqualsLocations[line] === 'undefined') {
        populateExpectedEqualsLocations(node);
      }

      var beforeDiff = equalToken.loc.start.column - expectedEqualsLocations[line];

      if (beforeDiff !== 0) {
        ctx.report(node, equalToken.loc.start, ERROR_MESSAGE, {
          error: beforeDiff > 0 ? 'Extra' : 'Missing',
          plural: Math.abs(beforeDiff) === 1 ? 'space' : 'spaces',
          position: 'before',
          variable: variableToken.name
        });
      }

      var afterDiff = nextToken.loc.start.column - (equalToken.loc.start.column + 2);

      if (afterDiff !== 0) {
        ctx.report(node, nextToken.loc.start, ERROR_MESSAGE, {
          error: afterDiff > 0 ? 'Extra' : 'Missing',
          plural: Math.abs(afterDiff) === 1 ? 'space' : 'spaces',
          position: 'after',
          variable: variableToken.name
        });
      }
    }
  };
};

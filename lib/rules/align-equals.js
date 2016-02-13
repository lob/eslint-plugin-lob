'use strict';

const ERROR_MESSAGE = '{{error}} {{plural}} {{position}} equals for variable \'{{variable}}\'.';

function isRequire (declaration) {
  return declaration.init &&
    declaration.init.type === 'CallExpression' &&
    declaration.init.callee.name === 'require';
}

function isFactoryBuild (declaration) {
  return declaration.init &&
    declaration.init.type === 'CallExpression' &&
    declaration.init.callee.object && declaration.init.callee.object.name === 'Factory' &&
    declaration.init.callee.property && declaration.init.callee.property.name === 'build';
}

module.exports = function (ctx) {
  const expectedEqualsLocations = [];

  function getNextEqual (node) {
    while (node && (node.type !== 'Punctuator' || node.value !== '=')) {
      node = ctx.getTokenAfter(node);
    }

    return node;
  }

  function populateExpectedEqualsLocations (sourceNode) {
    const declarations = sourceNode.parent.body.filter((node) => {
      const isDeclaration = node.type === 'VariableDeclaration';
      const isInSourceBlock = node.loc.start.line >= sourceNode.loc.start.line;
      const declaration = node.declarations[0];

      return isDeclaration && isInSourceBlock && (isRequire(declaration) || isFactoryBuild(declaration));
    });
    const linesInBlock = [];
    let prevNode;

    const expectedEqualsLocation = declarations.reduce((maxLoc, node) => {
      if (prevNode && prevNode.loc.start.line + 1 < node.loc.start.line) {
        return maxLoc;
      }
      linesInBlock.push(node.loc.start.line - 1);
      prevNode = node;

      const declaration = node.declarations[0];

      const variableToken = declaration.id;
      const newLoc = variableToken.loc.end.column + 1;

      return maxLoc < newLoc ? newLoc : maxLoc;
    }, 0);

    linesInBlock.forEach((line) => {
      expectedEqualsLocations[line] = expectedEqualsLocation;
    });
  }

  return {
    VariableDeclaration: (node) => {
      const declaration = node.declarations[0];

      if (!isRequire(declaration) && !isFactoryBuild(declaration)) {
        return;
      }

      const variableToken = declaration.id;
      const equalToken = getNextEqual(variableToken);
      const nextToken = ctx.getTokenAfter(equalToken);
      const line = variableToken.loc.start.line - 1;

      if (typeof expectedEqualsLocations[line] === 'undefined') {
        populateExpectedEqualsLocations(node);
      }

      const beforeDiff = equalToken.loc.start.column - expectedEqualsLocations[line];

      if (beforeDiff !== 0) {
        ctx.report(node, equalToken.loc.start, ERROR_MESSAGE, {
          error: beforeDiff > 0 ? 'Extra' : 'Missing',
          plural: Math.abs(beforeDiff) === 1 ? 'space' : 'spaces',
          position: 'before',
          variable: variableToken.name
        });
      }

      const afterDiff = nextToken.loc.start.column - (equalToken.loc.start.column + 2);

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

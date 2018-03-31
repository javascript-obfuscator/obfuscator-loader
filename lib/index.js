const loaderUtils = require('loader-utils');
const JavaScriptObfuscator = require('javascript-obfuscator');
const esprima = require('esprima');

// Checks if node argument is a require expression
function isRequire(node) {
  return (node.type === 'CallExpression') && (node.callee.type === 'Identifier') && (node.callee.name === 'require');
}

module.exports = function obfuscator(source) {
  this.cacheable = true;

  // Parses source code and collects require expression nodes
  const entries = [];

  try {
    esprima.parseScript(source, {}, (node, meta) => {
      if (isRequire(node)) {
        entries.push({
          start: meta.start.offset,
          end: meta.end.offset,
        });
      }
    });
  } catch (err) {
    esprima.parseModule(source, {}, (node, meta) => {
      if (isRequire(node)) {
        entries.push({
          start: meta.start.offset,
          end: meta.end.offset,
        });
      }
    });
  }

  // Wraps requires in conditional comments
  let commentedSource = source.slice();
  entries.sort((a, b) => b.end - a.end).forEach((n) => {
    const before = commentedSource.slice(0, n.start);
    const mid = commentedSource.slice(n.start, n.end);
    const after = commentedSource.slice(n.end);
    commentedSource = `${before}/* javascript-obfuscator:disable */${mid}/* javascript-obfuscator:enable */${after}`;
  });

  // Obfuscates commented source code
  const options = loaderUtils.getOptions(this) || {};
  const obfuscationResult = JavaScriptObfuscator.obfuscate(commentedSource, options);
  const code = obfuscationResult.getObfuscatedCode();
  return code;
};

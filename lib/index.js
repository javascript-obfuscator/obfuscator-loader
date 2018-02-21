const loaderUtils = require('loader-utils');
const JavaScriptObfuscator = require('javascript-obfuscator');

module.exports = function obfuscator(source) {
  this.cacheable = false;
  const options = loaderUtils.getOptions(this) || {};
  options.stringArray = false;
  const obfuscationResult = JavaScriptObfuscator.obfuscate(source, options);
  const code = obfuscationResult.getObfuscatedCode();
  return code;
};

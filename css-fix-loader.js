// css-fix-loader.js
module.exports = function(source) {
  // this.cachable();
  return source.replace(/\};/g, "}");
};
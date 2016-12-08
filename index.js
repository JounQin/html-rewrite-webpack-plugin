const isFunction = function (val) {
  return typeof val === 'function'
}

const camelToHyphen = function (camelStr, hyphen) {
  return camelStr.replace(/([^A-Z])([A-Z])/g, (match, p1, p2) => p1 + (hyphen || '-') + p2).toLowerCase()
}

const HtmlRewriteWebpackPlugin = function (options) {
  Object.assign(this, options)
}

HtmlRewriteWebpackPlugin.prototype.apply = function (compiler) {
  const self = this
  compiler.plugin('compilation', compilation => {
    ['beforeHtmlGeneration', 'beforeHtmlProcessing', 'alterAssetTags', 'afterHtmlProcessing', 'afterEmit']
      .forEach(event => {
        compilation.plugin(`html-webpack-plugin-${camelToHyphen(event)}`, (htmlPluginData, callback) => {
          isFunction(self[event]) && self[event](htmlPluginData)
          isFunction(callback) && callback(null, htmlPluginData)
        })
      })
  })
}

module.exports = HtmlRewriteWebpackPlugin

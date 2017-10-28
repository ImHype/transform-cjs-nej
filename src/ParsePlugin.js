const supportedPlugins = ['text', 'json', 'regular'];

/*
 * 解析插件信息
 * @param  {String} _uri 地址
 * @return {Array}       插件信息
 */

module.exports = function (_uri) {
    let type, _arr = _uri.split('!'); // ['text', './1.html']
    if (~supportedPlugins.indexOf(_arr[0].toLowerCase())) {
        type = _arr.shift();
    }
    return {
        type,
        target: _arr.join('!')
    };
};

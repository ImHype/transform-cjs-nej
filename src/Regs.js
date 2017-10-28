const _reg = /{(.*?)}/gi,
    _reg1 = /([^:])\/+/g,
    _reg3 = /[^/]*$/,
    _reg4 = /\.js$/i,
    _reg5 = /^[{/.]/,
    _reg6 = /(file:\/\/)([^/])/i;

module.exports = {
    _reg,
    _reg1,
    _reg3,
    _reg4,
    _reg5,
    _reg6
};
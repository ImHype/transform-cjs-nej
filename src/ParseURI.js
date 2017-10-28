const {_reg, _reg1, _reg3, _reg4, _reg5, _reg6} = require('./Regs');
const path = require('path');

/*
 * 格式化地址,取绝对路径
 * @param  {String} _uri 待格式化地址
 * @return {String}      格式化后地址
 */
function AnalysisURI (config, {
    basefile, type, target
}) {
    if (!target) return '';

    if (_absolute(target)) {
        return _format(target);
    }

    if (basefile && target.indexOf('.') == 0) {
        target = _root(basefile) + target;
    }

    target = _slash(_amdpath(target, type, config));

    const _uri2 = target.replace(
        _reg, function ($1, $2) {
            return (config.root[$2] || $2) + '/';
        }
    );

    /**
     * 如果不是绝对路径，则相对于当前位置做处理
     * @type {*}
     * @private
     */
    const abs = path.resolve(path.parse(basefile).dir, _uri2);

    return _format(abs);
}


function _absolute(_uri) {
    return _uri.indexOf('://') > 0;
}

function _slash(_uri) {
    return _uri.replace(_reg1, '$1/');
}

function _root(_uri) {
    return _uri.replace(_reg3, '');
}

function _format(_uri) {
    return _uri.replace(_reg6, '$1/$2');
}

function _amdpath(_uri, _type, config) {
    if (_reg4.test(_uri) ||
        _reg5.test(_uri) ||
        _absolute(_uri)) {
        return _uri;
    }
    const _arr = _uri.split('/'),
        _path = config.root[_arr[0]],
        _sufx = !_type ? '.js' : '';
    if (_path) {
        _arr.shift();
        return _path + '/' + _arr.join('/') + _sufx;
    }
    return '{lib}' + _arr.join('/') + _sufx;
}

exports = module.exports = AnalysisURI;
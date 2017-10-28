/*
 * 格式化输入参数
 * @param  {String}   字符串
 * @param  {Array}    数组
 * @param  {Function} 函数
 * @return {Array}    格式化后的参数列表
 */
module.exports = function (args) {
    const _args = [null, null, null],
        _kfun = [
            function (_arg) {
                return isTypeOf(_arg, 'String');
            },
            function (_arg) {
                return isTypeOf(_arg, 'Array');
            },
            function (_arg) {
                return isTypeOf(_arg, 'Function');
            }
        ];

    for (let i = 0, l = args.length, _it; i < l; i++) {
        _it = args[i];

        for (let j = 0, k = _kfun.length; j < k; j++) {
            if (_kfun[j](_it)) {
                _args[j] = _it;
                break;
            }
        }
    }

    if (!_args[1]) {
        _args[1] = [];
    }

    if (!_args[2]) {
        _args[2] = function () {
            return !1;
        };
    }
    
    return _args;
};

function isTypeOf(_data, _type) {
    return Object.prototype.toString.call(_data) === '[object ' + _type + ']';
}

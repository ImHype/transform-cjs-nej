const {_reg} = require('./Regs');

module.exports = function (config, target) {
    const matched = new RegExp(_reg).exec(target);
    if (!matched || !matched[1] || config[matched[1]]) {
        return undefined;
    }
    return matched[1];
};
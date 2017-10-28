function replaceWrapFunctionHead (result, str) {
    return result
        .replace(/(^\s*function[^(]*\([^)]*\)\s*\{)|(^\s*.*=>\s*\{)/, str);
}

module.exports = function ({
    functionBody,
    declarations,
    filename
}) {
    let source = replaceWrapFunctionHead(functionBody, () => {
        return 'function module_exports () {' + ((declarations.length > 0) ? ('\n' + declarations.join('\n')) : '');
    });
    source += 'module.exports = module_exports.apply(this);';
    source += '//' + filename;
    return source;
};

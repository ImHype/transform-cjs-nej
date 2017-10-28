const isomorphicDefine = require('./define');

function createCompiler(source) {
    const compileFunctionString = [
        'const {define, output} = isomorphicDefine(options);',
        'const NEJ = {define};',
        source,
        ';return output();'
    ].join('');
    return new Function('isomorphicDefine', 'options', compileFunctionString);
}

function parse(source, {
    alias, filename
}) {
    let dependencyInfo, compiler;

    compiler = createCompiler(source);

    dependencyInfo = compiler(isomorphicDefine, {
        alias: alias,
        filename
    });

    return dependencyInfo;
}

module.exports = parse;

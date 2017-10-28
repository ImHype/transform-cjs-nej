const WrapFunctionBody = require( './WrapFunctionBody');
const GenerateDeclaration = require( './GenerateDeclaration');
const ParseDependenciesArgs = require( './ParseDependenciesArgs');
const TransformPlaceholderArgs = require( './TransformPlaceholderArgs');

module.exports = function({
    filename = '',
    dependencies = [],
    rawDependencies = [],
    patchList = [],
    functionBody = ''
}, {
    alias,
    replaceArgs,
    isPatch
}) {

    let args = TransformPlaceholderArgs({
        rawDependencies,
        args: ParseDependenciesArgs(functionBody),
        replaceArgs
    });

    const declarations = GenerateDeclaration({
        dependencies,
        filename,
        patchList,
        args
    }, {
        isPatch,
        alias
    });

    return {
        content: WrapFunctionBody({
            functionBody,
            declarations,
            filename
        }),
        declarations
    };
};
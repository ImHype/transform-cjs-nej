const CodeSplit = require('./src/SplitCode');
const AnalyseCode = require('./src/ParseCode');
const TransformCode = require( './src/TransformCode');
const SourceMap = require( './src/SourceMap');

function transform({
    raw, filename
}, {
    alias = [],
    outputAlias = [],
    replaceArgs = {},
    needSourceMap = false,
    isPatch = false
}) {
    
    let refs;

    try {
        refs = CodeSplit({
            raw, filename
        });
    } catch (e) {
        // eslint-disable-next-line
        console.log(`Loader[nej]: don't process: ${filename}`);
        return {
            compiled: raw
        };
    }

    let {
        headCode,
        content: sourceContent
    } = refs;

    try {
        refs = AnalyseCode(sourceContent, {
            alias, filename
        });
    } catch (e) {
        // eslint-disable-next-line
        console.log(`Loader[nej]: don't process: ${filename}`);
        return {
            compiled: raw
        };
    }

    const {
        dependencies,
        rawDependencies,
        patchList,
        functionBody
    } = refs;

    const {content: targetContent, declarations} = TransformCode({
        dependencies,
        rawDependencies,
        patchList,
        functionBody,
        filename
    }, {
        alias: outputAlias,
        outputAlias,
        replaceArgs,
        isPatch
    });

    const compiled = [ headCode, targetContent ].join('');
    let sourceMap;

    if (needSourceMap) {
        try {
            sourceMap = SourceMap({
                headCode,
                sourceContent,
                targetContent,
                declarations,
                filename
            }).toJSON();
        } catch(e) {
            console.warn(`SourceMap setup failed：${filename}!`);
            // console.error(e);
        }
    }

    return {
        compiled, sourceMap
    };
}

module.exports = transform;
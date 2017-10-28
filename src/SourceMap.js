const {SourceMapGenerator} = require('source-map');

module.exports = function ({
    filename = '',
    headCode = '',
    sourceContent = '',
    targetContent = '',
    declarations = [],
} = {}) {
    const sourceCode = sourceContent;
    const sourceMap = new SourceMapGenerator();
    const headCodeCount = countLine(headCode);
    const sourceDepsLine = getSourceDepsLine(sourceContent);
    const sourceDepsLineCount = countLine(sourceDepsLine);
    const commonLineCount = headCodeCount;
    const sourceContentStartLine = commonLineCount + sourceDepsLineCount;
    const targetContentStartLine = commonLineCount + (1 + declarations.length);
    const targetContentCount = countLine(targetContent) - 1;

    sourceMap.setSourceContent(filename, sourceCode);

    let i = 0;
    while (i < targetContentCount) {
        sourceMap.addMapping({
            source: filename,
            original: {
                line: sourceContentStartLine + i,
                column: 0
            },
            generated: {
                line: targetContentStartLine + i,
                column: 0
            }
        });
        i++;
    }
    return sourceMap;
};

function getSourceDepsLine(code) {
    const matched = /define\s*\([^{]*\{\s*/g.exec(code);
    return (matched && matched[0]) || '';
}

function countLine (string) {
    return count(string, '\n');
}

function count(string, substr) {
    var num, pos;
    num = pos = 0;
    if (!substr.length) {
        return 1 / 0;
    }
    
    /* eslint-disable */
    while (pos = 1 + string.indexOf(substr, pos)) {
        /* eslint-enable */
        num++;
    }
    return num;
}
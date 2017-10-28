const VARIABLE = 'var ';
const EQUAL = ' = ';
const SEMICOLON = ';';
const path = require('path');

function getAppendItems() {
    const _o = '{}',
        _r = '[]',
        _f = 'function(){return !1;}';
    return [
        _o,
        _o,
        _f,
        _r
    ];
}

function mergeDepsAndArgs(dependencies, args) {
    return dependencies.map((uri, index) => {
        const name = args[index];
        return {
            name,
            uri,
        };
    });
}

function getDependenciesRequire({name, uri}) {
    const requreStatement = `require('${uri}')`;
    return [
        ...(name ? [
            VARIABLE,
            name,
            EQUAL
        ]: []),
        requreStatement,
        SEMICOLON
    ].join('');
}

function getVariableDefine({name, defineVaribaleStr}) {
    const requreStatement = defineVaribaleStr;

    return [
        VARIABLE,
        name,
        EQUAL,
        requreStatement,
        SEMICOLON
    ].join('');
}

function getPatchRequire (uri) {
    const requreStatement = [
        'if (WITHPATCH) {',
        `require('${uri}')`,
        '};',
        SEMICOLON
    ];
    return requreStatement.join('');
}

function getFinalDependency({
    dependency, base
}, {
    alias
}) {
    function replaceDosSep (relativePath) {
        return relativePath.replace(/\\+/g, '/')
            .split('/')
            .filter(item => !!item)
            .join('/');
    }

    function getFinalPath () {
        if (~dependency.indexOf('://')) {
            return dependency;
        } else {
            const relativePath = path
                .relative(base, dependency)
                .replace(/\.js$/g, '');
            
                
            // 相对路径
            if (!relativePath.startsWith('..')) {
                return './' + relativePath;
            } else {
                let {key, value} = alias.filter(alias => {
                    return !!(~dependency.indexOf(alias.value));
                })[0] || {};
                if (key && value) {
                    return dependency.replace(value.replace(/[\\/]*$/g, ''), key);
                }

                return relativePath;
            }
        }
    }
    
    dependency = getFinalPath(dependency);
    
    dependency = replaceDosSep(dependency);

    return dependency;
}

/**
 * 替换依赖别名
 * @param map
 * @property d
 * @property n
 * @param args
 * @returns {string}
 */

module.exports = function ({
    dependencies, filename, patchList, args
}, {
    isPatch,
    alias
}) {
    const base = path.parse(filename).dir;
    const dependencySize = dependencies.length;

    let appendItems = getAppendItems();
    dependencies = dependencies.map(
        dependency => getFinalDependency({
            dependency, base
        }, {
            alias
        })
    );    

    const matchedDependencies = mergeDepsAndArgs(dependencies, args);
    let declarations = matchedDependencies.map(getDependenciesRequire);

    if (isPatch) {
        declarations = [...declarations, 
            patchList.map(getPatchRequire)
        ];
    }

    // 传参数量比依赖多 -> 注入 p p f r
    if (args.length >= dependencySize) {
        const variableDefineList = args.slice(dependencySize, args.length)
            .map((arg, index) => {
                return {
                    name: arg,
                    defineVaribaleStr: appendItems[index] || '{}'
                };
            });
        declarations = [...declarations, 
            ...variableDefineList.map(getVariableDefine)
        ];
    }
    return declarations;
};
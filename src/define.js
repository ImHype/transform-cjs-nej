const ParseURI = require('./ParseURI');
const ParseDefineArgs = require('./ParseDefineArgs');
const ParseAlias = require('./ParseAlias');
const ParsePlugin = require('./ParsePlugin');
const FilterPatchList = require('./FilterPatchList');

module.exports = function ({alias = [], filename = ''}) {
    const aliasJSON = alias.reduce((prev, item) => {
        return Object.assign(prev, {
            [item.key]: item.value
        });
    }, {});

    const config = {
        root: Object.assign({}, {
            platform: './platform/'
        }, aliasJSON)
    };
    
    let rawDependencies, dependencies, patchList, functionBody, aliasList;

    return {
        define(...args) {
            args = ParseDefineArgs(args);
            
            rawDependencies = args[1];
            functionBody = args[2].toString();

            aliasList = rawDependencies.map(dependency => {
                const {target} = ParsePlugin(dependency);
                return ParseAlias(config, target);
            });

            dependencies = rawDependencies.map(dependency => {
                const {type, target} = ParsePlugin(dependency);
                return ParseURI(config, {
                    basefile: filename, type, target
                });
            });

            patchList = FilterPatchList(dependencies, aliasList);
        },
        output() {
            return {
                filename,
                dependencies,
                rawDependencies,
                patchList,
                functionBody
            };
        }      
    };
};
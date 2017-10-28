/**
 * update Args
 * @param sourceDeps
 * @param deps
 * @param args
 * @param replaceArgs
 */
function TransformPlaceholderArgs({
    rawDependencies,
    args,
    replaceArgs = {}
}) {
    const dependencies = [...rawDependencies];
    // clone

    const dependenciesArgs = dependencies.map((dependency, i) => {
        const arg = args[i];
        if (dependency && replaceArgs[dependency]) {
            return replaceArgs[dependency];
        }
        return arg;
    });
    return [...dependenciesArgs, ...args.slice(dependenciesArgs.length)];
}

module.exports = TransformPlaceholderArgs;
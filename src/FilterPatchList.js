module.exports = function (deps, aliasList) {
    return deps.reduce((prev, uri, index) => {
        const alias = aliasList[index];
        if (/^\s*platform\s*$/.test(alias)) {
            return [...prev, uri.replace(/\.[^.]*$/g, $1 => `.patch${$1}`)];
        }
        return prev;
    }, []);
};
const comment = {};
comment.lineOpen = function () {
    return /\/\//gm;
};

comment.lineClose = function () {
    return /\n/gm;
};

comment.blockOpen = function () {
    return /\/\*/gm;
};
comment.blockClose = function () {
    return /\*\//gm;
};


function isInComment(headCode) {
    const openBlockComments = headCode.match(comment.blockOpen());
    const closeBlockComments = headCode.match(comment.blockClose());

    if (length(openBlockComments) !== length(closeBlockComments)) {
        return true;
    }

    const openLineComments = headCode.match(comment.lineOpen());
    const closeLineComments = headCode.match(comment.lineClose());

    if (length(openLineComments) > length(closeLineComments)) {
        return true;
    }

    return false;
}

function * regMatchIteratorCreater (reg, text) {
    /* eslint-disable */
    while (true) {
    /* eslint-enable */
        let matched = reg.exec(text);
        if (matched) {
            yield matched;
        } else {
            return;
        }
    }
}

function length(list) {
    return list ? list.length : 0;
}

module.exports = function ({
    raw
}) {
    let reg = /([^A-Za-z0-9]*)((NEJ\.define)|(define))\s*\(/g;

    const iterator = regMatchIteratorCreater(reg, raw);
    
    for (let matched of iterator) {
        const startIndex = matched.index + matched[1].length;
        const headCode = raw.substr(0, startIndex);

        if (!isInComment(headCode)) {
            return {
                headCode,
                content: raw.substr(startIndex),
            };
        }
    }

    throw {code: -1};
};
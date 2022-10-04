module.exports =  (text) => {
    return text.toLowerCase()
        .trim()
        .replace(/[^\w\W ]+/g, '')
        .replace(/ +/g, '-');
}

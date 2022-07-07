module.exports = {
    setSlug: (text) => {
        return text.toLowerCase()
            .trim()
            .replace(/[^\w\W ]+/g, '')
            .replace(/ +/g, '-');
    }
}
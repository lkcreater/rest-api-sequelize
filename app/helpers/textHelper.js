module.exports = {
    setSlug: (text) => {
        return text.toLowerCase()
            .trim()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
}
module.exports =  (text) => {
    return text.replace(/<[^>]*>?/gm, '');
}
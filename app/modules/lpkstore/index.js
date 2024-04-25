const config = require('./config.js');
//const $db = require('./models');

module.exports = (app, option) => {
    const rootPath = option?.rootPath || config.rootPath;
    const pathName = option?.pathName || config.pathName;

    //$db();

    app.moduleSubUrl = (path) => {
        return `/${rootPath}/${pathName}/${path ?? ''}`;
    }

    require('./routes/store.routes')(app);
}
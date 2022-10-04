const db = require("../../models");
const Post = db.post;

module.exports = async (req, res, next) => {
    const data = await Post.queryByPk(req.params.id);
    if(!data){
        return res.status(404).send({
            message: 'Data not found!'
        });
    }

    req.model = data; 
    next();
}
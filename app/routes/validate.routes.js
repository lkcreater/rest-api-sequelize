const { verifySignUp } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/api/validate/username_or_email",[verifySignUp.checkDuplicateUsernameOrEmail], (req, res) => {
        res.send({
            result: true
        });
    });
};

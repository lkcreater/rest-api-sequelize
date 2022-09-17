const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Profile = db.profile;
const userRole = db.userRole;
const Role = db.role;
const Op = db.Op;

//--------------------------------
// -- ACTION REGISTER
//--------------------------------
exports.register = async (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {

        Profile.create({
            user_id: user.id,
            image: req.body.image,
            firstname: req.body.firstname,
            surename: req.body.surename,
            phone: req.body.phone,
            birthday: req.body.birthday,
            sex: req.body.sex,
        }).then(async profile => {

                const assignUserRole = await userRole.assignRole(user.id, req.body.role);
                res.send({ 
                    result: await User.one(user.id)
                });
        })
        .catch(async err => {

            //-- destroy data users
            await User.destroy({where: { id: user.id }});
            await Profile.destroy({where: { user_id: user.id }});
            await userRole.destroy({where: { user_id: user.id }});

            res.status(500).send({ message: 'PROFILE : ' + err.message });
        });
    }).catch(err => {
        res.status(500).send({ message: 'USER : ' + err.message });
    });
}

//--------------------------------
// -- ACTION SIGN-IN
//--------------------------------
exports.signin = (req, res) => {
    User.findOne({
        where: {
        username: req.body.username
        }
    })
    .then( async user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        let token = jwt.sign({ id: user.id }, config.auth.secret, {
            expiresIn: 86400 // 24 hours
        });

        const model = await User.one(user.id);     
        if(model){
            model.token = token;
            res.status(200).send(model);
        }else{
            return res.status(500).send({ message: "User is NULL of database." });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};


exports.test = async (req, res) => {
    res.send({ message: await User.one(req.body.id) });
};

exports.signup = (req, res) => {
    // Save user to database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                res.send({ message: "User was registered successfully!" });
                });
            });
            } else {
            // User role 1
            user.setRoles([1]).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};


    
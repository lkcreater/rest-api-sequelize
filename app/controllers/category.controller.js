const db = require("../models");
const { TextSlugFnc, Respone } = require("../plugins");
const Category = db.category;

//--------------------------------
// -- ACTION CREATE
//--------------------------------
exports.create = (req, res) => {
    const attributes = req.body;
    if(!attributes.slug){
        attributes.slug = TextSlugFnc(attributes.title);
    }else{
        attributes.slug = TextSlugFnc(attributes.slug);
    }

    // insert to database
    Category.create(attributes)
    .then(data => {
        res.send(Respone(data));
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        });
    });
};

//--------------------------------
// -- ACTION UPDATE
//--------------------------------
exports.update = (req, res) => {
    const attributes = req.body;
    if(!attributes.slug){
        attributes.slug = TextSlugFnc(attributes.title);
    }else{
        attributes.slug = TextSlugFnc(attributes.slug);
    }

    // update to database
    const id = req.params.id;
    Category.update(attributes, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            Category.findByPk(id).then((data) => {
                res.send(Respone(data));
            });                    
        } else {
            res.send({
                message: `Cannot update id=${id}. Maybe Item was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating with id=" + id
        });
    });  
     
};

//--------------------------------
// -- ACTION FIND ALL
//--------------------------------
exports.findAll = async (req, res) => {
    try {
        const data = await Category.queryAll(req.query.page, 10, req.query)
        res.send(Respone(data));
    } catch (err) {
        res.send(500).send({
            message: err.message || "Some error accurred while retrieving item."
        });
    }
};

//--------------------------------
// -- ACTION FIND LIST
//--------------------------------
exports.findList = async (req, res) => {
    Category.findAll({
        attributes: ['id', 'title'],
        where: { published: 1 }
    }).then(data => {
        data.push({
            id: 0,
            title: '-- uncategorized --'
        })
        res.send(Respone(data));
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving item with id = ${id}`
        });
    });
};

//--------------------------------
// -- ACTION FIND PK
//--------------------------------
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Category.findByPk(id)
    .then(data => {
        res.send(Respone(data));
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving item with id = ${id}`
        });
    });
};

//--------------------------------
// -- ACTION DELETE
//--------------------------------
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Category.update({ published: 0 }, {
        where: { id: id }
    })
    .then(num => {        
        res.send(Respone({
            delete: true
        }));
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating with id=" + id
        });
    });  
};
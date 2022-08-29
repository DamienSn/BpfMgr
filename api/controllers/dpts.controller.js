const dptsModel = require("../models/dpts.model");
const Controller = require("./Controller");

const getAll = new Controller({
    model: dptsModel.getAll,
    message: 'ok',
    errorBehavior: false
})

module.exports.getAll = (req, res) => {
    getAll.callModel(req, res);
}

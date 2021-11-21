const provinceModel = require("../models/province.model");
const Controller = require("./Controller");

const getAll = new Controller({
    model: provinceModel.getAll,
    message: 'ok',
    errorBehavior: false
})
module.exports.getAll = (req, res) => {
    getAll.callModel(req, res);
}

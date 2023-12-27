const db = require("../../Models/PlanningModel/DpartmntDesigntionModel");


const getalldata = async (req, res) => {
    try {
        const result = await db.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const postdata = async (req, res) => {

    try {
        const data = await db.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(404).json(error.message)
    }
};

const putdata = async (req, res) => {
    try {
        let result = await db.updateMany(
            { _id: req.params.id },
            {
                $set: req.body,
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
};
 
const deletedata = async (req, res) => {
    try {
        let result = await db.deleteMany(
            { _id: req.params.id },
            {
                $set: req.body,
            }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = { getalldata, postdata, putdata, deletedata };

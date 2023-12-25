const db = require("../../Models/PlanningModel/DesignationModel");

const getdata = async (req, res) => {

    try {
        const data = await db.find({ _id: req.params._id })
        res.json(data)
    } catch (error) {
        res.status(404).json(error.message)
    }
}
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
        const data = await db.create({
            title: req.body.title,
            date: Date.now()
        });
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
                $set: {
                    title: req.body.title,
                    date: Date.now()
                },
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

module.exports = { getdata, getalldata, postdata, putdata, deletedata };

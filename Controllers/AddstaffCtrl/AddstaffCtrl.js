const db = require("../../Models/AddstaffModel/AddstaffModel");
const { v4: uuidv4 } = require('uuid');

const getdata = async (req, res) => {
    try {
        data = await db.find({ _id: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const getalldata = async (req, res) => {
    try {
        data = await db.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const postdata = async (req, res) => {

    const uploadimg = req.uploadedImageUrl

    const random = uuidv4().toString().toUpperCase().substr(-10)

    const finddata1 = await db.findOne({ email: req.body.email });
    const finddata2 = await db.findOne({ mobile_no: req.body.mobile_no });

    if (finddata1) {
        res.json({ email: true, message: "Email already exist" })
    } else
        if (finddata2) {
            res.json({ mobile_no: true, message: "mobile number already exist" })
        } else {
            const newUser = await db.create({
                picture: uploadimg,
                user_id: random,
                ...req.body
            });
            res.status(201).json(newUser);
        }
};

const putdata = async (req, res) => {

    try {

        const uploadimg = req.uploadedImageUrl

        let data = await db.updateMany(
            { _id: req.params.id },
            {
                $set: {
                    picture: uploadimg,
                    ...req.body
                }
            })
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const DeleteData = async (req, res) => {
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

module.exports = { getalldata, putdata, getdata, postdata, DeleteData };
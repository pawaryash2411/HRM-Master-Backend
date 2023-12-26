const db = require("../../Models/LeaveModel/LeaveModel");

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

// const postdata = async (req, res) => {
//     try {
//         const data = await db.create(req.body);
//         res.status(201).json(data);
//     } catch (error) {
//         res.status(404).json(error.message)
//     }
// };

const postdata = async (req, res) => {
    try {
        const startDate = new Date(req.body.start_date);
        const endDate = new Date(req.body.end_date); 

        const durationInMilliseconds = endDate.getTime() - startDate.getTime();

        const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));

        const lastModifiedDate = new Date();

        const data = await db.create({
            leave_type: req.body.leave_type,
            subject: req.body.subject,
            start_date: startDate,
            end_date: endDate,
            total_days: durationInDays,
            last_modified_date: lastModifiedDate,
            details: req.body.details,
        });

        res.status(201).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
};



const putdata = async (req, res) => {
    try {
        let result = await db.updateMany(
            { _id: req.params.id },
            {
                $set: {
                    leave_type: req.body.leave_type,
                    subject: req.body.subject,
                    start_date: req.body.start_date,
                    end_date: req.body.end_date,
                    details: req.body.details,
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

module.exports = { getalldata, putdata, getdata, postdata, deletedata };
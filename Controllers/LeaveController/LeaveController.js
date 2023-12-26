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


const postdata = async (req, res) => {
    try {
        const startDate = new Date(req.body.start_date);
        const endDate = new Date(req.body.end_date);

        const durationInMilliseconds = endDate.getTime() - startDate.getTime();

        const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));

        const lastModifiedDate = new Date();

        const data = await db.create({

            start_date: startDate,
            end_date: endDate,
            total_days: durationInDays,
            last_modified_date: lastModifiedDate,
            ...req.body
        });

        res.status(201).json(data);
    } catch (error) {
        res.status(404).json(error.message);
    }
};



// const putdata = async (req, res) => {
//     try {
//         const startDate = new Date(req.body.start_date);
//         const endDate = new Date(req.body.end_date);

//         const durationInMilliseconds = endDate.getTime() - startDate.getTime();

//         const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));

//         const lastModifiedDate = new Date();

//         let result = await db.updateMany(
//             { _id: req.params.id },
//             {
//                 $set: {
//                     start_date: startDate,
//                     end_date: endDate,
//                     total_days: durationInDays,
//                     last_modified_date: lastModifiedDate,
//                     ...req.body
//                 },
//             }
//         );
//         res.status(200).json(result);
//     } catch (error) {
//         res.status(404).json(error.message);
//     }
// };


const putdata = async (req, res) => {
    try {
        const startDate = new Date(req.body.start_date);
        const endDate = new Date(req.body.end_date);

        const durationInMilliseconds = endDate.getTime() - startDate.getTime();

        const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));

        const lastModifiedDate = new Date();

        const latestStartDate = new Date(req.body.latest_date); 
        const updatedStartDate = latestStartDate > startDate ? latestStartDate : startDate;

        let result = await db.updateMany(
            { _id: req.params.id },
            {
                $set: {
                    start_date: updatedStartDate,
                    end_date: endDate,
                    total_days: durationInDays,
                    last_modified_date: lastModifiedDate,
                    ...req.body
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
const db = require("../../Models/User/AdminRoleModel");

const getAllData = async (req, res) => {
    try {
        const AllData = await db.find();
        res.status(200).json({ success: true, AllData });
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const postData = async (req, res) => {
    const { adminRoleName, superadminid } = req.body;
    try {
        const data = await db.create({
            adminRoleName, superadminid
        });

        res.status(201).json({
            success: true,
            message: "Created successfully",
            data,
        });
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const updateData = async (req, res) => {

    const { adminRoleName, superadminid } = req.body;
    try {
        const result = await db.findByIdAndUpdate(req.params.id, {
            adminRoleName, superadminid
        }, { new: true });

        if (!result) {
            return res.status(404).json({ message: "Document not found for updating" });
        }

        res.status(200).json({
            success: true,
            message: "Updated successfully",
        });
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const deleteData = async (req, res) => {
    try {
        const result = await db.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Document not found for deletion" });
        }

        res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getAllData, postData, deleteData, updateData };

const mongoose = require("mongoose");

const ProjectsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        cost: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
        },
        assignedEmployees: [{
            type: String,
            required: true,
        }],
        summary: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("projects", ProjectsSchema);

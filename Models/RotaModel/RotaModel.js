const mongoose = require("mongoose");

const rotaSchema = mongoose.Schema({
    employeename: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    starttime: {
        type: String,
        required: true,
    },
    endtime: {
        type: String,
        required: true,
    },
    employeeid: {
        type: String,
        required: true,
    },
    rota: []
},
    { timestamps: true }
);

module.exports = mongoose.model("rotacollection1", rotaSchema);


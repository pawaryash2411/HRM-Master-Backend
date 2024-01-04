const mongoose = require("mongoose");

const rotaSchema = mongoose.Schema({

    employeeid: {
        type: String,
        required: true,
    },
    rota: []
},
    { timestamps: true }
);

module.exports = mongoose.model("rotacollection1", rotaSchema);


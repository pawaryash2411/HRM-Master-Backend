const express = require("express");
const router = express.Router();
const fs = require("fs");

router.put("/", (req, res) => {
  console.log(req.body);
  fs.writeFile(
    `your_json_file-${req.body.language}.json`,
    JSON.stringify(req.body.data),
    (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
        res.status(500).json({ error: "Failed to update JSON file" });
      } else {
        console.log("JSON file updated successfully");
        res.json({ message: "JSON file updated successfully" });
      }
    }
  );
});

module.exports = router;

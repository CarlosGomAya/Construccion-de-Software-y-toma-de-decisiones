const log = console.log

const multer = require('multer'); // Using Promise API
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("File Destination:", './public/'); // Log the destination path
        callback(null, './public/');
    },
    filename: function (req, file, callback) {
        console.log("Uploaded File:", req.body); // Log received form data
        return callback(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).array('file', 1);

module.exports.upload_file_private = async (req, res) => {
    upload2(req, res, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ code: 500, msg: "Error uploading file" });
        }

        console.log("Upload Successful:", req.files); // Log uploaded files
        res.status(200).json({ code: 200, msg: "Ok" });
    });
}
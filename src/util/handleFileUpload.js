const { uuid } = require("uuidv4");
const handleFileUpload = (files) => files.map((fileUrl) => ({ id: uuid(), url: fileUrl }))
module.exports = handleFileUpload
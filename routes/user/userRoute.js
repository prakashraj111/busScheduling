const { createBusPost, deletePost, updateBusPost } = require("../../controller/user/busController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { multer, storage } = require('../../middleware/multerConfig');
// create upload instance using your storage
const upload = multer({ storage: storage });

const router = require("express").Router()

// routes here 
router.route("/bus").post(isAuthenticated, upload.single('image'),createBusPost)
router.route('/bus/:id').delete(isAuthenticated, deletePost).patch(isAuthenticated,upload.single('image'), updateBusPost)

module.exports = router 
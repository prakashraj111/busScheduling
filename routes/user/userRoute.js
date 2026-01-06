const { createBusPost, deletePost, updateBusPost, getAllPosts, getOnePost } = require("../../controller/user/busController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const { multer, storage } = require('../../middleware/multerConfig');
// create upload instance using your storage
const upload = multer({ storage: storage });

const router = require("express").Router()

// routes here 
router.route("/bus").get(getAllPosts).post(isAuthenticated, upload.single('image'),createBusPost)
router.route('/bus/:id').get(getOnePost).delete(isAuthenticated, deletePost).patch(isAuthenticated,upload.single('image'), updateBusPost)

module.exports = router 
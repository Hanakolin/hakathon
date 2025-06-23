const { homepage, createform, createBlog, singleBlog, deleteBlog, editform, updateBlog } = require("../controller/blogController")

const router = require("express").Router()
const { multer, storage } = require('../middleware/multerConfig')
const upload = multer({ storage: storage })

router.get('/', homepage)
router.get('/blog/:id', singleBlog)
router.get('/delete/:id', deleteBlog)
router.route('/create')
    .get(createform)
    .post(upload.single('image'), createBlog)
    router.get('/edit/:id', editform)
router.post('/edit/:id', upload.single('image'), updateBlog)

module.exports = router
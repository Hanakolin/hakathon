const { homepage, createform, createBlog, singleBlog, deleteBlog, editform, updateBlog } = require("../controller/blogController")
const router = require("express").Router()
const { multer, storage } = require('../middleware/multerConfig')
const upload = multer({ storage: storage })
const isAuthenticated = require('../middleware/auth')

router.get('/', homepage)
router.get('/blog/:id', singleBlog)
router.get('/delete/:id', deleteBlog)
router.route('/create')
    .get(createform)
    .post(upload.single('image'), createBlog)
router.get('/edit/:id', editform)
router.post('/edit/:id', upload.single('image'), updateBlog)
router.post('/create', upload.single('image'), (req, res) => {
    // Save the blog post to your database or array here
    // Example:
    // const { title, subtitle, description } = req.body;
    // const image = req.file ? req.file.path : '';
    // blogs.push({ title, subtitle, description, image });

    // After saving, redirect to /aauthorized
    res.redirect('/aauthorized');
});

module.exports = router
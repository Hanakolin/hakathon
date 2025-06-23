const { registerform, registeruse, loginform, loginuse } = require("../controller/blogController")

const router = require("express").Router()

router.route('/register')
    .get(registerform)
    .post(registeruse)
router.route('/login')
    .get(loginform)
    .post(loginuse)

module.exports = router
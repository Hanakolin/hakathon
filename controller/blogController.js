const { blogs, users, } = require('../model/index')
const bcrypot = require('bcrypt')
const fs = require('fs');
const path = require('path');

exports.editform = async (req, res) => {
    const blog = await blogs.findByPk(req.params.id)
    if (!blog) return res.status(404).send('Blog not found')
    res.render('editBlog', { blog })
}

exports.updateBlog = async (req, res) => {
    const blog = await blogs.findByPk(req.params.id);
    if (!blog) return res.status(404).send('Blog not found');

    blog.title = req.body.title;
    blog.subtitle = req.body.subtitle;
    blog.description = req.body.description;

    // If a new image is uploaded, replace the old one
    if (req.file) {
        // Optionally delete the old image file
        if (blog.image) {
            const oldImagePath = path.join(__dirname, '..', 'storage', blog.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
        blog.image = req.file.filename; // Save new filename
    }

    await blog.save();
    res.redirect('/blog/' + blog.id);
}

exports.homepage = async (req, res) => {
    const datas = await blogs.findAll()
    res.render('home', { blogs: datas, session: req.session }) // <-- add session here
}
exports.singleBlog =async(req, res) => {
    const id =req.params.id
    const blog = await blogs.findByPk(id)
    res.render('singleBlog.ejs',{blog: blog})
}
 exports.deleteBlog =async(req, res) => {
         const id = req.params.id
        await blogs.destroy({
             where: {
                 id: id
             }
         })
         res.redirect('/aauthorized')
     }
exports.createform = (req, res) => {
    res.render('creat.ejs')
}
exports.registerform =(req, res) => {
    res.render('register.ejs')
}
 exports.loginform =(req, res) => {
    res.render('login.ejs')
}
exports.createBlog = async (req, res) => {
    const { title, subtitle, description } = req.body;
    const image = req.file ? req.file.filename : null;
    await blogs.create({ title, subtitle, description, image });
    res.redirect('/aauthorized');
}
 exports.registeruse =async (req, res) =>{
  const { username, email, password } = req.body
 await users.create({
  username: username,
     email: email,
     password: bcrypot.hashSync(password, 10) // 10 is the salt rounds
  })
  res.redirect('/login')
 }

 exports.loginuse = async (req, res) => {
    const { email, password } = req.body
    const user = await users.findAll({ where: { email: email } })
    if (user.length == 0) {
        res.send('user not found')
    } else {
        const isMatched = bcrypot.compareSync(password, user[0].password)
        if (isMatched) {
            req.session.userId = user[0].id // set session
            res.redirect('/aauthorized') // redirect instead of render
        } else {
            res.send('password not matched')
        }
    }
 }

exports.showAuthorized = async(req, res) => {
    const blogList = await blogs.findAll({});
    console.log('fetched blogs:', blogList);
    res.render('aauthorized', { blogs: blogList });
};
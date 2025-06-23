const { blogs } = require('../model/index')

exports.editform = async (req, res) => {
    const blog = await blogs.findByPk(req.params.id)
    if (!blog) return res.status(404).send('Blog not found')
    res.render('editBlog', { blog })
}

exports.updateBlog = async (req, res) => {
    const blog = await blogs.findByPk(req.params.id)
    if (!blog) return res.status(404).send('Blog not found')
    blog.title = req.body.title
    blog.subtitle = req.body.subtitle
    blog.description = req.body.description
    if (req.file) blog.image = req.file.path
    await blog.save()
    res.redirect('/blog/' + blog.id)
}

exports.homepage =async (req, res) =>{
       const datas = await blogs.findAll()
       res.render('home',{blogs :datas}) 
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
         res.redirect('/')
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
exports.createBlog =async (req, res) => {
    const filename =req.file.filename
    const { title, subtitle, description } = req.body
    await blogs.create({ title, subtitle, description,  image : filename})
    res.send('blog added successfully')
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
             res.send('login successfully')
         } else {
             res.send('password not matched')
         }
     }
 }
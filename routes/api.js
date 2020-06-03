const express = require('express')
const router = express.Router();
const BlogPost = require('../Models/blogPost')

router.get('/', (req, res) => {
    BlogPost.find({})
        .then((data) => { res.json(data) })
        .catch((err) => { console.log('error', err) })

})

router.post('/save', (req, res) => {
    console.log(req.body)
    const data = req.body
    const newBlogPost = new BlogPost(data)
    newBlogPost.save(err => {
        if (err) {
            res.status(500).json({ msg: "Internal server error" })
        } else {
            res.json({
                msg: "We received your data"
            })
        }
    })
})

router.get('/name', (req, res) => {
    const data = {
        username: "boney",
        age: 19
    }
    res.json(data)
})



module.exports = router
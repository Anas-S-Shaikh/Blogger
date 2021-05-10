const express = require("express");
const Article = require('../models/article') //importing the model
const router = express.Router(); //setting up new router


// rendering form for new article 
router.get('/new', (req, res)=>{
    res.render('newArticle')
})

//saving new article in db
router.post('/new/create',async (req,res)=>{    
    // creating new document for new article
    const article = await new Article({
        category: req.body.category,
        title: req.body.title,
        content: req.body.content,
        description: req.body.description
    })

    //saving new article into db
    article.save().then(()=>{
        // redirecting to main page after adding new article
        res.redirect('/')
    }).catch((e)=>{
        if (e) return console.log(e);
        res.send('cannot add')
    })
})

//read article content

router.get('/:id',  async(req, res)=>{
    let article = await Article.findById(req.params.id);
    res.render('readArticle',{article})
})

//rendering form for editing the article
router.get('/edit/:id', async (req, res)=>{
    let thisArticle = await Article.findById(req.params.id);
    res.render('editArticle',{thisArticle})
})

//updating the changes of article into db
router.put('/edit/:id', async (req, res)=>{
    await Article.findByIdAndUpdate(req.params.id,req.body,(err)=>{
        if (err) return console.log(err);
    });
    // redirecting to main page after updating
    res.redirect('/')
})

//deleting the article
router.delete('/:id', async (req, res)=>{
    await Article.findByIdAndDelete(req.params.id);
    // redirecting to main page after deleting the article
    res.redirect('/')
})

// exporting all routes
module.exports = router

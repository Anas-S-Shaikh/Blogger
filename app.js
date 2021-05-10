const express = require("express");
const articlesRouter = require("./routes/articlesRouter"); //importing router
const Article = require("./models/article"); //importing the model
const mongoose = require("mongoose"); // for mongoDB
const methodOverride = require('method-override'); //for put and delete method in form action


//connecting to db 
mongoose.connect('mongodb://localhost/blogger',{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open', ()=>{
    console.log("database connected!");
})

//express essentials
const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))
app.use('/articles', articlesRouter);

//route to the index page
app.get("/",async (req, res) => {
    const articles = await Article.find().sort({createdAt : 1});
    // console.log(articles.length);
    if (articles.length >0) {
        res.render('index',{articles});
    } else {
        res.render('emptyArticle')
    }
});

app.listen(port, () => {
    console.log(`app is listening on http://127.0.0.1:${port}`);
})
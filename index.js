const express = require('express')
const app = express()
const port = 8080
const path = require("path")
const {v4: uuidv4} = require('uuid');
const methodOverride = require("method-override")


app.use(express.urlencoded({exteded: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, "/public")))

let posts = [
  {
    id: uuidv4(),
    username: "apnaCollege",
    content: "I love coding"
  },
  { 
        id: uuidv4(),
    username: "Hobbies",
    content: "I love book reading",
  },
  { 
        id: uuidv4(),
    username: "Nafish",
    content: "lovely genterman"
  }
]

app.get('/posts', (req, res) => {
  res.render('index.ejs', {posts});
})

app.get("/posts/new", (req, res) =>{
  res.render("new.ejs");
})



app.post("/posts", (req, res)=>{
  let{username, content} = req.body;
  let id  = uuidv4()
  posts.push({id, username, content});
  res.redirect("/posts");
})

// show route
app.get("/posts/:id", (req, res)=>{
  let{id} = req.params;
  let post = posts.find((p)=> id === p.id);
  res.render("show.ejs", {post});
})

// edit route
app.patch("/posts/:id", (req, res)=>{
  let{id} = req.params;
  let newContext = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContext;
  res.redirect("/posts");


})

app.get("/posts/:id/edit" , (req, res) =>{
  let{id} = req.params;
  let post = posts.find((p)=> id === p.id);
  res.render("edit.ejs", {post});
  // res.send("hello edit")
})

// DELETE
app.delete("/posts/:id", (req, res)=>{
  let {id} = req.params;
  posts = posts.filter((p)=> id !== p.id);
  res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

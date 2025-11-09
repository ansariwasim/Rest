const express = require('express')
const app = express()
const port = 8080
const path = require("path")

app.use(express.urlencoded({exteded: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, "/public")))

let posts = [
  {
    username: "apnaCollege",
    content: "I love coding"
  },
  { 
    username: "Hobbies",
    content: "I love book reading",
  },
  { 
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
  console.log(username)
  console.log(content);
  posts.push({username, content});
  res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

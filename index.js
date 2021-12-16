const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid"); //provide unique id in string format
const methodOverride = require("method-override");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let blogs = [
  {
    username: "User 1",
    title: "Blog 1",
    date: `${months[new Date().getMonth()]} ${new Date().getDate()}`,
    blog: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
    id: uuid(),
  },
  {
    username: "User 2",
    title: "Blog 2",
    date: `${months[new Date().getMonth()]} ${new Date().getDate()}`,
    blog: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
    id: uuid(),
  },
  {
    username: "User 3",
    title: "Blog 3",
    date: `${months[new Date().getMonth()]} ${new Date().getDate()}`,
    blog: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
    id: uuid(),
  },
  {
    username: "User 4",
    title: "Blog 4",
    date: `${months[new Date().getMonth()]} ${new Date().getDate()}`,
    blog: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
    id: uuid(),
  },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", function (req, res) {
  res.redirect("/blogs");
});

// Get all the Blogs and Display
app.get("/blogs", function (req, res) {
  res.render("home", { blogs });
});

// Display from to create new blog
app.get("/blogs/new", function (req, res) {
  res.render("form");
});

// create a new Blog
app.post("/blogs", function (req, res) {
  let newBlog = {
    ...req.body,
    date: `${months[new Date().getMonth()]} ${new Date().getDate()}`,
    id: uuid(),
  };
  blogs.push(newBlog);
  res.redirect("/blogs");
});

// Display one blog
app.get("/blogs/:id", function (req, res) {
  let { id } = req.params;
  const foundBlog = blogs.find(function (item) {
    return item.id === id; //parseInt if any id is in integer
  });
  console.log(foundBlog);
  if (foundBlog) {
    res.render("show", { item: foundBlog });
  } else {
    res.send("wrong id");
  }
});

// displaying the form with prefilled data to be edited
app.get("/blogs/:id/edit", function (req, res) {
  const { id } = req.params;
  const foundBlog = blogs.find(function (item) {
    return item.id === id;
  });
  if (foundBlog) {
    res.render("edit", { foundBlog });
  } else {
    res.send("wrong id");
  }
});

//update with given id
app.patch("/blogs/:id", function (req, res) {
  const { id } = req.params;
  const updatedTitle = req.body.title;
  const updatedUser = req.body.user;
  const updatedBlog = req.body.blog;
  const foundBlog = blogs.find(function (item) {
    return item.id === id;
  });
  foundBlog.title = updatedTitle;
  foundBlog.username = updatedUser;
  foundBlog.blog = updatedBlog; //changing the reference
  res.redirect("/blogs");
});

//delete and destroy
app.delete("/blogs/:id", function (req, res) {
  let { id } = req.params;
  blogs = blogs.filter(function (item) {
    return item.id !== id;
  });
  res.redirect("/blogs");
});

app.get("*", function (req, res) {
  res.redirect("/blogs");
});

app.listen(3200, function () {
  console.log("Listening on server 3200");
});

require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const cors = require("cors");

const sequelize = require("./util/database");
const {User} = require("./models/user");
const {Post} = require("./models/post");

const { PORT } = process.env;

const { register, login } = require("./controllers/auth");
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("./controllers/posts");

const { isAuthenticated } = require("./middleware/isAuthenticated");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);
app.get("/posts", getAllPosts);
app.get("/userposts/:userId", getCurrentUserPosts);
app.post("/posts", isAuthenticated, addPost);
app.put("/posts/:id", isAuthenticated, editPost);
app.delete("/posts/:id", isAuthenticated, deletePost);

User.hasMany(Post);
Post.belongsTo(User);

sequelize
  // .sync({ force: true }) // Use in development to reset DB.  DROPS TABLES
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
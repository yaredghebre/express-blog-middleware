// Importo librerie
const express = require("express");
const dotenv = require("dotenv");
const homeController = require("./controllers/home");
// Importo i posts.js (da controllers e routers)
const postsController = require("./controllers/posts");
const postsRouter = require("./routers/posts");

dotenv.config();

// Uso variabile per la porta
let port = +process.env.PORT || 3001;

// Definisco istanza di express.js
const app = express();

// Configuro asset statico
app.use(express.static("public"));

// Rotta della home
app.get("/", homeController.postIndex);

// Definisco la rotta dei posts con get
app.get("/posts", postsController.index);

// Definisco la rotta del create
app.get("/posts/create", postsController.create);

app.get("/posts/:slug/download", postsController.downloadImage);

// Definisco la rotta dei posts con use
app.use("/posts", postsRouter);

// Avvio il server
app.listen(port, () => {
  console.log(`Server is running on http:/localhost:${port}`);
});

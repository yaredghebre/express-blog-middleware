const posts = require("../db/db.js");
const path = require("path");
const fs = require("fs");
const { kebabCase } = require("lodash");

// Funzione per rotta INDEX
const index = (req, res) => {
  // uso format per abbreviare la content negotiation
  res.format({
    html: () => {
      // Usando il METODO MAP
      const htmlPosts = [
        "<h1>Feed</h1>",
        "<ul>",

        // spred operator dell'array db.js
        ...posts.map(
          (post) => `<li>
            <h3>${post.title}</h3>
            <img src="/imgs/posts/${post.image}" alt="${post.title}" />
            <ul>
              <li>${post.content}</li>
              <li>
                <ol>${post.tags.map((tag) => `<li>${tag}</li>`).join("")}</ol>
              </li>
            </ul>
          </li>`
        ),
        "</ul>",
      ];

      // send anziche end
      res.type("html").send(htmlPosts.join(""));
    },
  });
};

// Funzione per rotta SHOW
const show = (req, res) => {
  res.format({
    json: () => {
      const post = findOrFail(req, res);

      res.json(post);
    },
  });

  const post = posts.find((post) => post.slug === postslug);
  if (!posts) {
    res.status(404).send("Post inesistente :(");
    return;
  }
};

// Funzione per rotta CREATE
const create = (req, res) => {
  res.format({
    html: () => {
      const htmlPosts = `<h1>Nuovo Post</h1> <a> Crea +</a>`;
      res.send(htmlPosts);
    },
    default: () => {
      res.status(406).send("Richiesta non supportata");
    },
  });
};

// Funzione per lo STORE
const store = (req, res) => {
  // Lettura DB
  const posts = require("../db/posts.json");

  // Recupero degli slug dei posts
  let slugList = posts.map((post) => post.slug);

  // Aggiungo i post al DB
  posts.push({
    ...req.body,
    // title: req.body.name,
    // slug: slugList[slugList.length - 1],
  });

  // Converto into JSON
  const json = JSON.stringify(posts);

  // Scrivo il DB in JSON
  fs.writeFileSync(path.resolve(__dirname, "..", "db", "posts.json"), json);

  res.json(posts[posts.length - 1]);
};

// Funzione per download Immagine
const downloadImage = (req, res) => {
  const post = findOrFail(req, res);
  const imagePath = path.resolve(
    __dirname,
    "..",
    "public",
    "imgs",
    "posts",
    post.image
  );
  res.download(imagePath);
};

// Useful Functions
const findOrFail = (req, res) => {
  const postSlug = req.params.slug;

  const post = posts.find((post) => post.slug == postSlug);

  if (!posts) {
    res.status(404).send(`Post con slug ${postSlug} non trovato :(`);
  }

  return post;
};

module.exports = { index, show, create, downloadImage, store };

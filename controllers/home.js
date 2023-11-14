const express = require("express");
const fs = require("fs");

// Dichiaro path per poi usarlo nel html
const path = require("path");

const postIndex = (req, res) => {
  res.format({
    html: () => {
      let htmlContent = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );
      const bio = "is coding...";
      htmlContent = htmlContent.replace("{{ bio }}", bio);

      res.type("html").send(htmlContent);
    },
  });
};

module.exports = { postIndex };

module.exports = function (req, res, next) {
  res.format({
    json: () => {
      res.status(404).json({
        message: "Non ci siamo...",
      });
    },
    default: () => {
      res.status(404).send("<h1>Non ci siamo...</h1>");
    },
  });
};

const jwt = require("jsonwebtoken");

module.exports = function (user) {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  // sign() richiede 3 argomenti:
  // - payload (dati da salvare all'interno del token)
  // - secretKey (chiave segreta presa dal file .env)
  // - opzioni (oggetto che permette di configurare il token)
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

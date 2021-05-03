let jwt = require("jsonwebtoken");

// Función encargada de validar que el token tenga de role admin
let checkAdmin = (req, res, next) => {
  if (req.decoded.role === "admin") {
    next();
  } else {
    return res.status(403).json({ success: false, msg: "Access forbidden" });
  }
};

let checkUser = (req, res, next) => {
  if (
    req.decoded.role === "user1" ||
    req.decoded.role === "user2" ||
    req.decoded.role === "admin"
  ) {
    next();
  } else {
    return res.status(403).json({ success: false, msg: "Access forbidden" });
  }
};

// Función encargada de realizar la validación del token y que es directamente consumida por server.js
let checkToken = (req, res, next) => {
  // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
  // Los headers son automáticamente convertidos a lowercase
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  // Si existe algún valor para el token, se analiza
  // de lo contrario, un mensaje de error es retornado
  if (token) {
    // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      // Si no pasa la validación, un mensaje de error es retornado
      // de lo contrario, permite a la solicitud continuar
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = {
  checkToken,
  checkAdmin,
  checkUser,
};

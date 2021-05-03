let jwt = require("jsonwebtoken");
let config = require("./config");

const User = require("./models/user");
const bcrypt = require("bcryptjs");

// Clase encargada de la creación del token
class HandlerGenerator {
  static async login(req, res) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if (username && password) {
      // Se extrae el usuario de la base de datos, en caso de no existir ese usuario se notifica
      let user = await User.find({ username }).exec();
      if (user.length == 0) {
        res.status(403).json({
          success: false,
          message: "Incorrect username",
        });
        return;
      }
      user = user[0];
      // Si la contraseña coincide, proceda con la generación del token
      // de lo contrario, un mensaje de error es retornado
      let response = await bcrypt.compare(password, user.password);

      if (response) {
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign(
          { username, role: user.role },
          process.env.SECRET,
          {
            expiresIn: "24h",
          }
        );

        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
        res.json({
          success: true,
          message: "Authentication successful!",
          token: token,
        });
      } else {
        // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
        res.status(403).json({
          success: false,
          message: "Incorrect password",
        });
      }
    } else {
      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.status(400).json({
        success: false,
        message: "Authentication failed! Please check the request",
      });
    }
  }

  static index(req, res) {
    // Retorna una respuesta exitosa con previa validación del token
    res.json({
      success: true,
      message: "Index page",
    });
  }
}

module.exports = HandlerGenerator;

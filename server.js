const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// La clave que el usuario debe introducir para acceder al contenido
const correctPassword = "todossomosmanudos";

// Usamos body-parser para poder leer los datos JSON de las solicitudes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sirve archivos estáticos (como HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Ruta por defecto, sirve el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta para procesar la clave enviada desde el formulario
app.post("/check-password", (req, res) => {
  const password = req.body.password ? req.body.password.trim() : "";  // Obtenemos la clave enviada y eliminamos espacios

  console.log('Clave recibida:', password);  // Verificar qué valor llega

  if (password === correctPassword) {
    // Si la clave es correcta, redirige al cliente a la página del video
    res.status(200).send();  // Respondemos con un 200 OK
  } else {
    // Si la clave es incorrecta, devuelve un error 401
    res.status(401).send();  // Respuesta 401 para acceso no autorizado
  }
});

// Ruta para la página del video, solo se accede si la clave es correcta
app.get("/video", (req, res) => {
  res.sendFile(path.join(__dirname, "videoPage.html"));
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

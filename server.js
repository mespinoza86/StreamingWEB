const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const port = 3000;

// La clave que el usuario debe introducir para acceder al contenido
const correctPassword = "todossomosmanudos";

// Usamos body-parser para poder leer los datos JSON de las solicitudes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(session({
  secret: 'secreto_para_session', // Clave secreta para firmar las cookies de sesión
  resave: false,
  saveUninitialized: true
}));

// Servir archivos estáticos (como HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Ruta por defecto, sirve el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta para procesar la clave enviada desde el formulario
app.post("/check-password", (req, res) => {
  const password = req.body.password ? req.body.password.trim() : "";  // Obtenemos la clave enviada y eliminamos espacios

  console.log('Clave recibida:', password);  // Log para verificar qué valor llega

  if (password === correctPassword) {
    req.session.authenticated = true;  // Guardamos en la sesión si la clave es correcta
    console.log('Contraseña correcta, sesión iniciada.');  // Log de éxito
    res.status(200).send();  // Respondemos con un 200 OK
  } else {
    req.session.authenticated = false;  // Si la clave es incorrecta, invalidamos la sesión
    console.log('Contraseña incorrecta, sesión no iniciada.');  // Log de error
    res.status(401).send();  // Respuesta 401 para acceso no autorizado
  }
});

// Ruta para la página del video, solo se accede si la clave es correcta
app.get("/video", (req, res) => {
  console.log('Verificando sesión en /video'); // Log para verificar acceso a /video

  if (req.session.authenticated) {
    console.log('Acceso permitido a la página de video.');
    res.sendFile(path.join(__dirname, "videoPage.html"));
  } else {
    console.log('Acceso denegado a la página de video. Redirigiendo...');
    res.redirect("/");  // Si no está autenticado, redirige al inicio
  }
});

// Ruta para verificar la sesión antes de cargar el video
app.get("/check-session", (req, res) => {
  if (req.session.authenticated) {
    console.log('Sesión verificada, acceso permitido.');
    res.status(200).send();  // Respondemos con 200 si la sesión es válida
  } else {
    console.log('Sesión no válida, acceso denegado.');
    res.status(401).send();  // Respondemos con 401 si no está autenticado
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

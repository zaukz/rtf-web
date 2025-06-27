// Packages
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
// Determine environment protocol
const useHTTPS = process.env.Production !== "true";
const protocolModule = useHTTPS ? require("https") : require("http");

// Setup
const app = express();
const server = protocolModule.createServer(app);

// Configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.Session_Secret,
    resave: false,
    saveUninitialized: false,
  })
);

// Rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after a minute.",
});
app.use(limiter);

// CORS middleware (excluding /webhook)
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") return next();

  cors({
    origin: process.env.DOMAIN,
    credentials: true,
  })(req, res, next);
});

// Helmet CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://example.com"],
    },
  })
);

//Functions
const { Encrypt, Decrypt } = require("../src/utils/data/encrypt-decrypt");
const { HashText, Verify } = require("../src/utils/data/hash-verify");
// Routes
app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", async (req, res) => {
  res.render(path.join(__dirname, "../view/sample.ejs"), {
    HelloText: "Hello World", //type <%= HelloText %> in html to render it in
  });

  delete require.cache[require.resolve("../view/sample.ejs")];
});

app.post("/api/post", async (req, res) => {
  const { text } = req.body;
  //Console.log Text
  console.log("Text", text);

  //Encrypt Text
  const EncryptedText = await Encrypt(text, process.env.EncryptionKey);
  console.log("Encrypted Text", text);

  //Decrypt Text
  const DecryptText = await Decrypt(EncryptedText, process.env.EncryptionKey);
  console.log("Decrypted Text", DecryptText);

  //Hash Text
  const HashedText = await HashText(text);
  console.log("Hashed Text", HashedText);

  //Verify Hash
  const VerifyText = await Verify(text, HashedText);
  if (VerifyText) {
    console.log("Hash Match");
  }
  res.status(200).send(`Text: ${text}`);
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/", async (req, res) => {
  res.redirect("/send?id=123"); //result domain/send?=id=123 value 123
});

app.get("/send", async (req, res) => {
  const { id } = req.query; //get the value
});

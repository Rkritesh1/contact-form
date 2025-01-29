const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { errors: [] });
});

app.post(
  "/submit",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("message").notEmpty().withMessage("Message cannot be empty"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("index", { errors: errors.array() });
    }
    res.send("Form submitted successfully!");
  }
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

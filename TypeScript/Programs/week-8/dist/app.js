"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware to read cookies
app.use((0, cookie_parser_1.default)());
// Login page
app.get("/", (req, res) => {
    const username = req.cookies.username;
    if (username) {
        res.render("home", { username });
    }
    else {
        res.render("login", { error: null });
    }
});
// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Basic validation
    if (!username || !password) {
        return res.render("login", {
            error: "Username and password are required"
        });
    }
    // Simple login check
    if (username === "pooja" && password === "1234") {
        // Create cookie
        res.cookie("username", username);
        res.redirect("/");
    }
    else {
        res.render("login", {
            error: "Invalid username or password"
        });
    }
});
// Logout
app.get("/logout", (req, res) => {
    // Delete cookie
    res.clearCookie("username");
    res.redirect("/");
});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

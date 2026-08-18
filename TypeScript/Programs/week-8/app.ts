import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// Middleware to read cookies
app.use(cookieParser());


// Login page
app.get("/", (req: Request, res: Response) => {

    const username = req.cookies.username;

    if (username) {
        res.render("home", { username });
    } else {
        res.render("login", { error: null });
    }
});


// Login
app.post("/login", (req: Request, res: Response) => {

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
    } else {

        res.render("login", {
            error: "Invalid username or password"
        });
    }
});


// Logout
app.get("/logout", (req: Request, res: Response) => {

    // Delete cookie
    res.clearCookie("username");

    res.redirect("/");
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
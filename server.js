const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname)));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change as needed
    password: 'ujwala', // Change as needed
    database: 'fleet_management1' // Your database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

app.post('/register', async (req, res) => {
    const { name, username, email, password, role } = req.body;

    // Validate the role to be either 'Fleet Manager' or 'Driver'
    if (!['Fleet Manager', 'Driver'].includes(role)) {
        return res.status(400).send("Invalid role: must be either 'Fleet Manager' or 'Driver'");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, username, email, hashedPassword, role], (error, results) => {
        if (error) {
            return res.status(500).send('Error registering user: ' + error);
        }
        res.send('User registered successfully!');
    });
    
});



// Serve login.html at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve register.html at /register path
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html'));
});

app.get('/check-username', (req, res) => {
    const { username } = req.query;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (error, results) => {
        if (error) {
            return res.status(500).send('Error checking username: ' + error);
        }
        if (results.length > 0) {
            res.json({ available: false });
        } else {
            res.json({ available: true });
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT name, username, role, password FROM users WHERE email = ?'; // Select relevant fields
    db.query(sql, [email], async (error, results) => {
        if (error) {
            console.error("Error fetching user:", error);
            return res.status(500).send('Error fetching user.');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid email or password.');
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('Invalid email or password.');
        }

        // Successful login, send user details
        res.json({
            message: 'Login Successful!',
            name: user.name,
            username: user.username,
            role: user.role
        });
    });
});


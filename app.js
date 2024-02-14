const express = require('express');
const app = express();
const jwtToken = require('./src/jwtToken');
const users = require('./src/users');

app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    users.verifyUser(email, password).then((response) => {
        return res.json({ response });
    });
    
});

// Use authenticateToken as a middleware in the /authenticate route
app.get('/authenticate', jwtToken.authenticateToken, (req, res) => {

    const authenticatedUser = req.user;
    res.json({ message: 'You are authorized to login', data: authenticatedUser });
});

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    users.registerUser(username, email, password).then((response) => { //call async function
        return res.json({ response });
    });
    
});

app.get('/findUser/:email', (req, res) => {
    const email = req.params.email;

    users.findUser(email).then((response) => {
        return res.json({ response });
    });

});

app.listen(port=3000, (err, res) => {
    console.log("listen on port 3000")
});
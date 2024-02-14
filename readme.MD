You can check the explanation in my medium [HERE](https://medium.com/@felixpratama242/login-authentication-with-nodejs-7e56aaa3764a)

# Tech Stack

- MongoDb
- Node.JS
- Express.JS

# Routes

- POST /login: to login and get the user's token
```
    request json: {
        "email": "felixpratama12@gmail.com",
        "password": "filedeck1"
    }
```
- GET /authenticate: to authenticate your jwt token. To use this you need to input the token in bearer authorization
- POST /register: to register your account to database (MongoDB)
```
    request json: {
        "username":"your username",
        "email":"your email",
        "password":"your password"
    }
```
- GET findUser/<email>: change `<email>` with your email address


# How to use

- clone this repository
- install all packeges `npm install`
- run `node app.js`


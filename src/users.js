const { MongoClient, ServerApiVersion } = require("mongodb");
const jwtToken = require('./jwtToken');
// const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require ('bcrypt');

dotenv.config();

//create db connection
function db_connection(){
    const uri = "mongodb://127.0.0.1:27017/";
    const client = new MongoClient(uri,  {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        }
    );

    const dbName = client.db(process.env.DB_NAME);
    const collectionName = dbName.collection(process.env.DB_COLLECTION_NAME);

    return  { collectionName, client }
}


async function registerUser(Username, Email, Password){

    const {collectionName, client} = db_connection()
    const workFactor = 8 // higher work factor means slower but strong hashing
    // hash password
    const hashedPassword = await bcrypt.hash(Password, workFactor);
    const newUser = {
        Username: Username,
        Email: Email,
        Password: hashedPassword
    };

    try {
        await collectionName.insertOne((newUser));
        // console.log(`success created new user`);
        return { message: `success created new user`};
    } catch (err){
        return { message: err}
    } finally {
        await client.close();
    };
};

async function findUser(email){
    const {collectionName, client} = db_connection()
    try {
        data = await collectionName.findOne({Email: email});
        // console.log(`success created new user`);
        // console.log(data);
        return { message: data};
    } catch (err){
        return { message: err}
    } finally {
        await client.close();
    };
};

async function verifyUser(email, password){
    

    const responseFind = await findUser(email)

    if(responseFind.message === null){

        return { message: 'data not found' };
    };

    const dbPassword = responseFind.message.Password;
    
    const passwordMatch = await bcrypt.compare(password, dbPassword);
    if (passwordMatch){
        
        const paylaod = {
            "Email": responseFind.message.Email,
            "Username": responseFind.message.Username
        };
        
        const response = jwtToken.generateAccessToken(paylaod);
        return { token: response };
    };
    return { message: " password is wrong " };
}

module.exports = { registerUser, findUser, verifyUser }
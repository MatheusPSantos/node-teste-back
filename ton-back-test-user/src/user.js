const AWS = require("aws-sdk");
const { v4 } = require("uuid");

const TABLE_NAME = "UserTable";

const createUser = async (event) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    const { username, email, password } = JSON.parse(event.body);
    const hashed_password = hashPassword(password);
    const createdAt = new Date();
    const id = v4();

    const newUser = {
        id,
        username,
        email,
        hashed_password,
        createdAt
    };

    try {
        await dynamo.put({
            TableName: TABLE_NAME,
            Item: newUser
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(newUser)
        };

    } catch (error) {
        console.error("Create user Error: ", error);
        return {
            statusCode: 500,
            body: "CreateUserExeception: Internal Server Error."
        }
    }
};

const listUser = async (event) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    let user;
    try {
        const results = await dynamo.scan({
            TableName: TABLE_NAME
        }).promise(); // preciso fazer a busca por ID específico
        // to do: estudar query no dynamo
        user = results.Items;
    } catch (error) {
        console.error("List User Error: ", error);
    }
};

const hashPassword = (pass) => {
    const { createHash } = require("crypto");
    const hash = createHash("sha512");
    return hash.update(pass).digest("hex");
}

module.exports = { createUser, listUser }
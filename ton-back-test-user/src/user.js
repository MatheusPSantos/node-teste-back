const AWS = require("aws-sdk");
const { v4 } = require("uuid");

const createUser = async (event) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();

    const { username, email, password } = JSON.parse(event.body);

    const createdAt = new Date();
    const id = v4();

    const newUser = {
        id,
        username,
        email,
        password, // precisa fazer a cryto desse password
        createdAt
    };
    try {
        dynamo.put({
            TableName: "User",
            Item: newUser
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(newUser)
        };

    } catch (error) {
        console.error("Create user Error: ", error);
    }
};

const listUser = async (event) => {
    const dynamo = new AWS.DynamoDB.DocumentClient();
    let user;
    try {
        const results = await dynamo.scan({ TableName: "User " }).promise(); // preciso fazer a busca por ID específico
        // to do: estudar query no dynamo
        user = results.Items;
    } catch (error) {
        console.error("List User Error: ", error);
    }
};

module.exports = { createUser, listUser }
const axios = require("axios");

const addCount = async (event) => {
    const apiURL = process.env.COUNT_API + "/hit/teste-back/ton";
    const options = {
        url: apiURL,
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };
    try {
        const { data } = await axios(options);
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error(error);
    }
};

const resumeCount = async (event) => {
    const apiURL = process.env.COUNT_API + "/get/teste-back/ton";
    const options = {
        url: apiURL,
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };

    try {
        const { data } = await axios(options);

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    addCount, resumeCount
}
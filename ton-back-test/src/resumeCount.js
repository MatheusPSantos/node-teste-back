const axios = require("axios");

const resumeCount = async (event) => {
    const apiURL = "https://api.countapi.xyz/get/teste-back/ton";
    const options = {
        url: apiURL,
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };

    try {
        const {data} = await axios(options);

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    handler: resumeCount
}
const neo4j = require("neo4j-driver");
require('dotenv').config()

const URI = process.env.neo4j_URI;
const USER = process.env.neo4j_USER;
const PASSWORD = process.env.neo4j_PASSWORD;


async function createNeo4jSession() {
    try {
        console.log(URI, USER, PASSWORD)
        const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
        console.log(driver)
        const serverInfo = await driver.getServerInfo();
        console.log(`Connected to ${serverInfo.address} as ${serverInfo.version}`);
    } catch (err) {
        console.log(`Connection error\n${err}\nCause: ${err.cause}`)
    }
}


module.exports = {createNeo4jSession}



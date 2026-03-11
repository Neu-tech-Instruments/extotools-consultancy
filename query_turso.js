const { createClient } = require("@libsql/client");
require("dotenv").config();

async function main() {
    const client = createClient({
        url: process.env.DATABASE_URL,
        authToken: process.env.DATABASE_AUTH_TOKEN
    });
    try {
        const result = await client.execute("SELECT * FROM Extension");
        console.log("Turso Extensions:", result.rows);
    } catch (e) {
        console.error(e);
    }
}
main();

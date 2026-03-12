const { createClient } = require("@libsql/client");
require("dotenv").config({ path: ".env.local" });

async function main() {
    console.log("URL:", process.env.DATABASE_URL);
    if (!process.env.DATABASE_URL) { console.error("Missing URL"); return; }
    const client = createClient({
        url: process.env.DATABASE_URL,
        authToken: process.env.DATABASE_AUTH_TOKEN
    });
    try {
        const result = await client.execute("SELECT * FROM Extension");
        console.log("Turso Prod Extensions count:", result.rows.length);
        console.log("Turso Prod Extensions:", result.rows);

        const users = await client.execute("SELECT id, email, detectedExtensions FROM User");
        console.log("Turso Prod Users:", users.rows);
    } catch (e) {
        console.error(e);
    }
}
main();

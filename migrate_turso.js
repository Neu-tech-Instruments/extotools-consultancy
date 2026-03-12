const { createClient } = require("@libsql/client");
require("dotenv").config({ path: "/Users/ricardoneuman/Downloads/ExToTools.com/.env.local" });

async function main() {
    console.log("Connecting to:", process.env.DATABASE_URL);
    const client = createClient({
        url: process.env.DATABASE_URL,
        authToken: process.env.DATABASE_AUTH_TOKEN
    });
    try {
        console.log("Running migration...");
        await client.execute("ALTER TABLE User ADD COLUMN detectedExtensions TEXT DEFAULT ''");
        console.log("Migration successful!");
    } catch (e) {
        if (e.message && e.message.includes("duplicate column name")) {
            console.log("Column already exists, skipping.");
        } else {
            console.error("Migration failed:", e);
        }
    }
}
main();

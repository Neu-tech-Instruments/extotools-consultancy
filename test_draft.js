const { createClient } = require("@libsql/client");
require("dotenv").config({ path: "/Users/ricardoneuman/Downloads/ExToTools.com/.env.local" });

async function main() {
    console.log("Testing Draft Saving via API Logic...");
    
    // We'll simulate what the API does by connecting to the DB and inserting a draft
    // since we can't easily fetch() to a running dev server from here without knowing the port exactly
    // and the dev server is already running in the background.
    
    const dbUrl = "file:/Users/ricardoneuman/Downloads/ExToTools.com/dev.db";
    const client = createClient({ url: dbUrl });

    const draftName = `Draft Extension ${new Date().toLocaleDateString()}`;
    const draftSlug = `draft-${Date.now().toString().slice(-4)}`;
    const newId = `test-draft-${Date.now()}`;

    try {
        console.log(`Inserting test draft: ${draftName} (${draftSlug})`);
        await client.execute({
            sql: `
                INSERT INTO "Extension" 
                (id, name, slug, description, shortDescription, price, chromeWebStoreLink, features, isLive, image)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            args: [
                newId,
                draftName,
                draftSlug,
                "Test draft description",
                "",
                0,
                null,
                "[]",
                0,
                null
            ]
        });

        const result = await client.execute({
            sql: 'SELECT * FROM "Extension" WHERE id = ?',
            args: [newId]
        });

        if (result.rows.length > 0) {
            console.log("✅ SUCCESS: Data found in database!");
            console.log("Row:", result.rows[0]);
        } else {
            console.log("❌ FAILURE: Data not found!");
        }

        // Cleanup
        await client.execute({
            sql: 'DELETE FROM "Extension" WHERE id = ?',
            args: [newId]
        });
        console.log("Cleaned up test data.");

    } catch (error) {
        console.error("Test failed:", error);
    }
}

main();

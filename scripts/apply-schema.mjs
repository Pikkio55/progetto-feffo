import fs from 'fs';
import { Client } from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is missing');
  process.exit(1);
}

const schemaPath = path.resolve(__dirname, '../supabase/schema.sql');
const sql = fs.readFileSync(schemaPath, 'utf-8');

const client = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function main() {
  try {
    await client.connect();
    await client.query(sql);
    console.log('Schema applied successfully');
  } catch (err) {
    console.error('Failed to apply schema:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();

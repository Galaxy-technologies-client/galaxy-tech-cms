const { Client } = require('pg');

const urls = [
  "postgresql://postgres.hnoiauivogwlrupoxztc:Galaxydaikin09876@aws-0-ap-south-1.pooler.supabase.com:5432/postgres",
  "postgresql://postgres.hnoiauivogwlrupoxztc:Galaxydaikin09876@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  "postgresql://postgres.hnoiauivogwlrupoxztc:Galaxydaikin09876@aws-1-ap-south-1.pooler.supabase.com:5432/postgres",
  "postgresql://postgres.hnoiauivogwlrupoxztc:Galaxydaikin09876@aws-1-ap-south-1.pooler.supabase.com:6543/postgres",
  "postgresql://postgres:Galaxydaikin09876@aws-0-ap-south-1.pooler.supabase.com:5432/postgres",
  "postgresql://postgres:Galaxydaikin09876@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
];

async function testUrls() {
  for (const url of urls) {
    console.log("Testing:", url.split('@')[1]);
    const c = new Client(url);
    try {
      await c.connect();
      console.log("SUCCESS:", url);
      await c.end();
      return;
    } catch (e) {
      console.log("FAIL:", e.message);
    }
  }
}
testUrls();

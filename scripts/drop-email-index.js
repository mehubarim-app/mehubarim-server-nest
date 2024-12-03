const { MongoClient } = require('mongodb');

// node scripts/drop-email-index.js
async function dropEmailIndex() {
  const uri = "";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('mehubarim');
    const collection = db.collection('consumers');

    // Drop the email index
    await collection.dropIndex('email_1');
    console.log('Successfully dropped email_1 index');

  } catch (error) {
    if (error.code === 27) {
      console.log('Index email_1 does not exist - this is fine');
    } else {
      console.error('Error:', error);
    }
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

dropEmailIndex();

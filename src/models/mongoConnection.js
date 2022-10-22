const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb+srv://andrews:gOk3bmXQ91Rek3t7@cluster0.aat8d5d.mongodb.net/test';
const DB_NAME = 'usuario';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;

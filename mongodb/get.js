/* jshint esversion:8 */
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost/Training";
const client = new MongoClient(uri, {
  useNewUrlParser: true

});

function save(trainee) {
client.connect(err => {
  console.log('connected');
  // perform actions on the collection object
  async function run() {
    try {
      const database = client.db('Training');
      const collection = database.collection('Trainees');

      // Query for a data that has the title 'Back to the Future'
      const query = {
        email: trainee.email
      };
      const data = await collection.findOne((query,trainee),(error, result)=>{
          if (error) {
            console.log(error);
            return error;
          }
          else {
            console.log(result);
            return data;
          }
      });

      console.log(data);
    } finally {
      await client.close();
    }

  }

run().catch(console.dir);
});

}

module.exports = save;
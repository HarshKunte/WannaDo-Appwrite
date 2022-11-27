const mongoose = require('mongoose');

const connectToDb = () =>{
    console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true })
    .then((conn) => {
        console.log(`Connected DB: ${conn.connection.host}`);
      })
      .catch((err) => {
        console.log(err.message);
        process.exit(1);
      });
}

module.exports = connectToDb
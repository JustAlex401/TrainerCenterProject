const express = require("express");
const bodyParser = require("body-parser");
const config = require('config');
const {db} = require('./server/models/db')
const app = express();
const PORT=config.get('port') || 3000

app.use(bodyParser.json());
require("./server/routes/auth.routes")(app);

db.sequelize.sync({ force: false }).then(() => {
    console.log("work");
  });

  async function start() {
    try{
      app.listen(PORT, () => console.log(`app on port ${PORT} ...`));
    } catch (ex){
      console.log('Server Error', ex.message);
      process.exit(1);
    }
  }

  start();


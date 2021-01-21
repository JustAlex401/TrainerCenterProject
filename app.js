const express = require("express");
const bodyParser = require("body-parser");
const config = require('config');
const {db} = require('./server/models/db')
const app = express();
const PORT=config.get('port') || 5000
const {handleError} = require('./server/middleware/errors/error');
const defWork = require('./server/middleware/DbStart/index');
const routes = require('./server/routes/routes');


app.use(express.json({extended: true}));
app.use(bodyParser.json());
routes(app);


(async () => {
  await db.sequelize.sync({ force: false }).then(() => {
      console.log("work");
    });

    await defWork(db);

})();

app.use((err, req, res, next) => {
  handleError(err, res);
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


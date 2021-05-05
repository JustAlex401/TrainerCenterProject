const express = require("express");
const bodyParser = require("body-parser");
const config = require('config');
const {db} = require('./server/models/db')
const PORT=config.get('port') || 5000
const {handleError} = require('./server/middleware/errors/error');
const defWork = require('./server/middleware/DbStart/index');
const routes = require('./server/routes/routes');
const stripe = require('stripe')(config.get('stripe_secret_key'));


const app = express();

app.use(express.json({extended: true}));
app.use(bodyParser.json());
routes(app);


(async () => {
  await db.sequelize.sync({ force: false }).then(() => {
      console.log("work");
    });

    await defWork(db);

})();

app.post('/payment', async (req, res) => {
  let {amount, id} = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
      payment_method: id,
      confirm: true
    })
    console.log("Payment", payment);
    res.json({
      message: "Payment success",
      success: true
    })
  } catch (err) {
    console.log(err);
    res.json({
      message: "Payment failed",
      success: false
    })
  }
})

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


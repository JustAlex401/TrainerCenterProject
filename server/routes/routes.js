const authRouter = require('./auth.routes');
const routerTrainers = require('./trainers.routes');

const routes = function routes(app){
    app.use('/api/auth', authRouter);
    app.use('/api/trainer', routerTrainers);
}

module.exports=routes;
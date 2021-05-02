const authRouter = require('./auth.routes');
const routerTrainers = require('./trainers.routes');
const userRouter = require('./user.routes');

const routes = function routes(app){
    app.use('/api/auth', authRouter);
    app.use('/api/trainer', routerTrainers);
    app.use('/api/user', userRouter);
}

module.exports=routes;
'use strict';

module.exports = (express, app) => {

  const mainRouter = express.Router();

  mainRouter

    .get('/', (req, res) => {
      res.send({ message: 'hello, world' });
    });

  app.use('/', mainRouter);

};

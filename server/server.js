const express = require('express');
const path = require('path');
const cors = require('cors');
const preferencesController = require('./controllers/preferencesController.js')

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ credentials: true, methods: ['POST', 'GET', 'PATCH'], origin: '*' }));

app.use(express.json());
app.use(express.urlencoded());

app.post('/api/initialsubmit', preferencesController.addPlayer, preferencesController.addPreferences, (req, res) => {
  console.log(req.body)
  return res.status(200).json()
})

app.use(express.static(path.join(__dirname, '../build')));



//error handling for errors in middleware
app.use((err, req, res, next) => {
    console.log('ERR', err);
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());



app.use(express.static(path.join(__dirname, '../build')));

//send static html w client side routing as well
app.get("/*",  (req, res, ) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'), function (err) {
    if (err) {
      console.log(err);
    }
  });
});

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

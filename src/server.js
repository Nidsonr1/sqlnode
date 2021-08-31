const express = require('express');
require('./database/connection');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);

app.listen(3333, () => {console.log('Server is Running!')});
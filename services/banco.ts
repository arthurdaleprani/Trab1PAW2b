const mongoose = require('mongoose');

const mongoDBURL = 'mongodb://localhost:27017/dositio';

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão'));
db.once('open', function () {
  console.log('Conectado ao com sucesso!');
});

module.exports = db;

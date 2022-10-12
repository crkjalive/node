const user = require('./user.controller.js')
const express = require('express');
const app = express();
const port = 3000;

app.get('/', user.list);
app.post('/', user.create);
app.get('/:id', user.get);
app.put('/:id', user.update);
app.patch('/:id', user.update);
app.delete('/:id', user.destroy);

app.get('*', (req, res) => {
  res.status(404).send('Está página GET no existe se maneja con él código 404')
})
app.post('*', (req, res) => {
  res.status(404).send('Está página POST no existe se maneja con él código 404')
})

app.listen(port, () => {
  console.log(`Arrancando la app on port http://localhost:${port}`);
});

import app from './app';

app.listen(process.env.PORT || 8080, () => {
  console.log('Servidor iniciado na porta 8080');
});

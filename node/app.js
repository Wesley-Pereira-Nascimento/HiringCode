const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require("fs");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  var resposta;
  const urlparse = url.parse(req.url, true);
  //receber informacoes do usuario
  const params = queryString.parse(urlparse.search);
  //criar usuario
  if(urlparse.pathname == '/criar-usuario'){
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
  if (err) throw err;
  console.log('Saved!');

      resposta = "Usuario criado com sucesso";

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
});

  
  }
  //selecionar Usuario
  else if(urlparse.pathname == '/selecionar-usuario'){
    fs.readFile('users/' + params.id + '.txt', function(err, data) {
      console.log(data);
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
  
  }

  //remover usuario
  else if(urlparse.pathname == '/remover-usuario'){
    fs.unlink('users/' + params.id + '.txt', function (err) {
      console.log('File deleted!');
      resposta = err ? "Usuario nao encontrado" : "Usuario Deletado";
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  
  }

    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//Importação de bibliotecas
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from  'query-string';
import * as url from 'url';
import { writeFile } from  'fs';

//Definição de porta
const port = 5000;

const server = createServer((request: IncomingMessage, response: ServerResponse)=> {

    const urlparse = url.parse(request.url ? request.url : '', true);
    var resposta;
    //receber informacao do usuario
    const params = parse(urlparse.search ? urlparse.search : '');

    //criar um usuario/atualizar

    if(urlparse.pathname == '/criar-usuario'){
        //salvar as informaçoes
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
            if(err) throw err;
            console.log('Saved');

            resposta = 'Usuario criado/atualizado com sucesso';

            response.statusCode = 200;
            response.setHeader('Contend-Type', 'text/plain');
            response.end(resposta);
        });
    }

});

//Execução

server.listen(port, () => {
    console.log(`Server runnig at ${port}`);
});
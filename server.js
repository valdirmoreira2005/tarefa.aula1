const express = require('express');

const server = express();

var produtos = [
    {id: 1,descricao: 'Comprar pão', finalizado: false},
    {id: 2,descricao: 'Comprar Tanque de guerra', finalizado: true},
    {id: 3,descricao: 'Comprar Arroz', finalizado: true}
];
//midlewares:
server.use(express.json());

server.get('/produto', function(request, response) {
    return response.json(produtos);
})

server.get('/produto/:id', function(request, response) {

    const id = request.params.id;

    const produto = produtos.filter(p => p.id == id);

    return response.json(produto);
})

server.post('/produto', function(request, response) {
    const produto = request.body;
    produtos.push(produto);
    return response.status(201).send();
})

server.delete('/produto/:id', function(request, response){
    const id = request.params.id;
    produtos = produtos.filter(p => p.id != id);
    return response.status(200).send();
})

server.put('/produto/:id', (req, res) => {
    const id = req.params.id;
    const produto = req.body;
    
    produtos.forEach(p => {
        if(p.id == id) {
            p.nome = produto.nome;
            p.preco = produto.preco;
            return;
        }
    })
    return res.send();
})

server.listen(3000);

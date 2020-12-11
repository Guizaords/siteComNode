/**Novo projeto com handlebars. Requer prévia instalação do
 * pacote npm install --save express-handlebars.
 * Handlebars equivale ao jinja do Django. Vc aplica laços e 
 * condições diretamente no Html. Com ele se cria um template Engine
 */
// chama os módulos

const express = require ("express");
const app = express();
const handlebars = require('express-handlebars');
const body = require('body-parser');
const Post = require('./models/Post')
// Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout:'main'}));
    app.set('view engine', 'handlebars');
    app.use('/css', express.static('css'));
    app.use('/js', express.static('js'));
    app.use('/img', express.static('img'));
    app.use('/video', express.static('video'));


    //body Parser
    app.use(body.urlencoded({extended:false}));
    app.use(body.json());

    // Banco de Dados MYSQL no arquivo em separado
    /*const sequelize = new Sequelize('testedb', 'root', 'admin',{
        host: "localhost",
        dialect: 'mysql'});*/
// Rotas
    app.get('/', function(req,res){
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render('home', {posts: posts})
        })  // mudou a documentação
    });
    app.get('/contato', function(req,res){
            res.render('contato')    
    });
    app.get('/sobre', function(req,res){
        res.render('sobre')    
    });  

    app.get('/faleconosco', function(req,res){
        //res.send('Rota de cadastro de posts')
        //renderiza o arquivo handlebars conforme template engine
        res.render('form')
    });
    //para enviar form, usa-se outra rota
    app.post('/add', function(req,res){
        Post.create({
            primeiro_nome: req.body.primeiro_nome,
            ultimo_nome: req.body.ultimo_nome,
            email: req.body.email,
            mensagem: req.body.mensagem

        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Erro na criação da mensagem: "+erro);
        })
    });

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});
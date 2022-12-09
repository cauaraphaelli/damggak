// Carregando Módulos
    const express = require('express');
    const session = require('express-session');
    const bodyParser = require('body-parser');
    const app = express();
    var path = require('path');
    var http=require('http');
    var https=require('https');
    const User = require('./models/Users');
    const port = 3000;
    
// Configurações
    // sessão
        app.use(session({
            name: 'sid',
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 2
            }
        }))
    
    // Body Parser
        const { json } = require("body-parser");       
const { Http2ServerRequest } = require('http2');
        //const { resolveSoa } = require('dns');
        app.use(bodyParser.urlencoded({extended: true}));

    // Express
        app.use(express.json());
        app.use(express.static("./views"));
        app.use('/public', express.static(path.join(__dirname, 'public')));
        app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(async (req, res, next) => {
    const { userId }  = req.session
    const users = await User.findAll();
    if(userId){
        res.locals.user =  users.find(
            user => user.id === userId
            );
    }
    next();
})


// Rotas

const redirectLogin = (req,res,next) => {
    if(!req.session.userId){
        res.render('index')
    }else{
        next();
    }
}

const redirectHome = (req,res,next) => {
    if(req.session.userId){
        res.render('mainpage')
    }else{
        next();
    }
}


app.get('/',redirectHome ,(req, res)=>{
    const { userId } = req.session;
    console.log(req.session)
    console.log('USER ID DA SESSAO '+userId);
    if(userId){
        console.log('session')
        res.render('mainpage')
    }else{
        res.render('index'); 
        console.log('no session found');
    }
})

app.get('/create-account',redirectHome ,(req, res)=>{
    res.render('create-account')
})

app.get('/mainpage', redirectLogin, (req, res) =>{
    res.render('mainpage')
})

app.get('/perfil',redirectLogin, async (req, res) =>{
    const perfil = await User.findOne({ where: { id: req.session.userId}});
    res.render('perfil', {plogin: perfil.logindb, pnome: perfil.namedb});
})

app.get('/index', redirectLogin, (req, res) =>{
    res.redirect('/')
})

app.post('/', async (req, res)=>{
    const user = await User.findOne({ where: { logindb: req.body.login, passworddb: req.body.password}});
    if(user === null){
        return res.render('index')
    } else {
        req.session.userId = user.id;
        req.session.save();
        console.log(user.id)
        console.log(req.session);
        return res.render('mainpage')
    }
})

app.post('/create-account', async (req, res)=>{
    if(req.body.senha !== req.body.senha2){
        return res.render('create-account',{
            message: 'Senhas não combinam'
        })
    }else{
        const pesquisa = await User.findOne({ where: { logindb: req.body.usuario}});

        if(pesquisa === null){
            User.create({
            
            namedb: req.body.nome,
            emaildb: req.body.email,
            logindb: req.body.usuario,
            passworddb: req.body.senha
            }).then(()=>{
                console.log('cadastrou')
                res.render('index');
            })
        }else{
            res.render('create-account');
        }
        
    }

})

app.post('/logout',redirectLogin, (req, res) =>{
    console.log(req.session)
    req.session.destroy(err =>{
        if(err){
            res.render('mainpage')
        }

        res.clearCookie('sid');
        res.render('index');
    })
})


app.listen(port,()=>{
    console.log('ligado')
})

http.createServer(app).listen(80)
https.createServer(options, app).listen(433)
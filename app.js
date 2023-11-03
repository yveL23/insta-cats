const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session"); //Criar a sessão do usuário na aplicação
const FileStore = require("session-file-store")(session); //Salvar as sessões na pasta session
const flash = require("express-flash");

const app = express();

const conn = require('./db/conn');

// importar as tabelas - Models
const User = require('./models/User');

// importar as rotas - router
const authRouters = require('./routes/auth.route');

const hbs = exphbs.create({
  partialsDir: ['views/partials']
})

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(
  session({
    name:"session",
    secret:"SENHA_COM_SUPER_CRIPTOGRAFIA", 
    resave: false, 
    saveUninitialized: false,
    store: new FileStore({
      logFn: function(){},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie:{
      secure:false,
      maxAge:360000, //Um dia
      expires: new Date(Date.now() + 360000), //Forçar expirar em momento
      httpOnly: true
    }
  })
)

app.use(flash())

app.use(express.static("public"));

app.use((request, response, next)=>{
  if(request.session.userId){
    response.locals.session = request.session
  }
  next()
})

//  usar as rotas
// /nomeMiddle/nomeRota
app.use('/', authRouters);

app.get('/', (req, res) => {
  return res.render('home')
})

conn
.sync()
.then(()=>{
  app.listen(3333)
})
.catch((err)=>console.log(err))
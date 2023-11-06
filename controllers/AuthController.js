// 1º PRECISO importar o arquivo de modulo
const User = require('../models/User');

module.exports = class AuthController {
    static login(req, res){
        // render -> diretório do projeto - nomeArquivo
        // redirect -> mandar para uma rota - /
        return res.render('auth/login')
    }
    static register(req, res){
        return res.render('auth/register')
    }
    static async registerPost(req, res){
        const { name, email, password } = req.body;
       
        const user = await User.create({ name, email, password });

        res.redirect('/register');
    }
}
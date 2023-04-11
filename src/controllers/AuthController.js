require('dotenv').config();
const User = require('../models/Usuarios');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;
        const user = await User.findOne({
            where: { login }
        });
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '2h' });
        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }

}

exports.signup = async (req, res) => {
    try {
        const { login, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email já cadastrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            login,
            email,
            password: hashedPassword,
        });
        
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }

}

exports.logout = async (req, res) => {
    try {
        // Remove o token de autenticação da sessão do usuário
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout realizado com sucesso' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao fazer logout' });
    }

}

exports.private = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ mensagem: 'Token JWT ausente.' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ mensagem: 'Token JWT inválido.' });
    }
  };
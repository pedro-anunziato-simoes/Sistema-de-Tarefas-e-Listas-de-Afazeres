import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();
const port = 3001;

// Configurar o EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));
// Middleware para receber dados em JSON (ex: AJAX)
app.use(express.json());
// Middleware para trabalhar com Cookies
app.use(cookieParser());
// Middleware para arquivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));


// Rota principal
app.get('/', async (req: Request, res: Response) => {

  const access_token = req.cookies.access_token;
  const response = await axios.get("http://localhost:3000/task", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  res.render('index', { tasks: response.data });
});

// Rota GET para exibir o formulário de cadastro
app.get('/register', (req, res) => {
  res.render('register');
});

// Rota POST para processar o cadastro
app.post('/register', async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  await axios.post("http://localhost:3000/user", {
    email,
    senha: senha
  });
  res.render('login', { mensagem: 'Cadastrado com Sucesso!',error:'' });



});

// Rota GET para exibir o formulário de login
app.get('/login', (req, res) => {
  res.render('login', { mensagem: '',error:'' });
});

// Rota POST para processar o login
app.post('/login', async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  let verifyUser = await axios.post("http://localhost:3000/user/findUser", {
    email, senha
  });
  if (verifyUser.data == false) {
    res.render('login', { mensagem: '',error:'*Usuario ou senha incorretos' });
  } else {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email, senha
    });

    const { accessToken } = response.data;
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 // 1 dia em milisegundos
    });

    return res.redirect('/');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

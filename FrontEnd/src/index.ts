import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Rota principal
app.get('/home', async (req: Request, res: Response) => {
  const access_token = req.cookies.access_token;
  const response = await axios.get("http://localhost:3000/task", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  res.render('index', { tasks: response.data });
});

// Area de tasks

// Rota para exibir o formulario de cadastro de task
app.get('/tasks/create', (req, res) => {
  res.render('cadastro-tasks');
});

// Rota para processar a criação da task
app.post('/tasks/create', async (req: Request, res: Response) => {
  const access_token = req.cookies.access_token;
  const { titulo, descricao, prioridade, cor, status } = req.body;
  const data = { titulo, descricao, prioridade, cor, status }
  await axios.post("http://localhost:3000/task", data, {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
  })
  res.redirect('/home')
})

// Rota para mover a task de "estado"
app.post('/tasks/move', async (req: Request, res: Response) => {
  const { taskId } = req.body;
  const data = { id: taskId };
  const access_token = req.cookies.access_token;
  await axios.post("http://localhost:3000/task/move", data, {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
  })


  setTimeout(function () {
    res.redirect('/home');
  }, 20);
})

// Rota para deletar/concluir uma task
app.post('/tasks/delete/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const access_token = req.cookies.access_token;
  await axios.delete(`http://localhost:3000/task/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
  })
  res.redirect('/home')
})

// Rota para exibir a tela de alteração de task
app.get('/tasks/edit/:id', async (req: Request, res: Response) => {
  const access_token = req.cookies.access_token;
  const id = req.params.id;
  const response = await axios.get(`http://localhost:3000/task/findId/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  res.render('modificar-tasks', { task: response.data });
  console.log(response)
});

app.post('/tasks/edit/:id', async (req: Request, res: Response) => {
  const access_token = req.cookies.access_token;
  const id = req.params.id;
  const { titulo, descricao, prioridade, cor, status } = req.body
  const data = { titulo, descricao, prioridade, cor, status }
  await axios.put(`http://localhost:3000/task/${id}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
  })
  res.redirect('/home')

  })


//Area de cadastro

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
  res.render('login', { mensagem: 'Cadastrado com Sucesso!', error: '' });
});

//Area de Login

// Rota GET para exibir o formulário de login
app.get('/login', (req, res) => {
  res.render('login', { mensagem: '', error: '' });
});

// Rota POST para processar o login
app.post('/login', async (req: Request, res: Response) => {
  const { email, senha } = req.body;
  let verifyUser = await axios.post("http://localhost:3000/user/findUser", {
    email, senha
  });
  if (verifyUser.data == false) {
    res.render('login', { mensagem: '', error: '*Usuario ou senha incorretos' });
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

    return res.redirect('/home');
  }
});

app.post('/logout', async (req: Request, res: Response) => {
  const accessToken = '';
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 dia em milisegundos
  });
  console.log(req.cookies.access_token)
  res.redirect('/login')
})

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

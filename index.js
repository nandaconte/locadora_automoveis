const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/database');

const app = express();


app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());
app.use(express.static('public'));


app.get('/', function (req, res) {
    res.render('home')
})

//Clientes
app.get('/clientes', function (req, res) {
    res.render('clientes')
});
//Fim Clientes


//Cadastrar Cliente
app.get('/clientes/cadastrar', function (req, res) {
    res.render('cadastrar-clientes')
});
app.post('/clientes/cadastrar', function (req, res) {
    const cpf = req.body.cpf
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const telefone = req.body.telefone;
    const email = req.body.email;

    const query = `INSERT INTO tbl_clientes (??,??,??,??,??) VALUES (?,?,?,?,?)`

    const data = ['cpf', 'nome', 'endereco', 'telefone', 'email', cpf, nome, endereco, telefone, email]

    pool.query(query, data, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/clientes')
    })
});
//Fim Cadastrar Cliente

//Lista de Clientes
app.get('/clientes/lista', function (req, res) {
    const query = `SELECT * FROM tbl_clientes`
  
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const tbl_clientes = data
  
      console.log(data)
  
      res.render('lista-clientes', { tbl_clientes })
    })
  });
  
// Fim Lista de Clientes

//Veiculos
app.get('/veiculos', function (req, res) {
    res.render('veiculos')
});


// Cadastrar Veículo
app.get('/veiculos/cadastrar', function (req, res) {
    res.render('cadastrar-veiculos')
});
app.post('/veiculos/cadastrar', function (req, res) {
    const placa = req.body.placa
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const ano = req.body.ano;
    

    const query = `INSERT INTO tbl_veiculos (??,??,??,??) VALUES (?,?,?,?)`

    const data = ['placa', 'marca', 'modelo', 'ano', placa, marca, modelo, ano]

    pool.query(query, data, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/veiculos')
    })
});
//Fim Cadastro veiculo


// Lista de Veiculos
app.get('/veiculos/lista', function (req, res) {
    const query = `SELECT * FROM tbl_veiculos`
  
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const tbl_veiculos = data
  
      console.log(data)
  
      res.render('lista-veiculos', { tbl_veiculos })
    })
  });
  //Fim Lista de Veiculos



// Reservas
  app.get('/reservas', function (req, res) {
    res.render('reservas')
});
//Fim Reservas



//Cadastrar Reservas
app.get('/reservas/cadastrar', function (req, res) {
    res.render('cadastrar-reserva')
});
app.post('/reservas/cadastrar', function (req, res) {
    const cpf = req.body.cpf
    const placa = req.body.placa;
    const dataInicio = req.body.dataInicio;
    const dataFim = req.body.dataFim;
    

    const query = `INSERT INTO tbl_reservas (??,??,??,??) VALUES (?,?,?,?)`

    const data = ['cpf', 'placa', 'dataInicio', 'dataFim', cpf, placa, dataInicio, dataFim]

    pool.query(query, data, function (err) {
        if (err) {
            console.log(err)
        }
        res.redirect('/reservas')
    })
});
//fim cadastrar reserva




//Lista Reserva
app.get('/reservas/lista', function (req, res) {
    const query = `SELECT * FROM tbl_reservas`
  
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const tbl_reservas = data
  
      console.log(data)
  
      res.render('lista-reservas', {tbl_reservas})
    })
  });
  //FIM LISTA RESERVA





   



// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http:///localhost:${PORT}`)
}); 
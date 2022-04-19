const mysql = require("mysql2");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;
const banco = "senai";
const table = "alunos_info";

const Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: banco,
});

function select() {
  return `SELECT * FROM ${table}`;
}

function input(dado) {
  return `INSERT INTO ${table} (${colunas[0]},${colunas[1]},${colunas[2]},${colunas[3]}) VALUES ("${dado[colunas[0]]}","${dado[colunas[1]]}","${dado[colunas[2]]}",${dado[colunas[3]]})`
}

function update(coluna, up, index) {
  return `UPDATE ${table} SET ${coluna}="${up}" WHERE id = ${index}`
}

function delet(index) {
  return `DELETE FROM ${table} WHERE ID = ${index}`
}

//Retorna todos os alunos
app.get("/", function (req, res) {
  Connection.query(select(), function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

//Retorna ID do aluno especificado
app.get('/:id', function (req, res) {
  let index = req.params.id
  Connection.query(select(), function (err, result) {
    if (err) throw err
    res.status(200).json(result[(index - 1)])
  })
})

//Insere um aluno -!
app.post('/', function (req, res) {
  Connection.query(input(req.body), function (err, result) {
    if (err) throw err
    res.status(200).send("Novo dado adicionado")
  })
})

//Altera um aluno -!
app.put('/:id', function (req, res) {
  let index = req.params.id
  let up = req.body
  for (var prop in up) {
    Connection.query(att(prop, up[prop], index), function (err, result) {
      if (err) throw err
    })
  }
  res.status(200).send("Aluno atualizado")
})

//Deleta um aluno -!
app.delete('/:id', function (req, res) {
  let index = req.params.id
  Connection.query(del(index), function (err, result) {
    if (err) throw err
    res.status(200).send("Deletado")
  })
})

app.listen(port, () => {
  console.log("Servidor funcionando");
});
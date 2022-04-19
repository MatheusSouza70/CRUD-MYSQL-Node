const mysql = require('mysql2')


const Connection = mysql.createConnection({
    host:'localhost',
    user:'root',
})

let sql = 'CREATE DATABASE senai'
Connection.query(sql, function(err, result){
    if (err) throw err
    console.log('Conectado')
})
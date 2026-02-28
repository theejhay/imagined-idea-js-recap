import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'taiwo0277',
    database: 'imaginedidea_express'
});

connection.connect((error) => {
    if(error){
        console.log("Database Connection Failed!")
    }
    console.log("We are connected to the Database bruh!")
})

export default connection.promise();
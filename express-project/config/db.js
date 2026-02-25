import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'taiwo0277',
    database: 'imaginedidea_express'
});

connection.connect((error) => {
    if(error){
        console.log("DAtabase Connection Failed!")
    }
    console.log("We are connect to the Database bruh!")
})

export default connection.promise();
var oracledb = require('oracledb'); // npm install oracledb
    oracledb.getConnection({
        user: "ECLBDIT219", 
        password: "Jupiter14azul",
        connectString: "bdengcomp_high"
    },
    function(err, connection) {
        if (err) {
            console.error(err.message);
        return;
}
//"select * from employee"
connection.execute("insert into employee values(9,'Guilherme','dev',2)",[],function(err, result) {
    if (err) {
        console.error(err.message);
    doRelease(connection);
    return;
    }
    //result.metadata
    console.log(result.rows);
    });

    connection.commit();
});

function doRelease(connection) {
    connection.release(function(err) {
        if (err) {
            console.error(err.message);}
        }
    );
}
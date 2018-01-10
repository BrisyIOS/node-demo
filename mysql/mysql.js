/**
 * Created by Brisy on 2017/6/5.
 */

var mysql = require('mysql');

function mysqltool() {

}


const config = {
    host     : '',
    port     : 3306,
    user     : '',
    password : '',
    charset  : '',
    database : ''
}



const pool = mysql.createPool(config);


mysqltool.prototype = {

    pool: pool,

    query: function (sql, callback) {
        this.getConnection(function (err, connection) {
            if (err) callback(err, null);
            connection.query(sql, function () {
                callback.apply(connection, arguments);
                // 释放连接池
                connection.release();
            });
        });
    }.bind(pool),

    queryParam: function (sql, params, callback) {
        this.getConnection(function (err, connection) {
            if (err) callback(err, null);
            connection.query(sql, params, function () {
                callback.apply(connection, arguments);
                // 释放连接池
                connection.release();
            });
        });
    }.bind(pool)
}




mysqltool.prototype.constructor = mysqltool;
module.exports = new mysqltool();
// 数据库链接池
let mysql = require("mysql")
let config = require("../config")
let pool = mysql.createPool(config.mysqlConfig)
/**
 * @description 数据库操作封装
 * @param {string} sql  数据库查询语句
 * @param {Array} data  查询数据库的数据
 */
let query = function(sql,data){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(!err){
                connection.query(sql,data,function(error,result){
                    if(!error){
                        resolve(result)
                    }else{
						console.log("数据库操作错误")
                        reject(error)
                    }
                    connection.release()
                })
            }else{
				console.log("请检查是否打开数据库或者数据库配置是否正确")
			}
        })
    })
}

module.exports = query
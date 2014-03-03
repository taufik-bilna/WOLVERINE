var Model = require("./Base"),
    crypto = require("crypto"),
    model = new Model();

var ProductsModel = model.extend({
    
    getListProductsOnSale: function(storeId, numProducts, callback) {
        var sql = 'SELECT *, IF(CURDATE()>=DATE(news_from_date) && CURDATE()<=DATE(news_to_date), 1, 0 ) AS is_new FROM bilna_featured_product_1 LIMIT '+numProducts+'';
        this.connection.query(sql, function (error, rows, fields) {
            	callback(error, rows);
        });

    },

    getListProductsOnArrival: function(storeId, numProducts, callback) {
        var sql = 'SELECT *, IF(CURDATE()>=DATE(news_from_date) && CURDATE()<=DATE(news_to_date), 1, 0 ) AS is_new FROM bilna_featured_product_2 LIMIT '+numProducts+'';
        this.connection.query(sql, function (error, rows, fields) {
            	callback(error, rows);
        });

    },

    getProducts: function(idBlock, storeId, numProducts, callback){
    	var sql = 'SELECT *, IF(CURDATE()>=DATE(news_from_date) && CURDATE()<=DATE(news_to_date), 1, 0 ) AS is_new FROM bilna_featured_product_'+idBlock+' LIMIT '+numProducts+'';
console.log(sql);        
        this.connection.query(sql, function (error, rows, fields) {
            callback(error, rows);
        });
    },

    getIdBlock: function(blockId, callback){
    	var sql = 'SELECT `main_table`.* FROM `aw_afp_blocks` AS `main_table` where block_id="'+blockId+'" ';
        this.connection.query(sql, function (error, rows, fields) {
            callback(error, rows);
        });
    }

});

module.exports = ProductsModel;
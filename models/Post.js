const db = require('./db'); // './' significa que o arquivo está na mesma pasta

const post = db.sequelize.define('mensagens',{
    primeiro_nome: {
        type: db.Sequelize.STRING
    },
    ultimo_nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    mensagem: {
        type: db.Sequelize.TEXT
    }        
})

//post.sync({force:true})
module.exports = post;
const db = require('../utils/DataBase');

class UsuarioDAO {
    fazerLogin(email, senha, callback) {
        const query = 'SELECT email, senha, nome, id FROM usuario WHERE email = ?';
        db.query(query, [email], (error, results) => {
            if (error) {
                return callback(error);
            }

            if (results.length < 1) {
                return callback(null,false, 'Email não encontrado!');
            }

            const senhaArmazenada = results[0].senha;
            const nomeArmazenado = results[0].nome;
            const idArmazenado = results[0].id;

            if (senhaArmazenada === senha) {
                return callback(null,true,'Logado com sucesso', {nome: nomeArmazenado, id: idArmazenado});
            } else {
                return callback(null,false, 'Senha errada');
            }
        });
    }

    fazerCadastro(usuario, callback) {
        const { nome, email, senha } = usuario;
        let query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
        const values = [nome, email, senha];

        db.query(query, values, (error) => {
            if (error) {
                return callback(error);
            }

            query = 'INSERT IGNORE INTO carrinho (id) VALUES (LAST_INSERT_ID())';
            db.query(query, (error) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, 'Usuário e Carrinho cadastrados com sucesso');
            });
        });
    }

    removerCadastro(id, callback) {
        const query = 'DELETE FROM usuario WHERE id = ?';

        db.query(query, [id], (error, results) => {
            if (error) {
                return callback(error);
            }

            if (results.affectedRows > 0) {
                return callback(null, 'Usuário removido com sucesso');
            } else {
                return callback(null, 'Usuário não encontrado');
            }
        });
    }
}

module.exports = UsuarioDAO;
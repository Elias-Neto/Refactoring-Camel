const Cliente = require("../models/cliente");

//biblioteca responsável pela criptografia
const bcrypt = require("bcrypt");


const {
  validateString,
  validatePassword,
} = require("../helpers/validations");

module.exports = class ClienteController {
  //Cria um cliente
  static async create(req, res) {
    //recebe os dados da requisição
    const { nome, email, senha, confirmaSenha } = req.body;

    //Realiza as validações

    const validateNomeResult = validateString(nome);
    if (validateNomeResult) {
      return res.status(validateNomeResult.status).json(validateNomeResult);
    }



    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    const validatePasswordResult = validatePassword(senha);
    if (validatePasswordResult) {
      return res.status(validatePasswordResult.status).json(validatePasswordResult);
    }



    if (senha !== confirmaSenha) {
      res.status(422).json({
        message: "A senha e a confirmação da senha precisam ser iguais.",
      });
      return;
    }

    //verifica se o email já foi usado
    const usuarioExistente = await Cliente.findOne({ where: { email: email } });

    if (usuarioExistente) {
      res.status(422).json({
        message: "O email informado já está em uso, favor usar outro email.",
      });
      return;
    }

    //criptografia da senha
    const salt = await bcrypt.genSalt(10);
    const senhaCripto = await bcrypt.hash(senha.toString(), salt);

    //cria o cliente
    const cliente = new Cliente({
      nome,
      email,
      senha: senhaCripto,
    });

    try {
      await cliente.save();
      res.status(201).json({ message: "Usuário criado com sucesso!", cliente });
    } catch (error) {
      res
        .status(500)
        .json({ message: `falha na criação do cliente. ${error}` });
    }
  }

  static async getCliente(req, res) {
    const id = req.params.id;

    const cliente = await Cliente.findByPk(id, {
      attributes: { exclude: ["senha"] },
    });

    if (!cliente) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json({ cliente });
  }

  static async updateEmail(req, res) {
    const { id, email } = req.body;

    if (!id) {
      res.status(422).json({ message: "O usuário é obrigatório" });
      return;
    }

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      res.status(422).json({ message: "Informe usuário válido" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    //verifica se o email foi alterado
    if (email !== cliente.email) {
      //verifica se o novo email já foi usado
      const usuarioExistente = await Cliente.findOne({
        where: { email: email },
      });

      if (usuarioExistente) {
        res.status(422).json({
          message: "O email informado já está em uso, favor usar outro email.",
        });
        return;
      }
    } else {
      res.status(422).json({
        message: "Email inalterado.",
      });
      return;
    }

    //atualiza o email
    try {
      await Cliente.update({ email: email }, { where: { id: id } });
      res.status(201).json({ message: "Email atualizado com sucesso!" });
    } catch (error) {
      console.log(`Falha na atualização: ${error}`);
    }
  }

  static async updateSenha(req, res) {
    const { id, senhaAntiga, novaSenha, confirmaNovaSenha } = req.body;

    const cliente = await Cliente.findByPk(id);

    //validações

    //verifica se o usuário existe no BD

    if (!cliente) {
      res.status(422).json({ message: "Informe um usuário válido." });
      return;

    }
    const verificaSenha = await bcrypt.compare(senhaAntiga, cliente.senha);

    if (!verificaSenha) {
      res.status(422).json({ message: "Senha incorreta!" });
      return;
    }

    if (!novaSenha) {
      res.status(422).json({ message: "A nova senha é obrigatória." });
      return;
    }

    if (novaSenha !== confirmaNovaSenha) {
      res.status(422).json({
        message: "A senha e a confirmação da senhas devem ser iguais.",
      });
      return;
    }

    //criptografia da senha
    const salt = await bcrypt.genSalt(10);
    const senhaCripto = await bcrypt.hash(novaSenha.toString(), salt);

    //atualiza a senha
    try {
      await Cliente.update({ senha: senhaCripto }, { where: { id: id } });
      res.status(201).json({ message: "Senha atualizado com sucesso!" });
    } catch (error) {
      console.log(`Falha na atualização da senha: ${error}`);
    }
  }

  static async updateCPF(req, res) {
    const { id, cpf } = req.body;

    //validações
    //verifica se o usuário existe no BD
    if (!id) {
      res.status(422).json({ message: "O usuário é obrigatório" });
      return;
    }

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      res.status(422).json({ message: "Informe um usuário válido." });
      return;
    }

    //Teste se o cpf esta associado a outro usuário
    const clienteComCPF = await Cliente.findOne({ where: { cpf: cpf } });
    if (clienteComCPF) {
      res.status(422).json({ message: "CPF em uso." });
      return;

    }

    if (!cpf) {
      res.status(422).json({ message: "O cpf deve ser informado" });
      return;
    }

    //verifica se apenas de números informados
    if (!/^[0-9]+$/.test(cpf)) {
      res.status(422).json({ message: "Informe apenas os números do CPF." });
      return;
    }

    //verifica a quantidade de dígitos

    if (cpf.toString().length !== 11) {
      res.status(422).json({ message: "CPF incorreto." });
      return;
    }

    //verifica a quantidade de dígitos

    if (cpf.toString().length !== 11) {
      res.status(422).json({ message: "CPF incorreto." });
      return
    }

    try {
      await Cliente.update({ cpf: cpf }, { where: { id: id } });
      res.status(201).json({ message: "CPF atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Falha na atualização do cpf" });
      console.log(`Falha na atualização: ${error}`);
    }
  }

  static async updateTelefone(req, res) {
    const { id, telefone } = req.body;

    //validações
    //verifica se o usuário existe no BD
    if (!id) {
      res.status(422).json({ message: "O usuário é obrigatório" });
      return;
    }

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      res.status(422).json({ message: "Informe um usuário válido." });
      return;
    }

    if (!telefone) {
      res.status(422).json({ message: "O telefone deve ser informado" });
      return;
    }

    //verifica se apenas de números informados
    if (!/^[0-9]+$/.test(telefone)) {
      res
        .status(422)
        .json({ message: "Informe apenas os números do Telefone." });
      return;
    }

    //verifica a quantidade de dígitos
    if (
      !(telefone.toString().length === 11 || telefone.toString().length === 10)
    ) {
      res.status(422).json({ message: "Informe o telefone com o DDD" });
      return;
    }

    try {
      await Cliente.update({ telefone: telefone }, { where: { id: id } });
      res.status(201).json({ message: "Telefone atualizado com sucesso!" });
    } catch (error) {

      console.log(`Falha na atualização: ${error}`);
    }
  }

  static async deleteCliente(req, res) {
    const id = req.params.id;
    const senha = req.body.senha;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    const verificaSenha = await bcrypt.compare(senha, cliente.senha);

    if (!verificaSenha) {
      res.status(422).json({ message: "Senha incorreta!" });
      return;
    }

    try {
      cliente.destroy();
      res.status(200).json({ message: "Apagado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Falha na exclusão!" });
      return;
    }
  }
};

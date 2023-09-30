const Cliente = require("../models/cliente");
const Endereco = require("../models/endereco");

const {
  validateIdCliente,
  validateCep,
  validateRua,
  validateBairro,
  validateNumero,
  validateCidade,
  validateEstado
} = require("../helpers/validations");

module.exports = class EnderecoController {
  //Cria um endereço
  static async create(req, res) {
    //recebe dados da requisição
    const { cep, rua, bairro, numero, complemento, cidade, uf, id_cliente } =
      req.body;


    //validações
    if (!id_cliente) {
      res.status(422).json({ message: "O Usuário é obrigatório!" });
      return;
    }

    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    const enderecoCadastrado = await Endereco.findOne({
      where: { id_cliente: id_cliente },
    });

    if (enderecoCadastrado) {
      res.status(422).json({
        message: "Usuário ja possui endereço cadastrado",
        enderecoCadastrado,
      });
      return;
    }


    const validateCepResult = validateCep(cep);
    if (validateCepResult) {
      return res.status(validateCepResult.status).json(validateCepResult);
    }

    const validateRuaResult = validateRua(rua);
    if (validateRuaResult) {
      return res.status(validateRuaResult.status).json(validateRuaResult);
    }

    const validateBairroResult = validateBairro(bairro);
    if (validateBairroResult) {
      return res.status(validateBairroResult.status).json(validateBairroResult);
    }

    const validateNumeroResult = validateNumero(numero);
    if (validateNumeroResult) {
      return res.status(validateNumeroResult.status).json(validateNumeroResult);
    }

    const validateCidadeResult = validateCidade(cidade);
    if (validateCidadeResult) {
      return res.status(validateCidadeResult.status).json(validateCidadeResult);
    }


    const validateUfResult = validateEstado(uf);
    if (validateUfResult) {
      return res.status(validateUfResult.status).json(validateUfResult);
    }


    const endereco = new Endereco({
      cep,
      rua,
      bairro,
      numero,
      complemento,
      cidade,
      uf: uf.toUpperCase(),
      id_cliente,
    });

    try {
      await endereco.save();
      res
        .status(201)
        .json({ message: "Endereco criado com sucesso!", endereco });

    } catch {
      res.status(500);
    }
  }

  static async getEndereco(req, res) {
    const id_cliente = req.params.id_cliente;

    const endereco = await Endereco.findOne({
      where: { id_cliente: id_cliente },
    });

    if (!endereco) {
      res
        .status(422)
        .json({ message: "O usuário não possui endereço cadastrado!" });
      return;
    }

    res.status(200).json({ endereco });
  }

  static async updateEndereco(req, res) {
    const { cep, rua, bairro, numero, complemento, cidade, uf, id_cliente } =
      req.body;

    //validações
    if (!id_cliente) {
      res.status(422).json({ message: "Informe o ID do cliente!" });
      return;
    }

    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    const enderecoCadastrado = await Endereco.findOne({
      where: { id_cliente: id_cliente },
    });

    if (enderecoCadastrado) {
      res.status(422).json({
        message: "Usuário ja possui endereço cadastrado",
        enderecoCadastrado,
      });
      return;
    }

    if (!cep) {
      res.status(422).json({ message: "O CEP deve ser informado" });
      return;
    }

    //verifica se apenas de números informados
    if (!/^[0-9]+$/.test(cep)) {
      res.status(422).json({ message: "Informe apenas os números do CEP." });
      return;
    }

    //verifica a quantidade de dígitos
    if (cep.toString().length !== 8) {
      res.status(422).json({ message: "CEP incorreto." });
      return;
    }

    if (!rua) {
      res.status(422).json({ message: "A rua deve ser informada" });
      return;
    }

    if (!bairro) {
      res.status(422).json({ message: "O bairro deve ser informado" });
      return;
    }

    if (!numero) {
      res
        .status(422)
        .json({ message: "O número da residência deve ser informado" });
      return;
    }

    //verifica se apenas de números informados
    if (!/^[0-9]+$/.test(numero)) {
      res.status(422).json({ message: "Informe apenas números" });
      return;
    }

    if (!cidade) {
      res.status(422).json({ message: "A cidade deve ser informada" });
      return;
    }

    if (!uf) {
      res.status(422).json({ message: "O estado deve ser informado" });
      return;
    }

    if (uf.length !== 2) {
      res.status(422).json({ message: "Informe apenas a sigla do estado" });
      return;
    }


    const endereco = {

      cep,
      rua,
      bairro,
      numero,
      complemento,
      cidade,
      uf: uf.toUpperCase(),
    };

    try {
      await Endereco.update(endereco, { where: { id_cliente: id_cliente } });
      res.status(200).json({ message: "Endereço atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ message: "Falha na atualização do endereço" });
      console.log(`Falha na atualização: ${error}`);
    }
  }
}

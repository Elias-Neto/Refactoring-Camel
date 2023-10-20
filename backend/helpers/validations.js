const Endereco = require("../models/endereco");
const Subcategoria = require("../models/subcategoria");
// const Cliente = require("../models/cliente");
// const Endereco = require("../models/endereco");

// Validações do módulo de produto

function validateName(name) {
  if (!name) {
    return {
      status: 422,
      message: "O nome é obrigatório.",
    };
  }

  if (typeof name !== "string") {
    return {
      status: 422,
      message: "Informe uma string no campo de Nome.",
    };
  }

  return null;
}

function validatePrice(price) {
  if (!price) {
    return {
      status: 422,
      message: "O preço é obrigatório.",
    };
  }

  if (typeof price !== "number") {
    return {
      status: 422,
      message: "Informe um valor numérico no campo de Preço.",
    };
  }

  return null;
}

function validateDescription(description) {
  if (!description) {
    return {
      status: 422,
      message: "A descrição é obrigatória.",
    };
  }

  if (typeof description !== "string") {
    return {
      status: 422,
      message: "Informe uma string no campo de Descrição.",
    };
  }

  return null;
}

function validateDatasheet(datasheet) {
  if (!datasheet) {
    return {
      status: 422,
      message: "A ficha técnica é obrigatória.",
    };
  }

  if (typeof datasheet !== "string") {
    return {
      status: 422,
      message: "Informe uma string, na ficha técnica.",
    };
  }
  return null;
}

function validateBrand(brand) {
  if (!brand) {
    return {
      status: 422,
      message: "A marca é obrigatória.",
    };
  }

  if (typeof brand !== "string") {
    return {
      status: 422,
      message: "Informe uma string, no campo de Marca.",
    };
  }
  return null;
}

function validateAvailable(available) {
  if (!available) {
    return {
      status: 422,
      message: "A disponibilidade é obrigatória.",
    };
  }

  if (typeof available !== "boolean") {
    return {
      status: 422,
      message: "Informe um booleano, no campo de Disponibilidade.",
    };
  }
  return null;
}

async function validateSubcategory(subcategory) {
  if (!subcategory) {
    return {
      status: 422,
      message: "A subcategoria é obrigatória.",
    };
  }

  if (typeof (subcategory) !== "number") {
    return {
      status: 422,
      message: "Informe um valor numérico no campo de Subcategoria.",
    };
  }

  const hasSubcategory = await Subcategoria.findByPk(subcategory);
  if (!hasSubcategory) {
    return {
      status: 404,
      message: "Informe uma subcategoria válida",
    };
  }

  return null;
}

function validateId(id) {
  if (!id) {
    return {
      status: 422,
      message: "O id é obrigatório.",
    };
  }

  if (typeof id !== "number") {
    return {
      status: 422,
      message: "O id deve ser do tipo number",
    };
  }

  return null;
}

// Validações do módulo de cliente
// Faltando validar os campos email e comfirmaSenha

function validateString(nome) {
  if (!nome) {
    return {
      status: 422,
      message: "O nome é obrigatório",
    };
  }
  if (typeof nome != "string") {
    return {
      status: 422,
      message: "O Campo tem que ser do tipo Texto",
    };
  }
  return null;
}

function validatePassword(senha) {
  if (!senha) {
    return {
      status: 422,
      message: "A senha é obrigatória",
    };
  }
  if (senha.length < 4) {
    return {
      status: 422,
      message: "Senha muito curta",
    };
  }

  if (senha.length > 16) {
    return {
      status: 422,
      message: "Senha muito grande",
    };
  }
  return null;
}


//////////////////////////////////////////////////////////
// Validações do módulo de endereço
//////////////////////////////////////////////////////////
async function validateIdCliente(id_cliente) {
  if (!id_cliente) {
    return {
      status: 422,
      message: "O Usuário é obrigatório.",
    };
  }
  if (typeof (id_cliente) !== 'number') {
    return {
      status: 422,
      message: "Informe o ID do cliente sendo um valor numérico.",
    };
  }
  const enderecoCadastrado = await Endereco.findByPk({
    where: { id_cliente: id_cliente },
  });
  if (!enderecoCadastrado) {
    return {
      status: 422,
      message: "Usuário ja possui endereço cadastrado",
    };
  }
  return null;
}

function validateBairro(bairro) {
  if (!bairro) {
    return {
      status: 422,
      message: "O bairro deve ser informado",
    };
  }
  if (typeof bairro !== "string") {
    return {
      status: 422,
      message: "O Campo bairro tem que ser do tipo String",
    };
  }
  return null;
}

function validateNumero(numero) {
  if (!numero) {
    return {
      status: 422,
      message: "O número deve ser informado.",
    };
  }
  if (typeof numero != "number") {
    return {
      status: 422,
      message: "O Campo número tem que ser do tipo Númerico.",
    };
  }
  //verifica se apenas de números informados
  if (!/^[0-9]+$/.test(numero)) {
    return {
      status: 422,
      message: "Informe apenas números",
    };
  }
  return null;
}

function validateCidade(cidade) {
  if (!cidade) {
    return {
      status: 422,
      message: "A cidade deve ser informada.",
    };
  }
  if (typeof cidade !== "string") {
    return {
      status: 422,
      message: "O Campo cidade tem que ser do tipo String.",
    };
  }
  return null;
}
function validateEstado(uf) {
  if (!uf) {
    return {
      status: 422,
      message: "O estado deve ser informado.",
    };
  }
  if (uf.length !== 2) {
    return {
      status: 422,
      message: "Estado inválido.",
    };
  }
  if (typeof uf !== "string") {
    return {
      status: 422,
      message: "O Campo estado tem que ser do tipo String",
    };
  }
  return null;
}


function validateCep(cep) {
  if (!cep) {
    return {
      status: 422,
      message: "O CEP deve ser informado.",
    };
  }

  //verifica se apenas de números informados
  if (!/^[0-9]+$/.test(cep)) {
    return {
      status: 422,
      message: "Informe um valor numérico no campo de CEP.",
    };
  }

  //verifica a quantidade de dígitos
  if (cep.toString().length !== 8) {
    return {
      status: 422,
      message: "CEP incorreto.",
    };
  }
  return null;
}
function validateRua(rua) {
  if (!rua) {
    return {
      status: 422,
      message: "A rua deve ser informada",
    };
  }
  if (typeof rua !== "string") {
    return {
      status: 422,
      message: "O Campo rua tem que ser do tipo String",
    };
  }
  return null;
}

function validateUf(uf) {
  if (!uf) {
    return {
      status: 422,
      message: "O estado deve ser informado",
    };
  }
  if (uf.length !== 2) {
    return {
      status: 422,
      message: "Informe apenas a sigla do estado",
    };
  }
  return null;
}

module.exports = {
  validateId,
  validateName,
  validatePrice,
  validateDescription,
  validateDatasheet,
  validateBrand,
  validateAvailable,
  validateSubcategory,
  validateString,
  validatePassword,
  validateIdCliente,
  validateCep,
  validateRua,
  validateBairro,
  validateNumero,
  validateCidade,
  validateEstado,
  validateUf
};

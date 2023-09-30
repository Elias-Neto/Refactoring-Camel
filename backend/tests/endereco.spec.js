const ProductTestFunctions = require("./test-functions/product.js");

const formatMessageOutput = (func, parm, expectedStatus) => {
  const result = func(parm);

  if (result === null) {
    return `${expectedStatus === null ? "✅" : "❌"} Validation passed`;
  }

  const { validationStatus, message } = result;

  return `${validationStatus === expectedStatus ? "✅" : "❌"
    } Erro: ${message}`;
};

const {
  validateString,
  validateIdCliente,
  validateCep,
  validateRua,
  validateNumero,
  validateCidade,
  validateEstado,
  validateBairro
} = require("../helpers/validations");



module.exports = class EnderecoTests {
  static create() {
    console.log("\nMódulo de Endereço - Criação");
    console.log("----------------------------");
    console.log("🚩 Validação de Usuário");
    // console.log(
    //   `・ success with valid usuário: ${formatMessageOutput(
    //     validateIdCliente,
    //     "id_cliente",
    //     null
    //   )}`
    // );
    console.log(
      `・ fail with empty usuário: ${formatMessageOutput(
        validateIdCliente,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with null usuário: ${formatMessageOutput(
        validateIdCliente,
        null,
        false
      )}`
    );

    console.log("----------------------------");
    console.log("🚩 Validação de CEP");
    console.log(
      `・ CEP filled with "String": ${formatMessageOutput(
        validateCep,
        "abc",
        false
      )}`
    );
    console.log(
      `・ Failed with minimum number of characters: ${formatMessageOutput(
        validateCep,
        123,
        false
      )}`
    );
    console.log(
      `・ Failure with maximum number of characters: ${formatMessageOutput(
        validateCep,
        123456789,
        false
      )}`
    );

    console.log(
      `・ success with valid CEP:: ${formatMessageOutput(
        validateCep,
        55790000,
        null
      )}`
    );

    console.log(
      `・ fail with empty CEP: ${formatMessageOutput(
        validateCep,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with null CEP: ${formatMessageOutput(
        validateCep,
        null,
        false
      )}`
    );

    console.log("----------------------------");
    console.log("🚩 Validação de Rua");
    console.log(
      `・ success with valid rua: ${formatMessageOutput(
        validateRua,
        "Bom Jesus",
        null
      )}`
    );
    console.log(
      `・ fail with empty rua: ${formatMessageOutput(
        validateRua,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with null rua: ${formatMessageOutput(
        validateRua,
        null,
        false
      )}`
    );
    console.log(
      `・ fail with rua type: ${formatMessageOutput(
        validateRua,
        8569,
        false
      )}`
    );

    console.log("----------------------------");
    console.log("🚩 Validação de Bairro");
    console.log(
      `・ success with valid bairro: ${formatMessageOutput(
        validateBairro,
        "Brasília",
        null
      )}`
    );
    console.log(
      `・ fail with empty bairro: ${formatMessageOutput(
        validateBairro,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with null bairro: ${formatMessageOutput(
        validateBairro,
        null,
        false
      )}`
    );
    console.log(
      `・ fail with bairro type: ${formatMessageOutput(
        validateBairro,
        8569,
        false
      )}`
    );

    console.log("----------------------------");
    console.log("🚩 Validação de Número Residêncial");
    console.log(
      `・ Número preenchido com "String": ${formatMessageOutput(
        validateNumero,
        "abc",
        false
      )}`
    );
    console.log(
      `・ success with valid número: ${formatMessageOutput(
        validateNumero,
        27,
        null
      )}`
    );
    console.log(
      `・ fail with empty número: ${formatMessageOutput(
        validateNumero,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with null número: ${formatMessageOutput(
        validateNumero,
        null,
        false
      )}`
    );
    console.log("----------------------------");
    console.log("🚩 Validação de Cidade");
    console.log(
      `・ success with valid cidade: ${formatMessageOutput(
        validateCidade,
        "Taquaritinga do Norte",
        null
      )}`
    );
    console.log(
      `・ fail with empty cidade: ${formatMessageOutput(
        validateCidade,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with null cidade: ${formatMessageOutput(
        validateCidade,
        null,
        false
      )}`
    );
    console.log(
      `・ fail with cidade type: ${formatMessageOutput(
        validateString,
        8569,
        false
      )}`
    );
    console.log("----------------------------");
    console.log("🚩 Validação de Estado");
    console.log(
      `・ success with valid estado: ${formatMessageOutput(
        validateEstado,
        "PE",
        null
      )}`
    );
    console.log(
      `・ fail with empty estado: ${formatMessageOutput(
        validateEstado,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with null estado: ${formatMessageOutput(
        validateEstado,
        null,
        false
      )}`
    );
    console.log(
      `・ fail with estado type: ${formatMessageOutput(
        validateString,
        8569,
        false
      )}`
    );
  }
};

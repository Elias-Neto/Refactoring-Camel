//Formatar a Saida do Teste
const formatMessageOutput = (func, parm, expectedStatus) => {
  const result = func(parm);

  if (result === null) {
    return `${expectedStatus === null ? "✅" : "❌"} Validation passed      |> Valor Testado: ${parm}`;
  }

  const { validationStatus, message } = result;

  return `${validationStatus === expectedStatus ? "✅" : "❌"
    } Erro: ${message}    |> Valor Testado: ${parm ? parm : "null"}`;
};

const {
  validateName,
  validateString,
  validatePassword
} = require("../helpers/validations")

module.exports = class ClientTests {
  //Função Concentradora de Testes
  static testes() {
    console.log("\nMódulo de Clientes - Criação");
    console.log("----------------------------");
    console.log("🚩 Validação de Nome");
    console.log(
      `・ success with valid name: ${formatMessageOutput(
        validateName,
        "Vitalino",
        null
      )}`
    );
    console.log(
      `・ fail with empty name: ${formatMessageOutput(
        validateName,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with null value: ${formatMessageOutput(
        validateName,
        null,
        false
      )}`
    );
    console.log(
      `・ fail with number type: ${formatMessageOutput(
        validateString,
        8569,
        false
      )}`
    );

    console.log("----------------------------");
    console.log("🚩 Validação de Senha");
    console.log(
      `・ Fail with minimum number of characters: ${formatMessageOutput(
        validatePassword,
        "123",
        false
      )}`
    );
    console.log(
      `・ Failure with maximum number of characters: ${formatMessageOutput(
        validatePassword,
        "12345678910111213",
        false
      )}`
    );
    console.log(
      `・ Success with correct number of characters: ${formatMessageOutput(
        validatePassword,
        "12345678",
        null
      )}`
    );

  }
}
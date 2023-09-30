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
  validateName,
  validatePrice,
  validateDescription,
  validateDatasheet,
  validateBrand,
  validateAvailable,
  validateSubcategory,
} = require("../helpers/validations");

module.exports = class ProductTests {
  static create() {
    console.log("\nMódulo de Produtos - Criação");
    console.log("----------------------------");
    console.log("🚩 Validação de Nome");
    console.log(
      `・ success with valid name: ${formatMessageOutput(
        validateName,
        "Lustre",
        null
      )}`
    );
    console.log(
      `・ fail with empty string: ${formatMessageOutput(
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
      `・ fail with undefined value: ${formatMessageOutput(
        validateName,
        undefined,
        false
      )}`
    );

    console.log("----------------------------");
    console.log("🚩 Validação de Preço");
    console.log(
      `・ success with valid value: ${formatMessageOutput(
        validatePrice,
        156.8,
        null
      )}`
    );
    console.log(
      `・ fail with unexpected value (string): ${formatMessageOutput(
        validatePrice,
        "cento e cinquenta",
        false
      )}`
    );
    console.log(
      `・ fail with unexpected value (boolean): ${formatMessageOutput(
        validatePrice,
        true,
        false
      )}`
    );
    console.log(
      `・ fail with null value: ${formatMessageOutput(
        validatePrice,
        null,
        false
      )}`
    );
    console.log(
      `・ fail with undefined value: ${formatMessageOutput(
        validatePrice,
        undefined,
        false
      )}`
    );

    console.log("----------------------------");
    console.log("🚩 Validação de Descrição");
    console.log(
      `・ success with valid value: ${formatMessageOutput(
        validateDescription,
        "Lustre ...",
        null
      )}`
    );
    console.log(
      `・ fail with empty string: ${formatMessageOutput(
        validateDescription,
        "",
        false
      )}`
    );
    console.log(
      `・ fail with unexpected value: ${formatMessageOutput(
        validateDescription,
        true,
        false
      )}`
    );
    console.log(
      `・ fail with null value: ${formatMessageOutput(
        validateDescription,
        null,
        false
      )}`
    );
    console.log(
      `・ fail with undefined value: ${formatMessageOutput(
        validateDescription,
        undefined,
        false
      )}`
    );
  }
};

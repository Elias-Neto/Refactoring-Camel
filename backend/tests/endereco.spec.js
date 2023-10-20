const Endereco = require("../models/endereco");

const {
  validateIdCliente,
  validateBairro,
  validateNumero,
  validateEstado,
  validateCidade,
  validateCep,
  validateRua
} = require("../helpers/validations");

/* ---------------------------------------- Usuário ---------------------------------------- */
describe('Módulo de Endereço - Criação', () => {
  it('Validação de usuário - success with valid usuário:', async () => {
    const validIdCliente = {
      message: "Endereco criado com sucesso!",
      endereco: {
        id: 23,
        cep: "55034051",
        rua: "Luiz de Freitas",
        bairro: "Centro",
        numero: 9,
        complemento: "Térreo",
        cidade: "Recife",
        uf: "PE",
        id_cliente: 15,
        updatedAt: "2023-10-12T14:08:35.550Z",
        createdAt: "2023-10-12T14:08:35.550Z"
      }
    };

    Endereco.findByPk = jest.fn().mockResolvedValue(validIdCliente);
    const result = await validateIdCliente(15);

    expect(result).toEqual(null);
  });

  it("Validação de Usuário - Non-existent user", async () => {
    Endereco.findByPk = jest.fn().mockResolvedValue(null);

    const result = await validateIdCliente(1);

    expect(result).toEqual({
      status: 422,
      message: "Usuário ja possui endereço cadastrado",
    });
  });

  it("Validação de Usuário - empty field", async () => {
    const result = validateIdCliente();

    const expected = {
      status: 422,
      message: "O Usuário é obrigatório.",
    };

    await expect(result).resolves.toStrictEqual(expected);
  });

  it("Validação de Usuário - null value", async () => {
    const result = validateIdCliente(null);

    const expected = {
      status: 422,
      message: "O Usuário é obrigatório.",
    };

    await expect(result).resolves.toStrictEqual(expected);
  });

  it("Validação de Usuário - undefined value", async () => {
    const result = validateIdCliente(undefined);

    const expected = {
      status: 422,
      message: "O Usuário é obrigatório.",
    };

    await expect(result).resolves.toStrictEqual(expected);
  });

  it("Validação de Usuário - invalid value of string type", async () => {
    const result = validateIdCliente("abc");

    const expected = {
      status: 422,
      message: "Informe o ID do cliente sendo um valor numérico.",
    };

    await expect(result).resolves.toStrictEqual(expected);
  });

  it("Validação de Usuário - invalid value of boolean type", async () => {
    const result = validateIdCliente(true);

    const expected = {
      status: 422,
      message: "Informe o ID do cliente sendo um valor numérico.",
    };

    await expect(result).resolves.toStrictEqual(expected)
  });



  /* ---------------------------------------- CEP ---------------------------------------- */
  it('Validação de CEP - success with valid CEP:', () => {
    const result = validateCep(55790000);

    expect(result).toBe(null);
  });

  it("Validação de CEP - empty field", () => {
    const result = validateCep();

    expect(result).toStrictEqual({
      status: 422,
      message: "O CEP deve ser informado.",
    });
  });

  it("Validação de CEP - null value", () => {
    const result = validateCep(null);

    expect(result).toStrictEqual({
      status: 422,
      message: "O CEP deve ser informado.",
    });
  });

  it("Validação de CEP - undefined value", () => {
    const result = validateCep(undefined);

    expect(result).toStrictEqual({
      status: 422,
      message: "O CEP deve ser informado.",
    });
  });

  it("Validação de CEP - invalid value of string type", () => {
    const result = validateCep("abc");

    expect(result).toStrictEqual({
      status: 422,
      message: "Informe um valor numérico no campo de CEP.",
    });
  });

  it("Validação de CEP - invalid value of boolean type", () => {
    const result = validateCep(true);

    expect(result).toStrictEqual({
      status: 422,
      message: "Informe um valor numérico no campo de CEP.",
    });
  });

  /* ---------------------------------------- Rua ---------------------------------------- */
  it('Validação de Rua - success with valid rua:', () => {
    const result = validateRua("Rua do futuro");

    expect(result).toBe(null);
  });

  it("Validação de Rua - empty field", () => {
    const result = validateRua();

    expect(result).toStrictEqual({
      status: 422,
      message: "A rua deve ser informada",
    });
  });

  it("Validação de Rua - null value", () => {
    const result = validateRua(null);

    expect(result).toStrictEqual({
      status: 422,
      message: "A rua deve ser informada",
    });
  });

  it("Validação de Rua - undefined value", () => {
    const result = validateRua(undefined);

    expect(result).toStrictEqual({
      status: 422,
      message: "A rua deve ser informada",
    });
  });

  it("Validação de Rua - invalid value of number type", () => {
    const result = validateRua(12);

    expect(result).toStrictEqual({
      status: 422,
      message: "O Campo rua tem que ser do tipo String",
    });
  });

  it("Validação de Rua - invalid value of boolean type", () => {
    const result = validateRua(true);

    expect(result).toStrictEqual({
      status: 422,
      message: "O Campo rua tem que ser do tipo String",
    });
  });

  /* ---------------------------------------- Bairro ---------------------------------------- */
  it('Validação de Bairro - success with valid bairro', () => {
    const result = validateBairro("Passado");

    expect(result).toBe(null);
  });

  it("Validação de Bairro - empty field", () => {
    const result = validateBairro();

    expect(result).toStrictEqual({
      status: 422,
      message: "O bairro deve ser informado",
    });
  });

  it("Validação de Bairro - null value", () => {
    const result = validateBairro(null);

    expect(result).toStrictEqual({
      status: 422,
      message: "O bairro deve ser informado",
    });
  });

  it("Validação de Bairro - undefined value", () => {
    const result = validateBairro(undefined);

    expect(result).toStrictEqual({
      status: 422,
      message: "O bairro deve ser informado",
    });
  });

  it("Validação de Bairro - invalid value of number type", () => {
    const result = validateBairro(12);

    expect(result).toStrictEqual({
      status: 422,
      message: "O Campo bairro tem que ser do tipo String",
    });
  });

  it("Validação de Bairro - invalid value of boolean type", () => {
    const result = validateBairro(true);

    expect(result).toStrictEqual({
      status: 422,
      message: "O Campo bairro tem que ser do tipo String",
    });
  });

  /* ---------------------------------------- Número ---------------------------------------- */
  it('Validação de Número - success with valid número', () => {
    const result = validateNumero(123);

    expect(result).toBe(null);
  });

  it("Validação de Número - empty field", () => {
    const result = validateNumero();

    expect(result).toStrictEqual({
      status: 422,
      message: "O número deve ser informado.",
    });
  });

  it("Validação de Número - null value", () => {
    const result = validateNumero(null);

    expect(result).toStrictEqual({
      status: 422,
      message: "O número deve ser informado.",
    });
  });

  it("Validação de Número - undefined value", () => {
    const result = validateNumero(undefined);

    expect(result).toStrictEqual({
      status: 422,
      message: "O número deve ser informado.",
    });
  });

  it("Validação de Número - invalid value of string type", () => {
    const result = validateNumero("abc");

    expect(result).toStrictEqual({
      status: 422,
      message: "O Campo número tem que ser do tipo Númerico.",
    });
  });

  it("Validação de Número - invalid value of boolean type", () => {
    const result = validateNumero(true);

    expect(result).toStrictEqual({
      status: 422,
      message: "O Campo número tem que ser do tipo Númerico.",
    });
  });

  /* ---------------------------------------- Cidade ---------------------------------------- */
  it('Validação de Cidade - success with valid cidade', () => {
    const result = validateCidade("Santa Cruz do Capibaribe");

    expect(result).toBe(null);
  });

  it("Validação de Cidade - empty field", () => {
    const result = validateCidade();

    expect(result).toStrictEqual({
      status: 422,
      message: "A cidade deve ser informada.",
    });
  });

  it("Validação de Cidade - null value", () => {
    const result = validateCidade(null);

    expect(result).toStrictEqual({
      status: 422,
      message: "A cidade deve ser informada.",
    });
  });

  it("Validação de Cidade - undefined value", () => {
    const result = validateCidade(undefined);

    expect(result).toStrictEqual({
      status: 422,
      message: "A cidade deve ser informada.",
    });
  });

  it("Validação de Cidade - invalid value of number type", () => {
    const result = validateCidade(99);

    expect(result).toStrictEqual({
      status: 422,
      message: "O Campo cidade tem que ser do tipo String.",
    });
  });

  it("Validação de Cidade - invalid value of boolean type", () => {
    const result = validateCidade(true);

    expect(result).toStrictEqual({
      status: 422,
      message: "O Campo cidade tem que ser do tipo String.",
    });
  });

  /* ---------------------------------------- Estado ---------------------------------------- */
  it('Validação de Estado - success with valid estado', () => {
    const result = validateCidade("PE");

    expect(result).toBe(null);
  });

  it("Validação de Estado - empty field", () => {
    const result = validateEstado();

    expect(result).toStrictEqual({
      status: 422,
      message: "O estado deve ser informado.",
    });
  });

  it("Validação de Estado - null value", () => {
    const result = validateEstado(null);

    expect(result).toStrictEqual({
      status: 422,
      message: "O estado deve ser informado.",
    });
  });

  it("Validação de Estado - undefined value", () => {
    const result = validateEstado(undefined);

    expect(result).toStrictEqual({
      status: 422,
      message: "O estado deve ser informado.",
    });
  });

  it("Validação de Estado - invalid value of number type", () => {
    const result = validateEstado(99);

    expect(result).toStrictEqual({
      status: 422,
      message: "Estado inválido.",
    });
  });

  it("Validação de Estado - invalid value of boolean type", () => {
    const result = validateEstado(true);

    expect(result).toStrictEqual({
      status: 422,
      message: "Estado inválido.",
    });
  });
})

/* ---------------------------------------- Validações de Atualização ---------------------------------------- */
describe('Módulo de Endereço - Atualização', () => {
  it('Validação de CEP - success with updating CEP:', () => {
    const result = validateCep(55790000)

    expect(result).toBe(null)
  })

  it('Validação de bairro - success with updating bairro', () => {
    const result = validateBairro("Centro")

    expect(result).toBe(null)
  })

  it('Validação de número - success with updating número', () => {
    const result = validateNumero(12)

    expect(result).toBe(null)
  })

  it('Validação de cidade - success with updating cidade', () => {
    const result = validateCidade("Caruaru")

    expect(result).toBe(null)
  })

  it('Validação de estado - success with updating estado', () => {
    const result = validateEstado("PE")

    expect(result).toBe(null)
  })
})


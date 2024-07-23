export const TEMPLATES = {
  yup: {
    required: (field: string) => `${field} é um campo obrigatório.`,
    oneOf: (field: string) => `Você deve escoher um dentre os valores: ${field}.`,
    minString: (field: string, length: number) =>
      `${field} deve ter no mínimo ${length} caracteres.`,
    maxString: (field: string, length: number) =>
      `${field} deve ter no máximo ${length} caracteres.`,
    email: (field: string) => `${field} deve ser um e-mail válido.`
  },

  remove: {
    user: (data: any) => `Você deseja remover o usuário ${data.name}?`
  }
}

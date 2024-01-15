import type { inputType } from "@/types"

export const input: { [k in inputType] : { name: string, example: string } } = {
  radio: {
      name: "Selección Única",
      example: "examples/radio.PNG"
  },
  checkbox: {
      name: "Selección Múltiple",
      example: "examples/checkbox.PNG"
  },
  text: {
      name: "Texto Corto",
      example: "examples/text.PNG"
  },
  date: {
      name: "Fecha",
      example: "examples/date.PNG"
  },
  email: {
      name: "Correo Electrónico",
      example: "examples/email.PNG"
  },
  group: {
      name: "Sección",
      example: "examples/email.PNG"
  },
  number: {
      name: "Número",
      example: "examples/number.PNG"
  },
  range: {
      name: "Rango",
      example: "examples/range.PNG"
  },
  select: {
      name: "Selección",
      example: "examples/select.PNG"
  },
  tel: {
      name: "Teléfono",
      example: "examples/tel.PNG"
  },
  textarea: {
      name: "Texto Largo",
      example: "examples/textarea.PNG"
  }
};

/** Determina si el tipo de input seleccionado corresponde al listado proporcionado */
export const isInputType = (type: inputType, ... types: inputType[]) => types.includes(type);


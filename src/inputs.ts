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
  // color: {
  //   name: "Selección de Color",
  //   example: "examples/color.PNG"
  // },
  email: {
    name: "Correo Electrónico",
    example: "examples/email.PNG"
  },
  number: {
    name: "Número",
    example: "examples/number.PNG"
  },
  password: {
    name: "Contraseña",
    example: "examples/password.PNG"
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
}

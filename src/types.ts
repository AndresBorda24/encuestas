import type { FormKitOptionsList } from "@formkit/inputs"

export type inputType = "radio"
    | "checkbox"
    | "text"
    | "date"
    | "email"
    | "group"
    | "number"
    | "range"
    | "select"
    | "tel"
    | "textarea"

export type option = {
    value: string,
    label: string,
    help?: string
}

export type question = {
    id: string,
    type: inputType,
    question: string,
    questions?: question[],
    groupId?: string,
    help?: string,
    rules?: string | [rule: string, ... params: any[]][],
    options?: FormKitOptionsList,
    placeholder?: string,
    confirmation?: boolean,
    default?: string
}

export type validationRule = {
  value: string,
  label: string,
  help: string,
  for: inputType[],
  requiredFor: inputType[],
  params: {
    type: string,
    value?: string | RegExp,
    label?: string,
    validation?: string | [rule: string, ... params: any[]][],
    placeholder?: string,
    help?: string
  }[]
}


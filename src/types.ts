import type { FormKitOptionsList } from "@formkit/inputs"

export type inputType = "radio"
    | "checkbox"
    | "text"
    | "date"
    | "color"
    | "email"
    | "group"
    | "number"
    | "password"
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
    group?: string,
    help?: string,
    rules?: string | [rule: string, ... params: any[]][],
    options?: FormKitOptionsList,
    placeholder?: string,
    confirmation?: boolean,
    default?: string
}

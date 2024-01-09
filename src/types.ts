import type { FormKitOptionsList } from "@formkit/inputs"

export type inputType = "radio"
    | "checkbox"
    | "text"
    | "date"
    | "color"
    | "email"
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
    type: inputType,
    question: string,
    help?: string,
    rules?: string | [rule: string, ... params: any[]][],
    options?: FormKitOptionsList,
    placeholder?: string,
    confirmation?: boolean,
    default?: string
}

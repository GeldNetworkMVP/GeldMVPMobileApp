export type InputField = TextInputField | SelectInputField;

export type TextInputField = {
    valuekey: string;
    valuetype: "text";
}

export type SelectInputField = {
    valuekey: string;
    valuetype: Omit<string, "text">;
}
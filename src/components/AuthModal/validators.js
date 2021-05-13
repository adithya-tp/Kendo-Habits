const emailRegex = new RegExp(/\S+@\S+\.\S+/);

export const emailValidator = (value) => !value ?
    "Email field is required." :
    (emailRegex.test(value) ? "" : "Email is not in a valid format.");

export const passwordValidator = (value) => value && value.length >= 8 ? '' : 'Password must be at least 8 symbols.';

export const nameValidator = (value) => !value ?
    "Please enter your name." :
    (value.includes("<") || value.includes(">")) ? "Please enter valid characters" : "";
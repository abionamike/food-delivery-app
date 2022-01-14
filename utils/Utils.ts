function isValidEmail(value: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value: string, setEmailError: (arg0: string) => void) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}

function validatePassword(value: string, setPasswordError: (arg0: string) => void) {
    if (value.length < 9) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}

const utils = {
    isValidEmail,
    validateEmail,
    validatePassword
};

export default utils;
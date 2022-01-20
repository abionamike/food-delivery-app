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

function validateInput(value: string, minLength: number, setError: (arg0: string) => void) {
    if (value.length < minLength) {
        setError("Invalid Input")
    } else {
        setError("")
    }
}

function calculateAngle(coordinates: any) {
    let startLat = coordinates[0]["latitude"]
    let startLng = coordinates[0]["longitude"]
    let endLat = coordinates[1]["latitude"]
    let endLng = coordinates[1]["longitude"]
    let dx = endLat - startLat
    let dy = endLng - startLng

    return Math.atan2(dy, dx) * 180 / Math.PI
}

const utils = {
    isValidEmail,
    validateEmail,
    validatePassword,
    validateInput,
    calculateAngle
};

export default utils;
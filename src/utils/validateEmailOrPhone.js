const validateEmailOrPhone = (value) => {
    const emailRegex = /^\S+@\S+\.\S+$/
    const phoneRegex = /^[0-9]{10}$/
    if (!value) return "Email or phone is required"
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
        return "Enter a valid email or phone number"
    }
    return true
}

export default validateEmailOrPhone

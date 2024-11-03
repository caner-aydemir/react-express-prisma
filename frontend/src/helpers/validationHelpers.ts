export const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
};

export const validateName = (name: string) => {
    const nameRegex = /^[A-Za-zÇÖĞÜŞİçöğüşiı ]+$/;
    return nameRegex.test(name);
};

export const validateAge = (age: number) => {
    return age >= 1 && age <= 99;
};


export const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push("Password must be at least 8 characters.");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
    if (!/\d/.test(password)) errors.push("Password must contain at least one digit.");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must contain at least one special character (!@#$%^&*).");

    return errors;
};
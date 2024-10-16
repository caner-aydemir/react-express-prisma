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

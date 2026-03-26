export const validationDUI = (DUI) => {

    const regex = /^\d{8}-\d{1}$/;

    if (!regex.test(DUI)) {
        return false;
    }

    return true
}

export const validationEmail = (Email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(Email)) {
        return false;
    }

    return true
}


exports.validation = (DUI) => {

    const regex = /^\d{8}-\d{1}$/;

    if (!regex.test(DUI)) {
        return false; // Formato incorrecto
    }

    return true
}
const validation = (DUI) => {

    const regex = /^\d{8}-\d{1}$/;

    if (!regex.test(DUI)) {
        return false; 
    }

    return true
}

export default validation
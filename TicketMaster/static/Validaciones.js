function validarRegistro() {
    var nombre = document.getElementById("nombre").value;
    var contraseña = document.getElementById("psw").value;

    // Validación del nombre
    if (nombre.length < 4 || nombre.length > 10) {
        alert("El nombre debe tener entre 4 y 10 caracteres.");
        return false;
    }

    if (/[a-z]/.test(nombre[0])) {
        alert("El nombre debe comenzar con mayúscula.");
        return false;
    }

    if (/\s/.test(nombre)) {
        alert("El nombre no puede contener espacios.");
        return false;
    }

    if (/[^A-Za-z0-9]/.test(nombre)) {
        alert("El nombre solo puede contener letras y números.");
        return false;
    }

    // Validación de la contraseña
    if (contraseña.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return false;
    }

    // Validar uso exclusivo de minúsculas
    if (contraseña !== contraseña.toLowerCase()) {
        alert("La contraseña debe contener solo minúsculas.");
        return false;
    }

    // Validar caracteres especiales solo al inicio y al final
    var regexCaracteresEspeciales = /^\W.*\W$/;
    if (!regexCaracteresEspeciales.test(contraseña)) {
        alert("La contraseña debe tener caracteres especiales solo al inicio y al final.");
        return false;
    }

    // Validar que no contenga números
    if (/\d/.test(contraseña)) {
        alert("La contraseña no puede contener números.");
        return false;
    }

    alert("Registro exitoso!");
    return true;
}
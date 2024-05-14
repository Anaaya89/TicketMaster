document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
  
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validarRegistro()) {
          window.location.href = "menu.html";
        }
    });
  
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Aquí puedes agregar la lógica para verificar las credenciales y mostrar el mensaje de inicio de sesión exitoso o no.
        alert("Inicio de sesión exitoso"); // Puedes personalizar este mensaje según tus necesidades.
        window.location.href = "menu.html";
      });
  
    function validarRegistro() {
      var nombre = document.getElementById('fullName').value;
      var email = document.getElementById('email').value;
      var contraseña = document.getElementById('password').value;
      var errores = "";
  
      // Validación del nombre
      if (nombre.length < 4 || nombre.length > 10) {
        errores += "El nombre debe tener entre 4 y 10 caracteres.\n";
      }
  
      if (/[a-z]/.test(nombre[0])) {
        errores += "El nombre debe comenzar con mayúscula.\n";
      }
  
      if (/\s/.test(nombre)) {
        errores += "El nombre no puede contener espacios.\n";
      }
  
      if (/[^A-Za-z0-9]/.test(nombre)) {
        errores += "El nombre solo puede contener letras y números.\n";
      }
  
      // Validación del correo electrónico
      if (!/\S+@\S+\.\S+/.test(email)) {
        errores += "El correo electrónico no es válido.\n";
      }
  
      // Validación de la contraseña
      if (contraseña.length < 8) {
        errores += "La contraseña debe tener al menos 8 caracteres.\n";
      }
  
      // Validar uso exclusivo de minúsculas
      if (contraseña !== contraseña.toLowerCase()) {
        errores += "La contraseña debe contener solo minúsculas.\n";
      }
  
      // Validar caracteres especiales solo al inicio y al final
      var regexCaracteresEspeciales = /^\W.*\W$/;
      if (!regexCaracteresEspeciales.test(contraseña)) {
        errores += "La contraseña debe tener caracteres especiales solo al inicio y al final.\n";
      }
  
      // Validar que no contenga números
      if (/\d/.test(contraseña)) {
        errores += "La contraseña no puede contener números.\n";
      }
  
      if (errores !== "") {
        alert("Se encontraron los siguientes errores:\n" + errores);
        return false;
      } else {
        alert("Registro exitoso!");
        return true;
      }
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    var slider = document.querySelector('.slider');
    var sliderText = document.querySelector('.slider-text');

    slider.addEventListener('click', function() {
        var activeIndex = Array.from(slider.children).findIndex(function(item) {
            return item.style.display !== 'none';
        });

        // Ajusta la posición del texto
        var sliderWidth = slider.offsetWidth;
        var textWidth = sliderText.offsetWidth;
        var marginLeft = (sliderWidth - textWidth) / 2;
        sliderText.style.marginLeft = marginLeft + 'px';
    });
});




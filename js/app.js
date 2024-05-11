document.addEventListener('DOMContentLoaded', function () { //carga el codigo despues de que el dom este cargado

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    //Selleccionamos los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    //call back cuando mandas a llamar una funcion despues de un evento
    // blur cuando sales de un campo
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);


    btnReset.addEventListener('click', function(evento) {
        evento.preventDefault();

        resetearFormulario();
    })

    function validar (evento) { //trim borra espacios en blanco
        if(evento.target.value.trim() === '') {
            mostratAlerta(`El campo ${evento.target.id} es obligatorio`, evento.target.parentElement);//pasamos el mensaje a la funcion
            email[evento.target.name] = '';
            comprobarEmail();
            return; //detiene ejecucion de codigo
        }

        if(evento.target.id === 'email' && !validarEmail(evento.target.value)) {
            mostratAlerta('El email no es valido', evento.target.parentElement);
            email[evento.target.name] = '';
            comprobarEmail();
            return;
        };

        limpiarAlerta(evento.target.parentElement);

        //Asignar los valores a objeto
        email[evento.target.name] = evento.target.value.trim().toLowerCase();

        //Comprobar el objeto de email
        comprobarEmail();

    }

    function mostratAlerta(mensaje, referencia) {
        limpiarAlerta(referencia)
    

        // generar alerta en html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        //inyectamos error al formuilario
        referencia.appendChild(error)
    }

    function limpiarAlerta (referencia) {
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    btnReset.addEventListener('click', function(evento) {
        evento.preventDefault();
        resetearFormulario();
    })

    function enviarEmail(evento){
        evento.preventDefault();

        setTimeout(() => {

            resetearFormulario();

            //crea alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 
            'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000)

        }, 3000);
    }

    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){ //toma valores del objeto email y los pasa a arreglo y con includes verifica si hay valores vacios da false si todo esta lleno
            if(Object.values(email).includes('') ) {
                btnSubmit.classList.add('opacity-50');
                btnSubmit.disabled= true;
                return;
            } 

            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled= false;
    }

    function resetearFormulario() {
        email.email= '';
        email.asunto='';
        email.mensaje='';

        formulario.reset();
        comprobarEmail();
    }



});
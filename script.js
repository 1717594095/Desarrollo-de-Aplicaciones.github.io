// ============================================================
// script.js
// Sistema de Monitoreo y Gestión de Seguridad Ciudadana
// Módulo: Registro dinámico de incidencias con validaciones
// ============================================================

// Contador global de registros creados
let totalRegistros = 0;

// Reglas mínimas de validación (fáciles de ajustar si cambian los requisitos)
const LONGITUD_MIN_NOMBRE = 5;
const LONGITUD_MIN_DESCRIPCION = 15;

document.addEventListener('DOMContentLoaded', function () {

    // ── Referencias a los elementos del DOM ──
    const formulario = document.getElementById('formIncidencia');
    const inputNombre = document.getElementById('nombreIncidencia');
    const inputDescripcion = document.getElementById('descripcionIncidencia');
    const selectCategoria = document.getElementById('categoriaIncidencia');

    const feedbackNombre = document.getElementById('nombreFeedback');
    const feedbackDescripcion = document.getElementById('descripcionFeedback');
    const feedbackCategoria = document.getElementById('categoriaFeedback');

    const listaIncidencias = document.getElementById('listaIncidencias');
    const estadoVacio = document.getElementById('estadoVacio');
    const totalIncidenciasSpan = document.getElementById('totalIncidencias');
    const alertaValidacion = document.getElementById('alertaValidacion');

    // ============================================================
    // FUNCIONES DE VALIDACIÓN
    // Cada una revisa un campo y devuelve true/false, además de
    // marcar el campo (is-valid / is-invalid) y actualizar su mensaje.
    // ============================================================

    function validarNombre() {
        const valor = inputNombre.value.trim();

        if (valor === '') {
            return marcarInvalido(inputNombre, feedbackNombre, 'El nombre de la incidencia es obligatorio.');
        }
        if (valor.length < LONGITUD_MIN_NOMBRE) {
            return marcarInvalido(inputNombre, feedbackNombre, `Debe tener al menos ${LONGITUD_MIN_NOMBRE} caracteres.`);
        }
        return marcarValido(inputNombre, feedbackNombre);
    }

    function validarDescripcion() {
        const valor = inputDescripcion.value.trim();

        if (valor === '') {
            return marcarInvalido(inputDescripcion, feedbackDescripcion, 'La descripción es obligatoria.');
        }
        if (valor.length < LONGITUD_MIN_DESCRIPCION) {
            return marcarInvalido(inputDescripcion, feedbackDescripcion, `Agregue más detalle (mínimo ${LONGITUD_MIN_DESCRIPCION} caracteres).`);
        }
        return marcarValido(inputDescripcion, feedbackDescripcion);
    }

    function validarCategoria() {
        const valor = selectCategoria.value.trim();

        if (valor === '') {
            return marcarInvalido(selectCategoria, feedbackCategoria, 'Seleccione una categoría.');
        }
        return marcarValido(selectCategoria, feedbackCategoria);
    }

    // Revisa los tres campos a la vez (se usa en el submit)
    function validarFormularioCompleto() {
        const nombreOk = validarNombre();
        const descripcionOk = validarDescripcion();
        const categoriaOk = validarCategoria();
        return nombreOk && descripcionOk && categoriaOk;
    }

    // ============================================================
    // FUNCIONES DE APOYO PARA MARCAR CAMPOS
    // ============================================================

    function marcarInvalido(campo, elementoFeedback, mensaje) {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
        elementoFeedback.textContent = mensaje;
        elementoFeedback.classList.add('d-block');
        return false;
    }

    function marcarValido(campo, elementoFeedback) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
        elementoFeedback.textContent = '';
        elementoFeedback.classList.remove('d-block');
        return true;
    }

    // Quita las marcas de validación de todos los campos (para cuando se limpia el formulario)
    function limpiarValidaciones() {
        [inputNombre, inputDescripcion, selectCategoria].forEach(function (campo) {
            campo.classList.remove('is-valid', 'is-invalid');
        });
        [feedbackNombre, feedbackDescripcion, feedbackCategoria].forEach(function (feedback) {
            feedback.textContent = '';
            feedback.classList.remove('d-block');
        });
    }

    /**
     * Muestra un mensaje general de éxito o error encima de la lista de incidencias.
     */
    function mostrarAlerta(mensaje, tipo) {
        alertaValidacion.innerHTML = '';

        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo} mt-3`;
        alerta.setAttribute('role', 'alert');
        alerta.textContent = mensaje;

        alertaValidacion.appendChild(alerta);

        setTimeout(function () {
            alerta.remove();
        }, 3000);
    }

    // ============================================================
    // EVENTOS DE VALIDACIÓN EN TIEMPO REAL
    // "input" corrige el mensaje mientras la persona escribe,
    // "blur" valida apenas el usuario sale del campo.
    // ============================================================

    inputNombre.addEventListener('input', validarNombre);
    inputNombre.addEventListener('blur', validarNombre);

    inputDescripcion.addEventListener('input', validarDescripcion);
    inputDescripcion.addEventListener('blur', validarDescripcion);

    selectCategoria.addEventListener('change', validarCategoria);
    selectCategoria.addEventListener('blur', validarCategoria);

    // ============================================================
    // EVENTO SUBMIT DEL FORMULARIO
    // ============================================================

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault(); // evita que la página se recargue

        const formularioValido = validarFormularioCompleto();

        if (!formularioValido) {
            mostrarAlerta('⚠️ Revise los campos marcados en rojo antes de registrar.', 'danger');
            return;
        }

        const nombre = inputNombre.value.trim();
        const descripcion = inputDescripcion.value.trim();
        const categoria = selectCategoria.value.trim();

        crearIncidencia(nombre, descripcion, categoria);
        mostrarAlerta('✅ Incidencia registrada correctamente.', 'success');

        formulario.reset();
        limpiarValidaciones();
        inputNombre.focus();
    });

    // ============================================================
    // CREACIÓN, CONTEO Y ELIMINACIÓN DE INCIDENCIAS
    // ============================================================

    function crearIncidencia(nombre, descripcion, categoria) {
        if (estadoVacio) {
            estadoVacio.style.display = 'none';
        }

        const item = document.createElement('li');
        item.className = 'incidencia-item';

        const info = document.createElement('div');
        info.className = 'incidencia-info';

        const titulo = document.createElement('strong');
        titulo.textContent = nombre;

        const parrafoDescripcion = document.createElement('p');
        parrafoDescripcion.textContent = descripcion;

        const badgeCategoria = document.createElement('span');
        badgeCategoria.className = 'badge bg-secondary';
        badgeCategoria.textContent = categoria;

        const fecha = document.createElement('p');
        const ahora = new Date();
        fecha.textContent = 'Registrado: ' + ahora.toLocaleString();
        fecha.style.fontSize = '.75rem';

        info.appendChild(titulo);
        info.appendChild(parrafoDescripcion);
        info.appendChild(badgeCategoria);
        info.appendChild(fecha);

        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn btn-outline-danger btn-sm';
        botonEliminar.type = 'button';
        botonEliminar.textContent = '🗑 Eliminar';

        botonEliminar.addEventListener('click', function () {
            item.remove();
            actualizarTotal(-1);

            if (listaIncidencias.querySelectorAll('.incidencia-item').length === 0 && estadoVacio) {
                estadoVacio.style.display = 'block';
            }
        });

        item.appendChild(info);
        item.appendChild(botonEliminar);
        listaIncidencias.appendChild(item);

        actualizarTotal(1);
    }

    function actualizarTotal(variacion) {
        totalRegistros += variacion;
        if (totalRegistros < 0) totalRegistros = 0;
        totalIncidenciasSpan.textContent = totalRegistros;
    }

});
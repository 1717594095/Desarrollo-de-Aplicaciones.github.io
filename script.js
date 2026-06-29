// ============================================================
// script.js
// Sistema de Monitoreo y Gestión de Seguridad Ciudadana
// Módulo: Registro dinámico de incidencias
// ============================================================

// Contador global de registros creados
let totalRegistros = 0;

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Referencias a los elementos del DOM
    const formulario = document.getElementById('formIncidencia');
    const inputNombre = document.getElementById('nombreIncidencia');
    const inputDescripcion = document.getElementById('descripcionIncidencia');
    const selectCategoria = document.getElementById('categoriaIncidencia');
    const listaIncidencias = document.getElementById('listaIncidencias');
    const estadoVacio = document.getElementById('estadoVacio');
    const totalIncidenciasSpan = document.getElementById('totalIncidencias');
    const alertaValidacion = document.getElementById('alertaValidacion');

    // Captura del evento submit del formulario
    formulario.addEventListener('submit', function (evento) {
        // Evitamos que la página se recargue
        evento.preventDefault();

        // Obtenemos y limpiamos los valores ingresados
        const nombre = inputNombre.value.trim();
        const descripcion = inputDescripcion.value.trim();
        const categoria = selectCategoria.value.trim();

        // Validación de campos vacíos
        if (nombre === '' || descripcion === '' || categoria === '') {
            mostrarAlerta('⚠️ Todos los campos son obligatorios. Por favor complete el formulario.', 'danger');
            return;
        }

        // Si la validación es correcta, creamos el nuevo registro
        crearIncidencia(nombre, descripcion, categoria);

        // Mensaje de éxito
        mostrarAlerta('✅ Incidencia registrada correctamente.', 'success');

        // Limpiamos el formulario
        formulario.reset();
        inputNombre.focus();
    });

    /**
     * Muestra un mensaje dinámico de validación usando clases de Bootstrap.
     * @param {string} mensaje - Texto a mostrar.
     * @param {string} tipo - Tipo de alerta de Bootstrap ('success' | 'danger').
     */
    function mostrarAlerta(mensaje, tipo) {
        // Limpiamos cualquier alerta anterior
        alertaValidacion.innerHTML = '';

        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo} mt-3`;
        alerta.setAttribute('role', 'alert');
        alerta.textContent = mensaje;

        alertaValidacion.appendChild(alerta);

        // La alerta desaparece automáticamente después de 3 segundos
        setTimeout(function () {
            alerta.remove();
        }, 3000);
    }

    /**
     * Crea dinámicamente un nuevo elemento de incidencia y lo agrega a la lista.
     */
    function crearIncidencia(nombre, descripcion, categoria) {
        // Si es el primer registro, ocultamos el mensaje de "lista vacía"
        if (estadoVacio) {
            estadoVacio.style.display = 'none';
        }

        // Creamos el contenedor principal del registro (createElement)
        const item = document.createElement('li');
        item.className = 'incidencia-item';

        // Bloque de información
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

        // Ensamblamos el bloque de información (appendChild)
        info.appendChild(titulo);
        info.appendChild(parrafoDescripcion);
        info.appendChild(badgeCategoria);
        info.appendChild(fecha);

        // Botón para eliminar el registro
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn btn-outline-danger btn-sm';
        botonEliminar.type = 'button';
        botonEliminar.textContent = '🗑 Eliminar';

        // Evento click para eliminar el registro
        botonEliminar.addEventListener('click', function () {
            item.remove();
            actualizarTotal(-1);

            // Si ya no quedan incidencias, mostramos el estado vacío de nuevo
            if (listaIncidencias.querySelectorAll('.incidencia-item').length === 0 && estadoVacio) {
                estadoVacio.style.display = 'block';
            }
        });

        // Ensamblamos el item completo
        item.appendChild(info);
        item.appendChild(botonEliminar);

        // Agregamos el nuevo registro a la lista en el DOM
        listaIncidencias.appendChild(item);

        // Actualizamos el contador total
        actualizarTotal(1);
    }

    /**
     * Actualiza el contador total de registros creados en pantalla.
     * @param {number} variacion - +1 al crear, -1 al eliminar.
     */
    function actualizarTotal(variacion) {
        totalRegistros += variacion;
        if (totalRegistros < 0) totalRegistros = 0;
        totalIncidenciasSpan.textContent = totalRegistros;
    }

});
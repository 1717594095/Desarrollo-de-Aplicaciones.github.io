<<<<<<< HEAD
/* ============================================================
   script.js
   Lógica interactiva y simulación de base de datos en memoria
   Se conserva la validación dinámica y el renderizado original;
   se adapta la presentación a componentes de Bootstrap 5
   (tabla, modales de detalle/confirmación y spinner de carga).
   ============================================================ */
=======
// ============================================================
// script.js
// Sistema de Monitoreo y Gestión de Seguridad Ciudadana
// Módulo: Registro dinámico de incidencias
// ============================================================
>>>>>>> 5e60f9550ef32f92e4d582c0f39201b7d3753375

// 1. Arreglo inicial de incidencias en memoria (Simula la Base de Datos)
let incidencias = [
    {
        id: 17180291,
        nombre: "Robo de accesorios de vehículo",
        descripcion: "Sujeto desconocido sustrae los espejos retrovisores de un vehículo estacionado en la vía pública.",
        categoria: "Robo"
    }
];

<<<<<<< HEAD
// Guarda el id pendiente de eliminación mientras se confirma en el modal
let idPendienteEliminar = null;

// 2. Selectores de elementos del DOM
const form = document.getElementById('formIncidencia');
const inputNombre = document.getElementById('nombreIncidencia');
const inputDesc = document.getElementById('descripcionIncidencia');
const selectCat = document.getElementById('categoriaIncidencia');
const btnSubmit = document.getElementById('btnSubmit');
const spinnerSubmit = document.getElementById('spinnerSubmit');
const btnSubmitText = document.getElementById('btnSubmitText');
const listaBody = document.getElementById('listaIncidencias');
const totalBadge = document.getElementById('totalIncidencias');
const mensajeEstado = document.getElementById('mensajeEstado');
const alertaValidacion = document.getElementById('alertaValidacion');

// Elementos del modal de detalle
const detalleId = document.getElementById('detalleId');
const detalleNombre = document.getElementById('detalleNombre');
const detalleCategoria = document.getElementById('detalleCategoria');
const detalleDescripcion = document.getElementById('detalleDescripcion');
const modalDetalleEl = document.getElementById('modalDetalle');
const modalDetalle = new bootstrap.Modal(modalDetalleEl);

// Elementos del modal de confirmación de eliminación
const nombreAEliminar = document.getElementById('nombreAEliminar');
const modalEliminarEl = document.getElementById('modalEliminar');
const modalEliminar = new bootstrap.Modal(modalEliminarEl);
const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');

// 3. Funciones de Renderizado Dinámico (Equivale a Jinja de Flask)
function renderListaIncidencias() {
    listaBody.innerHTML = '';

    // Actualizar Contador Global
    totalBadge.textContent = incidencias.length;

    // Mensaje Condicional Basado en Datos (alertas Bootstrap)
    if (incidencias.length === 0) {
        mensajeEstado.innerHTML = `
            <div class="alert alert-secondary" role="alert">
                <i class="bi bi-info-circle me-1"></i> No hay incidencias registradas en el sistema.
            </div>`;
        return;
    } else if (incidencias.length >= 5) {
        mensajeEstado.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-octagon-fill me-1"></i>
                Alta concentración de incidencias detectada en el sector.
            </div>`;
    } else {
        mensajeEstado.innerHTML = `
            <div class="alert alert-success" role="alert">
                <i class="bi bi-check-circle-fill me-1"></i>
                Estado del sector dentro de los parámetros normales.
            </div>`;
    }

    // Recorrido e Inyección de filas en la tabla Bootstrap
    incidencias.forEach(inc => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-muted small">#${inc.id}</td>
            <td class="fw-semibold">${inc.nombre}</td>
            <td><span class="badge bg-secondary">${inc.categoria}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" title="Ver detalle"
                        onclick="verDetalleIncidencia(${inc.id})">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" title="Eliminar"
                        onclick="pedirConfirmacionEliminar(${inc.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        listaBody.appendChild(tr);
    });
}

// 4. Modal de detalle: muestra la información completa de una incidencia
function verDetalleIncidencia(id) {
    const inc = incidencias.find(i => i.id === id);
    if (!inc) return;

    detalleId.textContent = `#${inc.id}`;
    detalleNombre.textContent = inc.nombre;
    detalleCategoria.textContent = inc.categoria;
    detalleDescripcion.textContent = inc.descripcion;

    modalDetalle.show();
}

// 5. Modal de confirmación: solicita confirmar antes de eliminar
function pedirConfirmacionEliminar(id) {
    const inc = incidencias.find(i => i.id === id);
    if (!inc) return;
=======
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
>>>>>>> 5e60f9550ef32f92e4d582c0f39201b7d3753375

    idPendienteEliminar = id;
    nombreAEliminar.textContent = inc.nombre;
    modalEliminar.show();
}

btnConfirmarEliminar.addEventListener('click', () => {
    if (idPendienteEliminar !== null) {
        incidencias = incidencias.filter(inc => inc.id !== idPendienteEliminar);
        renderListaIncidencias();
        idPendienteEliminar = null;
    }
    modalEliminar.hide();
});

// 6. Arquitectura de Validación en Tiempo Real (Mientras escribe y al salir del foco)
function validarCampo(input) {
    let esValido = true;

<<<<<<< HEAD
    if (!input.checkValidity()) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        esValido = false;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }

    verificarFormularioCompleto();
    return esValido;
}

function verificarFormularioCompleto() {
    // Si el formulario nativo es válido, habilitamos el envío
    if (form.checkValidity()) {
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}

// Escuchadores de eventos para los inputs
[inputNombre, inputDesc, selectCat].forEach(element => {
    // Validar cuando el usuario cambia de campo
    element.addEventListener('blur', () => validarCampo(element));
    // Validar mientras escribe para limpiar errores rápidamente
    element.addEventListener('input', () => validarCampo(element));
});

// 7. Gestión del Envío y Alta del Registro (con spinner simulando proceso)
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validación final de seguridad
    if (!form.checkValidity()) {
        alertaValidacion.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <i class="bi bi-x-circle-fill me-1"></i>
                Por favor, corrija los campos marcados antes de guardar.
            </div>`;
        return;
    }

    // Mostrar spinner y bloquear el botón mientras se "procesa" el registro
    spinnerSubmit.classList.remove('d-none');
    btnSubmitText.innerHTML = 'Guardando...';
    btnSubmit.disabled = true;

    // Simulación de proceso asíncrono (ej. llamada a servidor)
    setTimeout(() => {
        // Crear nueva incidencia con un ID aleatorio único
        const nuevaIncidencia = {
            id: Math.floor(10000000 + Math.random() * 90000000),
            nombre: inputNombre.value.trim(),
            descripcion: inputDesc.value.trim(),
            categoria: selectCat.value
        };

        // Agregar al arreglo, renderizar y resetear campos
        incidencias.push(nuevaIncidencia);
        renderListaIncidencias();

        form.reset();

        // Limpiar clases de validación post-envío
        [inputNombre, inputDesc, selectCat].forEach(el => el.classList.remove('is-valid', 'is-invalid'));

        // Restaurar botón
        spinnerSubmit.classList.add('d-none');
        btnSubmitText.innerHTML = '<i class="bi bi-plus-lg"></i> Registrar Incidencia';

        alertaValidacion.innerHTML = `
            <div class="alert alert-success" role="alert">
                <i class="bi bi-check-circle-fill me-1"></i>
                Incidencia guardada con éxito en la sesión local.
            </div>`;

        setTimeout(() => { alertaValidacion.innerHTML = ''; }, 4000);
        verificarFormularioCompleto();
    }, 900);
});

// Inicialización Automática al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderListaIncidencias();
    verificarFormularioCompleto();
});
=======
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
>>>>>>> 5e60f9550ef32f92e4d582c0f39201b7d3753375

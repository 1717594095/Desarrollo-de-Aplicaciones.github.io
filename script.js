/* ============================================================
   script.js
   Lógica interactiva y simulación de base de datos en memoria
   Se conserva la validación dinámica y el renderizado original;
   se adapta la presentación a componentes de Bootstrap 5
   (tabla, modales de detalle/confirmación y spinner de carga).
   ============================================================ */

// 1. Arreglo inicial de incidencias en memoria (Simula la Base de Datos)
let incidencias = [
    {
        id: 17180291,
        nombre: "Robo de accesorios de vehículo",
        descripcion: "Sujeto desconocido sustrae los espejos retrovisores de un vehículo estacionado en la vía pública.",
        categoria: "Robo"
    }
];

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
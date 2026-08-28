document.addEventListener("DOMContentLoaded", () => {
    configurarFiltrosDeTabla();
    configurarIncidencias();
});

function configurarFiltrosDeTabla() {
    document.querySelectorAll("[data-table-filter]").forEach((input) => {
        const tabla = document.getElementById(input.dataset.tableFilter);
        if (!tabla) return;

        input.addEventListener("input", () => {
            const consulta = input.value.toLowerCase().trim();
            tabla.querySelectorAll("tbody tr").forEach((fila) => {
                fila.hidden = !fila.textContent.toLowerCase().includes(consulta);
            });
        });
    });
}

function configurarIncidencias() {
    const formulario = document.getElementById("formIncidencia");
    if (!formulario) return;

    const inputNombre = document.getElementById("nombreIncidencia");
    const inputDescripcion = document.getElementById("descripcionIncidencia");
    const selectCategoria = document.getElementById("categoriaIncidencia");
    const botonEnviar = document.getElementById("btnSubmit");
    const spinner = document.getElementById("spinnerSubmit");
    const textoBoton = document.getElementById("btnSubmitText");
    const lista = document.getElementById("listaIncidencias");
    const total = document.getElementById("totalIncidencias");
    const mensajeEstado = document.getElementById("mensajeEstado");
    const alerta = document.getElementById("alertaValidacion");

    const detalle = {
        id: document.getElementById("detalleId"),
        nombre: document.getElementById("detalleNombre"),
        categoria: document.getElementById("detalleCategoria"),
        descripcion: document.getElementById("detalleDescripcion"),
    };

    const modalDetalle = new bootstrap.Modal(document.getElementById("modalDetalle"));
    const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
    const nombreAEliminar = document.getElementById("nombreAEliminar");
    const confirmarEliminar = document.getElementById("btnConfirmarEliminar");

    let idPendienteEliminar = null;
    let incidencias = [
        {
            id: 17180291,
            nombre: "Robo de accesorios de vehículo",
            descripcion: "Sustracción de espejos retrovisores de un vehículo estacionado en la vía pública.",
            categoria: "Robo",
        },
    ];

    function verificarFormulario() {
        botonEnviar.disabled = !formulario.checkValidity();
    }

    function validarCampo(campo) {
        campo.classList.toggle("is-valid", campo.checkValidity());
        campo.classList.toggle("is-invalid", !campo.checkValidity());
        verificarFormulario();
    }

    function mostrarAlerta(mensaje, tipo) {
        alerta.innerHTML = `<div class="alert alert-${tipo} mb-0" role="alert">${mensaje}</div>`;
        window.setTimeout(() => {
            alerta.innerHTML = "";
        }, 4000);
    }

    function renderizarIncidencias() {
        lista.innerHTML = "";
        total.textContent = incidencias.length;

        if (incidencias.length === 0) {
            mensajeEstado.innerHTML = '<div class="alert alert-secondary"><i class="bi bi-info-circle me-1"></i>No hay incidencias registradas.</div>';
            return;
        }

        mensajeEstado.innerHTML = incidencias.length >= 5
            ? '<div class="alert alert-danger"><i class="bi bi-exclamation-octagon-fill me-1"></i>Alta concentración de incidencias detectada.</div>'
            : '<div class="alert alert-success"><i class="bi bi-check-circle-fill me-1"></i>Estado del sector dentro de los parámetros normales.</div>';

        incidencias.forEach((incidencia) => {
            const fila = document.createElement("tr");

            const celdaId = document.createElement("td");
            celdaId.className = "text-muted small";
            celdaId.textContent = `#${incidencia.id}`;

            const celdaNombre = document.createElement("td");
            celdaNombre.className = "fw-semibold";
            celdaNombre.textContent = incidencia.nombre;

            const celdaCategoria = document.createElement("td");
            const badge = document.createElement("span");
            badge.className = "badge text-bg-secondary";
            badge.textContent = incidencia.categoria;
            celdaCategoria.appendChild(badge);

            const celdaAcciones = document.createElement("td");
            celdaAcciones.className = "text-end text-nowrap";

            const botonDetalle = document.createElement("button");
            botonDetalle.type = "button";
            botonDetalle.className = "btn btn-sm btn-outline-primary me-1";
            botonDetalle.title = "Ver detalle";
            botonDetalle.innerHTML = '<i class="bi bi-eye"></i>';
            botonDetalle.addEventListener("click", () => verDetalle(incidencia.id));

            const botonEliminar = document.createElement("button");
            botonEliminar.type = "button";
            botonEliminar.className = "btn btn-sm btn-outline-danger";
            botonEliminar.title = "Eliminar";
            botonEliminar.innerHTML = '<i class="bi bi-trash"></i>';
            botonEliminar.addEventListener("click", () => pedirEliminacion(incidencia.id));

            celdaAcciones.append(botonDetalle, botonEliminar);
            fila.append(celdaId, celdaNombre, celdaCategoria, celdaAcciones);
            lista.appendChild(fila);
        });
    }

    function verDetalle(id) {
        const incidencia = incidencias.find((item) => item.id === id);
        if (!incidencia) return;

        detalle.id.textContent = `#${incidencia.id}`;
        detalle.nombre.textContent = incidencia.nombre;
        detalle.categoria.textContent = incidencia.categoria;
        detalle.descripcion.textContent = incidencia.descripcion;
        modalDetalle.show();
    }

    function pedirEliminacion(id) {
        const incidencia = incidencias.find((item) => item.id === id);
        if (!incidencia) return;

        idPendienteEliminar = id;
        nombreAEliminar.textContent = incidencia.nombre;
        modalEliminar.show();
    }

    [inputNombre, inputDescripcion, selectCategoria].forEach((campo) => {
        campo.addEventListener("input", () => validarCampo(campo));
        campo.addEventListener("blur", () => validarCampo(campo));
    });

    confirmarEliminar.addEventListener("click", () => {
        if (idPendienteEliminar !== null) {
            incidencias = incidencias.filter((item) => item.id !== idPendienteEliminar);
            renderizarIncidencias();
            idPendienteEliminar = null;
        }
        modalEliminar.hide();
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            [inputNombre, inputDescripcion, selectCategoria].forEach(validarCampo);
            mostrarAlerta("Corrija los campos marcados antes de continuar.", "danger");
            return;
        }

        spinner.classList.remove("d-none");
        textoBoton.textContent = "Guardando...";
        botonEnviar.disabled = true;

        window.setTimeout(() => {
            incidencias.push({
                id: Math.floor(10000000 + Math.random() * 90000000),
                nombre: inputNombre.value.trim(),
                descripcion: inputDescripcion.value.trim(),
                categoria: selectCategoria.value,
            });

            renderizarIncidencias();
            formulario.reset();
            [inputNombre, inputDescripcion, selectCategoria].forEach((campo) => campo.classList.remove("is-valid", "is-invalid"));
            spinner.classList.add("d-none");
            textoBoton.innerHTML = '<i class="bi bi-plus-lg me-1"></i>Registrar incidencia';
            verificarFormulario();
            mostrarAlerta("Incidencia registrada correctamente en la sesión local.", "success");
        }, 500);
    });

    renderizarIncidencias();
    verificarFormulario();
}

import os
from datetime import date

from flask import Flask, flash, redirect, render_template, url_for
from flask_wtf.csrf import CSRFProtect

from forms import ClienteForm, FacturacionForm, ProductoForm, ProveedorForm


app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get(
    "SMGSC_SECRET_KEY",
    "clave-segura-local-semana-11-smgsc",
)
csrf = CSRFProtect(app)


NOMBRE_SISTEMA = "Sistema de Monitoreo y Gestión de Seguridad Ciudadana"

INFORMACION_SISTEMA = {
    "siglas": "SMGSC",
    "version": "3.0",
    "estado": "Operativo",
    "institucion": "Unidad de Seguridad Ciudadana de Montecristi",
}


PRODUCTOS = [
    {
        "codigo": "SEG-001",
        "nombre": "Cámara IP de vigilancia",
        "categoria": "Videovigilancia",
        "stock": 18,
        "estado": "Disponible",
    },
    {
        "codigo": "COM-014",
        "nombre": "Radio portátil digital",
        "categoria": "Comunicación",
        "stock": 10,
        "estado": "Disponible",
    },
    {
        "codigo": "MOV-007",
        "nombre": "Kit GPS para patrulla",
        "categoria": "Movilidad",
        "stock": 4,
        "estado": "Stock bajo",
    },
    {
        "codigo": "SEG-022",
        "nombre": "Botón de alerta comunitaria",
        "categoria": "Emergencia",
        "stock": 0,
        "estado": "Agotado",
    },
]

CLIENTES = [
    {
        "id": "CLI-001",
        "nombre": "Unidad Educativa Montecristi",
        "tipo": "Institución educativa",
        "contacto": "María Zambrano",
        "email": "maria.zambrano@example.com",
        "estado": "Activo",
    },
    {
        "id": "CLI-002",
        "nombre": "Comité Barrial Los Almendros",
        "tipo": "Organización comunitaria",
        "contacto": "José Cedeño",
        "email": "jose.cedeno@example.com",
        "estado": "Activo",
    },
    {
        "id": "CLI-003",
        "nombre": "Mercado Municipal Central",
        "tipo": "Entidad pública",
        "contacto": "Ana Mero",
        "email": "ana.mero@example.com",
        "estado": "En revisión",
    },
]

PROVEEDORES = [
    {
        "ruc": "1390012456001",
        "empresa": "TecnoSeguridad Manabí",
        "servicio": "Cámaras y alarmas",
        "telefono": "098 245 7812",
        "email": "ventas@tecnoseguridad.example.com",
        "evaluacion": "Excelente",
    },
    {
        "ruc": "1792145803001",
        "empresa": "Comunicaciones Ecuador",
        "servicio": "Radios y antenas",
        "telefono": "099 631 4087",
        "email": "contacto@comunicaciones.example.com",
        "evaluacion": "Muy buena",
    },
    {
        "ruc": "1391784502001",
        "empresa": "Movilidad Segura S.A.",
        "servicio": "GPS y mantenimiento",
        "telefono": "096 807 1224",
        "email": "ventas@movilidadsegura.example.com",
        "evaluacion": "Buena",
    },
]

FACTURAS = [
    {
        "numero": "FAC-2026-001",
        "cliente": "Unidad Educativa Montecristi",
        "fecha": "12/08/2026",
        "total": 1280.00,
        "estado": "Pagada",
    },
    {
        "numero": "FAC-2026-002",
        "cliente": "Comité Barrial Los Almendros",
        "fecha": "18/08/2026",
        "total": 845.50,
        "estado": "Pendiente",
    },
    {
        "numero": "FAC-2026-003",
        "cliente": "Mercado Municipal Central",
        "fecha": "23/08/2026",
        "total": 2150.00,
        "estado": "Emitida",
    },
]


@app.context_processor
def datos_globales():
    """Datos disponibles en todas las plantillas."""
    return {
        "anio_actual": date.today().year,
        "nombre_sistema": NOMBRE_SISTEMA,
    }


@app.route("/")
def index():
    return render_template(
        "index.html",
        titulo="Inicio",
        informacion=INFORMACION_SISTEMA,
        mensaje_bienvenida="Tecnología al servicio de la comunidad",
    )


@app.route("/productos")
def productos():
    return render_template(
        "productos.html",
        titulo="Productos",
        productos=PRODUCTOS,
    )


@app.route("/productos/nuevo", methods=["GET", "POST"])
def nuevo_producto():
    form = ProductoForm()

    if form.validate_on_submit():
        codigo = form.codigo.data.strip().upper()
        if any(producto["codigo"].upper() == codigo for producto in PRODUCTOS):
            form.codigo.errors.append("Ya existe un producto registrado con este código.")
        else:
            stock = form.stock.data
            if stock == 0:
                estado = "Agotado"
            elif stock <= 5:
                estado = "Stock bajo"
            else:
                estado = "Disponible"

            PRODUCTOS.append(
                {
                    "codigo": codigo,
                    "nombre": form.nombre.data.strip(),
                    "categoria": form.categoria.data,
                    "stock": stock,
                    "estado": estado,
                }
            )
            flash("Producto registrado correctamente.", "success")
            return redirect(url_for("productos"))

    return render_template(
        "formulario_producto.html",
        titulo="Nuevo producto",
        encabezado="Registrar producto",
        form=form,
    )


@app.route("/clientes")
def clientes():
    return render_template(
        "clientes.html",
        titulo="Clientes",
        clientes=CLIENTES,
    )


@app.route("/clientes/nuevo", methods=["GET", "POST"])
def nuevo_cliente():
    form = ClienteForm()

    if form.validate_on_submit():
        identificacion = form.identificacion.data.strip().upper()
        if any(cliente["id"].upper() == identificacion for cliente in CLIENTES):
            form.identificacion.errors.append("Ya existe un cliente registrado con este código.")
        else:
            CLIENTES.append(
                {
                    "id": identificacion,
                    "nombre": form.nombre.data.strip(),
                    "tipo": form.tipo.data,
                    "contacto": form.contacto.data.strip(),
                    "email": form.email.data.strip().lower(),
                    "estado": form.estado.data,
                }
            )
            flash("Cliente registrado correctamente.", "success")
            return redirect(url_for("clientes"))

    return render_template(
        "formulario_cliente.html",
        titulo="Nuevo cliente",
        encabezado="Registrar cliente",
        form=form,
    )


@app.route("/proveedores")
def proveedores():
    return render_template(
        "proveedores.html",
        titulo="Proveedores",
        proveedores=PROVEEDORES,
    )


@app.route("/proveedores/nuevo", methods=["GET", "POST"])
def nuevo_proveedor():
    form = ProveedorForm()

    if form.validate_on_submit():
        ruc = form.ruc.data.strip()
        if any(proveedor["ruc"] == ruc for proveedor in PROVEEDORES):
            form.ruc.errors.append("Ya existe un proveedor registrado con este RUC.")
        else:
            PROVEEDORES.append(
                {
                    "ruc": ruc,
                    "empresa": form.empresa.data.strip(),
                    "servicio": form.servicio.data.strip(),
                    "telefono": form.telefono.data.strip(),
                    "email": form.email.data.strip().lower(),
                    "evaluacion": "Pendiente",
                }
            )
            flash("Proveedor registrado correctamente.", "success")
            return redirect(url_for("proveedores"))

    return render_template(
        "formulario_proveedor.html",
        titulo="Nuevo proveedor",
        encabezado="Registrar proveedor",
        form=form,
    )


@app.route("/facturacion")
def facturacion():
    total_facturado = sum(factura["total"] for factura in FACTURAS)
    return render_template(
        "facturacion.html",
        titulo="Facturación",
        facturas=FACTURAS,
        total_facturado=total_facturado,
    )


@app.route("/facturacion/nueva", methods=["GET", "POST"])
def nueva_factura():
    form = FacturacionForm()
    form.cliente.choices = [("", "Seleccione un cliente")] + [
        (cliente["nombre"], cliente["nombre"]) for cliente in CLIENTES
    ]

    if form.validate_on_submit():
        numero = form.numero.data.strip().upper()
        if any(factura["numero"].upper() == numero for factura in FACTURAS):
            form.numero.errors.append("Ya existe una factura registrada con este número.")
        else:
            FACTURAS.append(
                {
                    "numero": numero,
                    "cliente": form.cliente.data,
                    "fecha": form.fecha.data.strftime("%d/%m/%Y"),
                    "total": float(form.total.data),
                    "estado": form.estado.data,
                }
            )
            flash("Factura registrada correctamente.", "success")
            return redirect(url_for("facturacion"))

    return render_template(
        "formulario_facturacion.html",
        titulo="Nueva factura",
        encabezado="Registrar factura",
        form=form,
    )


if __name__ == "__main__":
    app.run(debug=True)

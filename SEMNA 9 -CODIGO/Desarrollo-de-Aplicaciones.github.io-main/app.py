from datetime import date

from flask import Flask, render_template


app = Flask(__name__)


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
        "stock": 25,
        "estado": "Disponible",
    },
]

CLIENTES = [
    {
        "id": "CLI-001",
        "nombre": "Unidad Educativa Montecristi",
        "tipo": "Institución educativa",
        "contacto": "María Zambrano",
        "estado": "Activo",
    },
    {
        "id": "CLI-002",
        "nombre": "Comité Barrial Los Almendros",
        "tipo": "Organización comunitaria",
        "contacto": "José Cedeño",
        "estado": "Activo",
    },
    {
        "id": "CLI-003",
        "nombre": "Mercado Municipal Central",
        "tipo": "Entidad pública",
        "contacto": "Ana Mero",
        "estado": "En revisión",
    },
]

PROVEEDORES = [
    {
        "ruc": "1390012456001",
        "empresa": "TecnoSeguridad Manabí",
        "servicio": "Cámaras y alarmas",
        "telefono": "098 245 7812",
        "evaluacion": "Excelente",
    },
    {
        "ruc": "1792145803001",
        "empresa": "Comunicaciones Ecuador",
        "servicio": "Radios y antenas",
        "telefono": "099 631 4087",
        "evaluacion": "Muy buena",
    },
    {
        "ruc": "1391784502001",
        "empresa": "Movilidad Segura S.A.",
        "servicio": "GPS y mantenimiento",
        "telefono": "096 807 1224",
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
    return {"anio_actual": date.today().year}


@app.route("/")
def index():
    return render_template("index.html", titulo="Inicio")


@app.route("/productos")
def productos():
    return render_template(
        "productos.html",
        titulo="Productos",
        productos=PRODUCTOS,
    )


@app.route("/clientes")
def clientes():
    return render_template(
        "clientes.html",
        titulo="Clientes",
        clientes=CLIENTES,
    )


@app.route("/proveedores")
def proveedores():
    return render_template(
        "proveedores.html",
        titulo="Proveedores",
        proveedores=PROVEEDORES,
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


if __name__ == "__main__":
    app.run(debug=True)

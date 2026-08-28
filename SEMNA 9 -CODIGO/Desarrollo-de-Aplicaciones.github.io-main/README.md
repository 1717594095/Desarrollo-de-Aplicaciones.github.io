# Sistema de Monitoreo y Gestión de Seguridad Ciudadana

Proyecto integrador migrado a Flask. Conserva la página principal informativa y agrega los módulos de Productos, Clientes, Proveedores y Facturación mediante rutas independientes y herencia de plantillas con Jinja2.

## Requisitos

- Python 3.10 o superior
- pip

## Instalación y ejecución

```bash
python -m venv .venv
```

En Windows:

```bash
.venv\Scripts\activate
```

En Linux o macOS:

```bash
source .venv/bin/activate
```

Instale las dependencias y ejecute la aplicación:

```bash
pip install -r requirements.txt
python app.py
```

Abra `http://127.0.0.1:5000` en el navegador.

## Rutas disponibles

- `/` — página principal informativa
- `/productos` — inventario de equipos
- `/clientes` — instituciones y organizaciones atendidas
- `/proveedores` — proveedores tecnológicos
- `/facturacion` — facturas de ejemplo

Los registros mostrados son datos de ejemplo almacenados temporalmente en `app.py`; esta versión no utiliza base de datos.

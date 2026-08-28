# Sistema de Monitoreo y Gestión de Seguridad Ciudadana

Proyecto Integrador desarrollado con Flask y Jinja2. Conserva la página principal informativa y los módulos de Productos, Clientes, Proveedores y Facturación. Esta versión incorpora contenido dinámico, componentes reutilizables y una copia estática para GitHub Pages.

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

## Evidencias de Jinja2

- Variables simples: `{{ titulo }}`, `{{ nombre_sistema }}` y `{{ mensaje_bienvenida }}`.
- Diccionario: `INFORMACION_SISTEMA`, enviado a `index.html` como `informacion`.
- Listas: `PRODUCTOS`, `CLIENTES`, `PROVEEDORES` y `FACTURAS`.
- Bucles: `{% for %}` en los cuatro módulos internos.
- Condicionales: `{% if %}`, `{% else %}` y `{% endif %}` para mostrar productos disponibles, con stock bajo o agotados.
- Filtros: `|upper`, `|length`, `|sum`, `|selectattr` y `|format`.
- Herencia: todas las páginas utilizan `{% extends "base.html" %}`.
- Componentes: `components/navbar.html` y `components/footer.html` se cargan mediante `{% include %}`.

## Publicación de la parte visual en GitHub Pages

GitHub Pages no ejecuta Flask ni Python. Por esta razón, el proyecto incluye `exportar_pages.py`, que genera una versión estática en la carpeta `docs`.

Después de realizar cambios en las plantillas, ejecute:

```bash
python exportar_pages.py
```

Suba todos los cambios a GitHub. En el repositorio ingrese a **Settings → Pages**, seleccione **Deploy from a branch**, elija la rama **main** y la carpeta **/docs**. Finalmente guarde la configuración.

La aplicación Flask se prueba localmente desde `http://127.0.0.1:5000`, mientras que GitHub Pages presenta la copia frontend generada en `docs`.

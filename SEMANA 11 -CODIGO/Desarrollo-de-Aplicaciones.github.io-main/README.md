# Sistema de Monitoreo y Gestión de Seguridad Ciudadana

Proyecto Integrador desarrollado con Flask, Jinja2, Flask-WTF y WTForms. Conserva la página principal informativa y los módulos de Productos, Clientes, Proveedores y Facturación. Esta versión incorpora formularios con validación del servidor y protección CSRF, sin utilizar todavía una base de datos.

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

## Formularios de la Semana 11

La carpeta `forms` contiene una clase independiente para cada módulo:

- `ProductoForm`
- `ClienteForm`
- `ProveedorForm`
- `FacturacionForm`

Todas las clases heredan de `FlaskForm` y utilizan validadores como `DataRequired`, `Length`, `Email`, `NumberRange` y `Regexp`. Las rutas de registro aceptan `GET` y `POST`, verifican los datos mediante `form.validate_on_submit()` y agregan los registros válidos a listas de Python.

Rutas incorporadas:

- `/productos/nuevo`
- `/clientes/nuevo`
- `/proveedores/nuevo`
- `/facturacion/nueva`

Cada plantilla incorpora `form.hidden_tag()` para incluir el token CSRF. La aplicación configura `SECRET_KEY` mediante la variable de entorno `SMGSC_SECRET_KEY` y utiliza una clave local de demostración cuando dicha variable no está definida.

En Windows se puede establecer una clave propia antes de ejecutar:

```bash
set SMGSC_SECRET_KEY=escriba-aqui-una-clave-segura
python app.py
```

En Linux o macOS:

```bash
export SMGSC_SECRET_KEY=escriba-aqui-una-clave-segura
python app.py
```

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

GitHub Pages no ejecuta Flask, Python, Flask-WTF ni validaciones del servidor. Por esta razón, el proyecto incluye `exportar_pages.py`, que genera en `docs` una vista estática de todas las páginas. Los formularios se procesan únicamente al ejecutar Flask localmente.

Después de realizar cambios en las plantillas, ejecute:

```bash
python exportar_pages.py
```

Suba todos los cambios a GitHub. En el repositorio ingrese a **Settings → Pages**, seleccione **Deploy from a branch**, elija la rama **main** y la carpeta **/docs**. Finalmente guarde la configuración.

La aplicación Flask se prueba localmente desde `http://127.0.0.1:5000`, mientras que GitHub Pages presenta la copia frontend generada en `docs`.

"""Genera en docs/ una copia estática compatible con GitHub Pages.

Flask y Jinja2 se utilizan durante la generación. GitHub Pages publica después
los HTML ya renderizados, porque no puede ejecutar aplicaciones Python.
"""

from pathlib import Path
import shutil

from app import app


RUTAS = {
    "/": "index.html",
    "/productos": "productos.html",
    "/productos/nuevo": "formulario_producto.html",
    "/clientes": "clientes.html",
    "/clientes/nuevo": "formulario_cliente.html",
    "/proveedores": "proveedores.html",
    "/proveedores/nuevo": "formulario_proveedor.html",
    "/facturacion": "facturacion.html",
    "/facturacion/nueva": "formulario_facturacion.html",
}


def adaptar_enlaces(html):
    """Convierte las rutas de Flask en enlaces relativos de archivos HTML."""
    for ruta, archivo in sorted(RUTAS.items(), key=lambda elemento: len(elemento[0]), reverse=True):
        html = html.replace(f'href="{ruta}"', f'href="{archivo}"')

    html = html.replace('href="/static/', 'href="static/')
    html = html.replace('src="/static/', 'src="static/')
    html = html.replace("Formulario protegido", "Vista estática del formulario")
    html = html.replace(
        '<form method="POST" novalidate>',
        '<div class="alert alert-warning">La validación Flask-WTF funciona al ejecutar la aplicación localmente.</div>'
        '<form method="GET" action="#" novalidate '
        'onsubmit="event.preventDefault(); window.alert(\'Ejecute Flask localmente para procesar el formulario.\');">',
    )
    return html


def exportar():
    raiz = Path(__file__).resolve().parent
    destino = raiz / "docs"
    static_destino = destino / "static"

    destino.mkdir(exist_ok=True)
    if static_destino.exists():
        shutil.rmtree(static_destino)
    shutil.copytree(raiz / "static", static_destino)

    with app.test_client() as cliente:
        for ruta, archivo in RUTAS.items():
            respuesta = cliente.get(ruta)
            if respuesta.status_code != 200:
                raise RuntimeError(f"La ruta {ruta} respondió con estado {respuesta.status_code}")
            html = adaptar_enlaces(respuesta.get_data(as_text=True))
            (destino / archivo).write_text(html, encoding="utf-8")

    (destino / ".nojekyll").write_text("", encoding="utf-8")
    print(f"Sitio estático generado correctamente en: {destino}")


if __name__ == "__main__":
    exportar()

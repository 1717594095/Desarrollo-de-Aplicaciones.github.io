from flask_wtf import FlaskForm
from wtforms import EmailField, StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length, Regexp


class ProveedorForm(FlaskForm):
    """Formulario reutilizable para registrar o editar proveedores."""

    ruc = StringField(
        "RUC",
        validators=[
            DataRequired(message="El RUC es obligatorio."),
            Length(min=13, max=13, message="El RUC debe contener exactamente 13 dígitos."),
            Regexp(r"^\d{13}$", message="El RUC solo puede contener números."),
        ],
        render_kw={"placeholder": "Ej. 1390012456001", "inputmode": "numeric"},
    )
    empresa = StringField(
        "Nombre de la empresa",
        validators=[
            DataRequired(message="El nombre de la empresa es obligatorio."),
            Length(min=3, max=100, message="El nombre debe tener entre 3 y 100 caracteres."),
        ],
        render_kw={"placeholder": "Ej. Sistemas Seguros S.A."},
    )
    servicio = StringField(
        "Servicio principal",
        validators=[
            DataRequired(message="El servicio es obligatorio."),
            Length(min=3, max=100, message="El servicio debe tener entre 3 y 100 caracteres."),
        ],
        render_kw={"placeholder": "Ej. Instalación de cámaras"},
    )
    telefono = StringField(
        "Teléfono",
        validators=[
            DataRequired(message="El teléfono es obligatorio."),
            Regexp(
                r"^[0-9 +()-]{7,20}$",
                message="Ingrese un número telefónico válido.",
            ),
        ],
        render_kw={"placeholder": "Ej. 098 123 4567"},
    )
    email = EmailField(
        "Correo electrónico",
        validators=[
            DataRequired(message="El correo electrónico es obligatorio."),
            Email(message="Ingrese una dirección de correo válida."),
            Length(max=120, message="El correo no puede superar los 120 caracteres."),
        ],
        render_kw={"placeholder": "ventas@empresa.com"},
    )
    submit = SubmitField("Guardar proveedor")

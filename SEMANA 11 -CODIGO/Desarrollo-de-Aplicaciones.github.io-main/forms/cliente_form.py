from flask_wtf import FlaskForm
from wtforms import EmailField, SelectField, StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length, Regexp


class ClienteForm(FlaskForm):
    """Formulario reutilizable para registrar o editar clientes."""

    identificacion = StringField(
        "Código del cliente",
        validators=[
            DataRequired(message="El código es obligatorio."),
            Length(min=3, max=20, message="El código debe tener entre 3 y 20 caracteres."),
            Regexp(r"^[A-Za-z0-9-]+$", message="Utilice letras, números y guiones."),
        ],
        render_kw={"placeholder": "Ej. CLI-004", "autocomplete": "off"},
    )
    nombre = StringField(
        "Nombre de la institución u organización",
        validators=[
            DataRequired(message="El nombre es obligatorio."),
            Length(min=3, max=100, message="El nombre debe tener entre 3 y 100 caracteres."),
        ],
        render_kw={"placeholder": "Ej. Comité Barrial La Pradera"},
    )
    tipo = SelectField(
        "Tipo de cliente",
        choices=[
            ("", "Seleccione un tipo"),
            ("Institución educativa", "Institución educativa"),
            ("Organización comunitaria", "Organización comunitaria"),
            ("Entidad pública", "Entidad pública"),
            ("Empresa privada", "Empresa privada"),
        ],
        validators=[DataRequired(message="Seleccione el tipo de cliente.")],
    )
    contacto = StringField(
        "Persona de contacto",
        validators=[
            DataRequired(message="La persona de contacto es obligatoria."),
            Length(min=3, max=80, message="El contacto debe tener entre 3 y 80 caracteres."),
        ],
        render_kw={"placeholder": "Nombres y apellidos"},
    )
    email = EmailField(
        "Correo electrónico",
        validators=[
            DataRequired(message="El correo electrónico es obligatorio."),
            Email(message="Ingrese una dirección de correo válida."),
            Length(max=120, message="El correo no puede superar los 120 caracteres."),
        ],
        render_kw={"placeholder": "contacto@ejemplo.com"},
    )
    estado = SelectField(
        "Estado",
        choices=[("Activo", "Activo"), ("En revisión", "En revisión")],
        validators=[DataRequired(message="Seleccione un estado.")],
    )
    submit = SubmitField("Guardar cliente")

from flask_wtf import FlaskForm
from wtforms import IntegerField, SelectField, StringField, SubmitField
from wtforms.validators import DataRequired, InputRequired, Length, NumberRange, Regexp


class ProductoForm(FlaskForm):
    """Formulario reutilizable para registrar o editar productos."""

    codigo = StringField(
        "Código del producto",
        validators=[
            DataRequired(message="El código es obligatorio."),
            Length(min=3, max=20, message="El código debe tener entre 3 y 20 caracteres."),
            Regexp(
                r"^[A-Za-z0-9-]+$",
                message="Utilice únicamente letras, números y guiones.",
            ),
        ],
        render_kw={"placeholder": "Ej. SEG-025", "autocomplete": "off"},
    )
    nombre = StringField(
        "Nombre del producto",
        validators=[
            DataRequired(message="El nombre es obligatorio."),
            Length(min=3, max=80, message="El nombre debe tener entre 3 y 80 caracteres."),
        ],
        render_kw={"placeholder": "Ej. Sensor de movimiento"},
    )
    categoria = SelectField(
        "Categoría",
        choices=[
            ("", "Seleccione una categoría"),
            ("Videovigilancia", "Videovigilancia"),
            ("Comunicación", "Comunicación"),
            ("Movilidad", "Movilidad"),
            ("Emergencia", "Emergencia"),
        ],
        validators=[DataRequired(message="Seleccione una categoría.")],
    )
    stock = IntegerField(
        "Cantidad disponible",
        validators=[
            InputRequired(message="La cantidad es obligatoria."),
            NumberRange(min=0, max=10000, message="El stock debe estar entre 0 y 10 000."),
        ],
        render_kw={"placeholder": "Ej. 10", "min": 0, "max": 10000},
    )
    submit = SubmitField("Guardar producto")

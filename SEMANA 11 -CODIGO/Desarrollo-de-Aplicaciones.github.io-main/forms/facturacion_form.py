from flask_wtf import FlaskForm
from wtforms import DateField, DecimalField, SelectField, StringField, SubmitField
from wtforms.validators import DataRequired, InputRequired, Length, NumberRange, Regexp


class FacturacionForm(FlaskForm):
    """Formulario reutilizable para registrar o editar facturas."""

    numero = StringField(
        "Número de factura",
        validators=[
            DataRequired(message="El número de factura es obligatorio."),
            Length(min=5, max=25, message="El número debe tener entre 5 y 25 caracteres."),
            Regexp(r"^[A-Za-z0-9-]+$", message="Utilice letras, números y guiones."),
        ],
        render_kw={"placeholder": "Ej. FAC-2026-004", "autocomplete": "off"},
    )
    cliente = SelectField(
        "Cliente",
        choices=[],
        validators=[DataRequired(message="Seleccione un cliente.")],
    )
    fecha = DateField(
        "Fecha de emisión",
        format="%Y-%m-%d",
        validators=[DataRequired(message="La fecha es obligatoria.")],
    )
    total = DecimalField(
        "Total",
        places=2,
        validators=[
            InputRequired(message="El valor total es obligatorio."),
            NumberRange(min=0.01, max=1000000, message="El total debe ser mayor a $0,00."),
        ],
        render_kw={"placeholder": "Ej. 1250.50", "min": "0.01", "step": "0.01"},
    )
    estado = SelectField(
        "Estado",
        choices=[("Emitida", "Emitida"), ("Pendiente", "Pendiente"), ("Pagada", "Pagada")],
        validators=[DataRequired(message="Seleccione un estado.")],
    )
    submit = SubmitField("Guardar factura")

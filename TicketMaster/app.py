import mysql.connector
from flask import Flask, render_template, request, redirect, url_for, g, session, Response
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO

app = Flask(__name__)
app.secret_key = 'your_secret_key'

DATABASE = {
    'user': 'root',
    'password': '1234',
    'host': 'localhost',
    'database': 'TicketsCenter'
}

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(**DATABASE)
    return g.db

@app.teardown_appcontext
def close_db(error):
    if 'db' in g:
        g.db.close()

@app.route('/')
def index():
    return render_template('Lobby.html')

@app.route('/Inicio')
def inicio():
    username = session.get('username')
    email = session.get('email')
    return render_template('Lobby.html', username=username, email=email)

@app.route('/Login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if 'login_button' in request.form:
            email = request.form['Inombre']
            password = request.form['Ipsw']
            cursor = get_db().cursor()
            query = "SELECT * FROM Usuario WHERE Correo = %s"
            cursor.execute(query, (email,))
            user = cursor.fetchone()
            if user and user[3] == password:
                session['username'] = user[1]  # Nombre de usuario
                session['email'] = user[2]  # Correo electrónico
                return redirect(url_for('inicio'))
            else:
                error = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
                return render_template('Login.html', error=error)
        elif 'register_button' in request.form:
            username = request.form['nombre']
            email = request.form['correo']
            password = request.form['psw']
            cursor = get_db().cursor()
            query = "INSERT INTO Usuario (Nombre, Correo, Contraseña) VALUES (%s, %s, %s)"
            cursor.execute(query, (username, email, password))
            get_db().commit()
            session['username'] = username
            session['email'] = email
            return redirect(url_for('inicio'))
    return render_template('Login.html')

@app.route('/Cine', methods=['POST', 'GET'])
def cine():
    if request.method == 'POST':
        # Obtener los datos del formulario
        cine = request.form['cine']
        pelicula = request.form['pelicula']
        tipo_asiento = request.form['asiento']
        cantidad_boletos = request.form['cantBoleto']
        costo_total = request.form['Costototal']

        numtarjeta = request.form['numtarjeta']
        nombre_tarjeta = request.form['nombre_tarjeta']
        FechaExpiracion = request.form['FechaExpiracion']
        codigo_seguridad = request.form['codigo_seguridad']
        
        
        # Redirigir al usuario a la vista 'ticket' con los datos como parámetros en la URL
        return redirect(url_for('ticket', cine=cine, pelicula=pelicula, tipo_asiento=tipo_asiento, cantidad_boletos=cantidad_boletos, costo_total=costo_total,
                                numtarjeta=numtarjeta, nombre_tarjeta=nombre_tarjeta, FechaExpiracion=FechaExpiracion, codigo_seguridad=codigo_seguridad))
    return render_template('ComprarCine.html')

@app.route('/Teatro', methods=['POST', 'GET'])
def teatro():
    return render_template('ComprarTeatro.html')

@app.route('/Museo', methods=['POST', 'GET'])
def Museo():
    return render_template('ComprarMuseo.html')
    
@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('email', None)
    return redirect(url_for('inicio'))

@app.route('/ticket')
def ticket():
    # Obtener los datos de la URL
    cine = request.args.get('cine')
    pelicula = request.args.get('pelicula')
    tipo_asiento = request.args.get('asiento')
    cantidad_boletos = request.args.get('boleto')
    costo_total = request.args.get('Costototal')

    numtarjeta = request.args.get('numtarjeta')
    nombre_tarjeta = request.args.get('nombre_tarjeta')
    FechaExpiracion = request.args.get('FechaExpiracion')
    codigo_seguridad = request.args.get('codigo_seguridad')  

    # Pasar los datos a la plantilla ticket.html
    return render_template('ticket.html', cine=cine, pelicula=pelicula, tipo_asiento=tipo_asiento, cantidad_boletos=cantidad_boletos, costo_total=costo_total, numtarjeta=numtarjeta, nombre_tarjeta=nombre_tarjeta, FechaExpiracion=FechaExpiracion, codigo_seguridad=codigo_seguridad)


@app.route('/generar_pdf/<cine>/<pelicula>/<tipo_asiento>/<cantidad_boletos>/<costo_total>/<numtarjeta>/<nombre_tarjeta>/<FechaExpiracion>/<codigo_seguridad>')
def generar_pdf(cine, pelicula, tipo_asiento, cantidad_boletos, costo_total, numtarjeta, nombre_tarjeta, FechaExpiracion, codigo_seguridad):
    # Crear un objeto BytesIO para almacenar el PDF
    buffer = BytesIO()

    # Crear el documento PDF
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    
    # Estilos para el documento
    styles = getSampleStyleSheet()
    
    # Agregar el contenido al PDF
    contenido = []

    # Agregar el encabezado del ticket
    contenido.append(Paragraph("Ticket de Compra", styles['Title']))
    
    # Agregar cada dato del ticket como un párrafo al contenido del PDF
    contenido.append(Paragraph(f"<strong>Cine:</strong> {cine}", styles['Normal']))
    contenido.append(Paragraph(f"<strong>Película:</strong> {pelicula}", styles['Normal']))
    contenido.append(Paragraph(f"<strong>Tipo de Asiento:</strong> {tipo_asiento}", styles['Normal']))
    contenido.append(Paragraph(f"<strong>Cantidad de Boletos:</strong> {cantidad_boletos}", styles['Normal']))
    contenido.append(Paragraph(f"<strong>Costo Total:</strong> ${costo_total}", styles['Normal']))
    contenido.append(Paragraph("Metodo de Pago - Tarjeta de credito", styles['Title']))
    contenido.append(Paragraph(f"<strong>Numero de Tarjeta:</strong> {numtarjeta}", styles['Normal']))
    contenido.append(Paragraph(f"<strong>Nombre del propietario de la tarjeta:</strong> {nombre_tarjeta}", styles['Normal']))
    contenido.append(Paragraph(f"<strong>Fecha de expiracion:</strong> {FechaExpiracion}", styles['Normal']))
    contenido.append(Paragraph(f"<strong>Codigo de seguridad:</strong> {codigo_seguridad}", styles['Normal']))
    contenido.append(Paragraph("Gracias por su compra", styles['Title']))

    # Construir el PDF
    doc.build(contenido)
    
    # Obtener el contenido del buffer y devolverlo como una respuesta PDF
    buffer.seek(0)
    return Response(buffer, mimetype='application/pdf', headers={'Content-Disposition': 'attachment; filename=ticket.pdf'})

if __name__ == '__main__':
    app.run(debug=True)

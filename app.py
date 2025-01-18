from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def form():
    return render_template('forms.html')

@app.route('/hello', methods=['POST'])
def hello():
    username = request.form.get('username')
    user_mail = request.form.get('user_mail')
    mensagem_usuario = request.form.get('mensagem_usuario')

    return render_template(
        'greeting.html', 
        username=username, 
        user_mail=user_mail, 
        mensagem_usuario=mensagem_usuario
    )

if __name__ == "__main__":
    app.run(debug=True)
const MensagemDeErro = (arg1) => {
    let mensagem = "";
    
    if (arg1 == 1) {
        mensagem = "E-mail incorreto!";
    } else if (arg1 == 2) {
        mensagem = "Senha incorreta!";
    }

    let erroExistente = document.getElementById("mensagem-erro");
    if (!erroExistente) {
        let incorrect_email = document.createElement('div');
        incorrect_email.id = "mensagem-erro";
        incorrect_email.style.position = "fixed";
        incorrect_email.style.bottom = "10px";
        incorrect_email.style.left = "10px";
        incorrect_email.style.fontSize = "12px";
        incorrect_email.style.color = "#fff";
        incorrect_email.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
        incorrect_email.style.padding = "8px";
        incorrect_email.style.borderRadius = "5px";
        incorrect_email.style.zIndex = "1000";
        document.body.appendChild(incorrect_email);
        erroExistente = incorrect_email;
    }

    erroExistente.innerText = mensagem;
};

document.getElementById("login-button").addEventListener("click", function(event) {
    event.preventDefault();

    const usernameEmail = document.getElementById('exampleInputEmail');
    const password = document.getElementById('exampleInputPassword');

    if (!usernameEmail || !password) {
        console.error("Elementos não encontrados! Verifique os IDs.");
        return; 
    }

    if (usernameEmail.value.trim() === "") {
        MensagemDeErro(1);
        return;
    } 
    
    if (password.value.trim() === "") {
        MensagemDeErro(2);
        return;
    }

    console.log("Login válido. Carregando a página de usuário.");
});

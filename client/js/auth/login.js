const form = document.getElementById("form")

form.addEventListener("submit", async(e) => {
    e.preventDefault()
const data = {
    email: document.getElementById("gmail").value,
    password: document.getElementById("senha").value
}

const response = await fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
})

const result = await response.json();

if(result.erro === false){
    alert('Login realizado! Bem vindo')
    localStorage.setItem('usuarioLogado', JSON.stringify(result.user));
    localStorage.setItem('token', result.token);
    
    window.location.href = "/html/pages/dashboard.html";
    return;
} 
else if(result.user === false){
    alert('Usuario não encontrado')
}
else if(result.password === false){
    alert('Senha incorreta.')
}
else{
    alert('Algo deu errado.')
}
}) 

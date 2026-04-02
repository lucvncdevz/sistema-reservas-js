const form = document.getElementById("form")

form.addEventListener("submit", async(e) => {
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
    window.location.href = "/pages/dashboard.html";
}else{
    alert('Ops, Algo deu errado a logar')
}

}) 
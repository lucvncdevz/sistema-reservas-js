const form = document.getElementById("formSingUp");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("e-mail").value,
    cpf: document.getElementById("cpf").value,
    password: document.getElementById("password").value,
  }; 

  const response = await fetch("/singup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if(result.erro === true) {
    alert("Erro ao cadastrar usuário: ");
  } else {
    alert("Usuário cadastrado com sucesso!");
    localStorage.setItem('usuarioLogado', JSON.stringify(result.user));
    window.location.href = "/html/pages/dashboard.html";
  }

  // console.log(result.erro);
});

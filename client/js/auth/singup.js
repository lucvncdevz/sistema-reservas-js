const form = document.getElementById("formSingUp");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("e-mail").value,
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

  console.log(result.erro);
});

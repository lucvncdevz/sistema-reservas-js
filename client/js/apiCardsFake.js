const container = document.querySelector(".cards-container");

fetch("/data/dadosPopulares.json")
  .then((res) => res.json())
  .then((salasPopulares) => {
    salasPopulares.forEach((sala, i) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${sala.nome}</h3>
        <p><strong>Capacidade:</strong> ${sala.capacidade} pessoas</p>
        <p><strong>Valor/h:</strong> R$ ${sala.valor}</p>
        <p>${sala.descricao}</p>
        <button onclick="AddCardsToMyReservs(${i})">Fazer Reserva</button>
      `;

      container.appendChild(card);
    });
  });

function AddCardsToMyReservs(index) {
  alert("Sala selecionada:", index);
}
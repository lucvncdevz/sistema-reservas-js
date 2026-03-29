let lista_cards = document.querySelector(".card-container");

fetch("/client/data/dados.json")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    data.map((cards, i) => {
      let card = document.createElement("div");
      card.classList.add("card");
    //console.log(cards)

      card.innerHTML = `
     <h3>${cards.nome}</h3>
     <p><strong>Capacidade:</strong> ${cards.capacidade} pessoas</p>
     <p><strong>Valor/h:</strong> R$ ${cards.valor}</p>
     <p>${cards.descricao}</p>
     <button onClick="AddCardsToMyReservs(${cards,i})">Fazer Reserva</button>
  `;
      lista_cards.appendChild(card);
    });
  });

function AddCardsToMyReservs(cards, index) {
    alert("Sala selecionada:", index);
}

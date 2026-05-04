let lista_cards = document.querySelector(".card-container");

// Busca as salas e cria os cards
fetch("/api/salas")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((sala) => {
      let card = document.createElement("div");
      card.classList.add("card");

      // Passa o ID da sala para a função do modal
      card.setAttribute("onclick", `AddCardsToMyReservs(${sala.id})`);

      card.innerHTML = `
        <h3>${sala.nome}</h3>
        <p><strong>Capacidade:</strong> ${sala.capacidade} pessoas</p>
        <p><strong>Valor/h:</strong> R$ ${sala.valor}</p>
        <p>${sala.descricao || "Sem descrição"}</p>
      `;
      lista_cards.appendChild(card);
    });
  });

// Função que abre o Modal com Formulário
function AddCardsToMyReservs(id) {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  overlay.id = "overlay-modal";

  const modal = document.createElement("div");
  modal.classList.add("modal-content");

  modal.innerHTML = `
    <h2>Reservar Sala #${id}</h2>
    
    <div class="form-reserva">
      <div class="form-group">
        <label for="data-reserva">Data:</label>
        <input type="date" id="data-reserva">
      </div>
      
      <div class="form-group">
        <label for="hora-inicio">Início:</label>
        <input type="time" id="hora-inicio">
      </div>

      <div class="form-group">
        <label for="hora-fim">Término:</label>
        <input type="time" id="hora-fim">
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn" id="btn-confirmar">Confirmar Reserva</button>
      <button class="btn" id="btn-cancelar">Cancelar</button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Função para fechar
  const fecharModal = () => document.body.removeChild(overlay);

  // Evento Cancelar
  document.getElementById("btn-cancelar").onclick = fecharModal;

  // Evento Confirmar (Captura os dados do formulário)
  document.getElementById("btn-confirmar").onclick = () => {
    const dadosReserva = {
      sala_id: id,
      data: document.getElementById("data-reserva").value,
      inicio: document.getElementById("hora-inicio").value,
      fim: document.getElementById("hora-fim").value
    };

    if (!dadosReserva.data || !dadosReserva.inicio || !dadosReserva.fim) {
      alert("Por favor, preencha todos os campos do horário!");
      return;
    }

    console.log("Dados prontos para o banco:", dadosReserva);
    alert(`Reserva da sala ${id} solicitada para o dia ${dadosReserva.data}!`);
    
    fecharModal();
  };

  // Fechar ao clicar fora da caixa branca
  overlay.onclick = (e) => {
    if (e.target.id === "overlay-modal") fecharModal();
  };
}
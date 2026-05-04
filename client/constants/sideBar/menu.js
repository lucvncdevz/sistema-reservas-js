const menuHTML = `
    <header>
      <a class="botao-abrir" href="#" onclick="AbrirMenu()">☰ Abrir</a>
    </header>

    <nav id="menu">
      <a href="#" onclick="FecharMenu()">&times; Fechar</a>
      <a href="/pages/dashboard.html">Dashboard</a>
      <a href="/pages/agendarReserva.html">Agendar Reserva</a>
      <a href="#">Minhas Reservas</a>
      <a href="#">Perfil</a>
      <a style="color: red;" href="#">Sair da conta</a>
    </nav>
`;

// Insere o menu no início do body
document.body.insertAdjacentHTML('afterbegin', menuHTML);

// Funções de controle
function AbrirMenu() {
  document.getElementById("menu").style.width = "250px";
  document.getElementById("conteudo").style.marginLeft = "250px";
}

function FecharMenu() {
  document.getElementById("menu").style.width = "0px";
  document.getElementById("conteudo").style.marginLeft = "0px";
}
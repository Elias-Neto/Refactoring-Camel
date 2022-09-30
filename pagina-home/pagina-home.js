/* === HEADER OF PAGE ================================*/
function openMenu() {
  document.body.classList.add('menu-expanded')
}

function closeMenu() {
  document.body.classList.remove('menu-expanded')
}

let isOpen = false;

function menu() {
  if (isOpen) {
    closeMenu()
    isOpen = false
  } else {
    openMenu()
    isOpen = true
  }
}

//Sumir menu quando click fora do element
document.addEventListener('click', function clicar(event) {
  const menu = document.getElementById('menu');
  const botao = document.getElementById('botaoclose');
  let click = event.target; 
  if (!menu.contains(event.target) && !click.contains(botao)) {
    document.body.classList.remove('menu-expanded');
  }
})

/* === PÁGINA HOME ================================*/
$('.carousel').carousel({
  interval: 5000
})
// --- ELEMENTOS DO PERFIL & MODAL ---
const modalPerfil = document.getElementById('modal-perfil');
const formPerfil = document.getElementById('form-perfil');
const btnEditarPerfil = document.getElementById('btn-editar-perfil');

const inputPerfilNome = document.getElementById('perfil-nome');
const inputPerfilGenero = document.getElementById('perfil-genero');
const inputPerfilLivroFav = document.getElementById('perfil-livro-fav');
const inputPerfilAutorFav = document.getElementById('perfil-autor-fav');

const exibirNome = document.getElementById('exibir-nome');
const exibirGenero = document.getElementById('exibir-genero');
const exibirLivroFav = document.getElementById('exibir-livro-fav');
const exibirAutorFav = document.getElementById('exibir-autor-fav');

// --- ELEMENTOS DA LISTA DE LIVROS ---
const formLivro = document.getElementById('form-livro');
const inputTitulo = document.getElementById('titulo');
const inputAutor = document.getElementById('autor');
const listaLivros = document.getElementById('lista-livros');

// --- ESTADO INICIAL ---
let perfil = JSON.parse(localStorage.getItem('perfil_leitor')) || null;
let livros = JSON.parse(localStorage.getItem('livros_leitor')) || [];

// --- INICIALIZAÇÃO DA PÁGINA ---
function iniciarApp() {
  if (!perfil) {
    // Se não houver perfil salvo, abre a janela de login/cadastro
    modalPerfil.classList.remove('hidden');
  } else {
    renderizarPerfil();
  }
  renderizarLivros();
}

// --- GERENCIAMENTO DO PERFIL ---
formPerfil.addEventListener('submit', function(event) {
  event.preventDefault();

  perfil = {
    nome: inputPerfilNome.value,
    genero: inputPerfilGenero.value,
    livroFav: inputPerfilLivroFav.value,
    autorFav: inputPerfilAutorFav.value
  };

  localStorage.setItem('perfil_leitor', JSON.stringify(perfil));
  modalPerfil.classList.add('hidden');
  renderizarPerfil();
});

btnEditarPerfil.addEventListener('click', function() {
  if (perfil) {
    inputPerfilNome.value = perfil.nome;
    inputPerfilGenero.value = perfil.genero;
    inputPerfilLivroFav.value = perfil.livroFav;
    inputPerfilAutorFav.value = perfil.autorFav;
  }
  modalPerfil.classList.remove('hidden');
});

function renderizarPerfil() {
  if (perfil) {
    exibirNome.textContent = perfil.nome.startsWith('@') ? perfil.nome : `@${perfil.nome}`;
    exibirGenero.textContent = perfil.genero;
    exibirLivroFav.textContent = perfil.livroFav;
    exibirAutorFav.textContent = perfil.autorFav;
  }
}

// --- GERENCIAMENTO DA LISTA DE LIVROS ---
formLivro.addEventListener('submit', function(event) {
  event.preventDefault();

  const novoLivro = {
    id: Date.now(),
    titulo: inputTitulo.value,
    autor: inputAutor.value,
    lido: false
  };

  livros.push(novoLivro);
  salvarERenderizarLivros();

  inputTitulo.value = '';
  inputAutor.value = '';
});

function renderizarLivros() {
  listaLivros.innerHTML = '';

  livros.forEach(livro => {
    const li = document.createElement('li');
    if (livro.lido) li.classList.add('lido');

    li.innerHTML = `
      <div class="info">
        <strong>${livro.titulo}</strong>
        <small>${livro.autor}</small>
      </div>
      <div class="acoes">
        <button class="btn-status" onclick="alternarStatus(${livro.id})">
          ${livro.lido ? 'Lido' : 'Marcar Lido'}
        </button>
        <button class="btn-remover" onclick="removerLivro(${livro.id})">Excluir</button>
      </div>
    `;

    listaLivros.appendChild(li);
  });
}

function alternarStatus(id) {
  livros = livros.map(livro => {
    if (livro.id === id) return { ...livro, lido: !livro.lido };
    return livro;
  });
  salvarERenderizarLivros();
}

function removerLivro(id) {
  livros = livros.filter(livro => livro.id !== id);
  salvarERenderizarLivros();
}

function salvarERenderizarLivros() {
  localStorage.setItem('livros_leitor', JSON.stringify(livros));
  renderizarLivros();
}

// Executa ao carregar a página
iniciarApp();
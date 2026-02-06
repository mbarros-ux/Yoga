document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modalInscricao');
  const spanClose = document.querySelector('.close');
  const formInscricao = document.getElementById('formInscricao');

  const mensagemErro = document.createElement('div');
  mensagemErro.style.color = 'red';
  mensagemErro.style.marginTop = '0.5rem';
  mensagemErro.style.fontSize = '0.9em';
  mensagemErro.id = 'mensagem-erro-modal';
  mensagemErro.style.display = 'none';
  formInscricao.appendChild(mensagemErro);

  function exibirErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.style.display = 'block';
  }

  function ocultarErro() {
    mensagemErro.style.display = 'none';
    mensagemErro.textContent = '';
  }

  function abrirModal() {
    modal.style.display = 'block';
    ocultarErro();
  }

  function fecharModal() {
    modal.style.display = 'none';
    formInscricao.reset();
    ocultarErro();
  }

  const botoesAbrirModal = document.querySelectorAll('.plano-btn');
  botoesAbrirModal.forEach(function (botao) {
    botao.addEventListener('click', function (event) {
      event.preventDefault();
      abrirModal();
    });
  });

  spanClose.addEventListener('click', fecharModal);
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      fecharModal();
    }
  });

  formInscricao.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    const aulaSelect = document.getElementById('aula');
    const cursoSelect = document.getElementById('curso');
    const planoSelect = document.getElementById('plano');

    const aula = aulaSelect.value;
    const curso = cursoSelect.value;
    const plano = planoSelect.value;

    const indiceAula = aulaSelect.selectedIndex;
    const indiceCurso = cursoSelect.selectedIndex;
    const indicePlano = planoSelect.selectedIndex;

    const primeiroValorAula = aulaSelect.options[0].value;
    const primeiroValorCurso = cursoSelect.options[0].value;
    const primeiroValorPlano = planoSelect.options[0].value;

    if (!nome) {
      exibirErro("Por favor, preencha o campo Nome.");
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !regexEmail.test(email)) {
      exibirErro("Por favor, insira um endereço de email válido.");
      return;
    }

    const aulaNaoSelecionada = (indiceAula === 0 && primeiroValorAula === "");
    const cursoNaoSelecionado = (indiceCurso === 0 && primeiroValorCurso === "");
    const planoNaoSelecionado = (indicePlano === 0 && primeiroValorPlano === "");

    if (aulaNaoSelecionada || cursoNaoSelecionado || planoNaoSelecionado) {
      let camposFaltando = [];
      if (aulaNaoSelecionada) camposFaltando.push('Aula');
      if (cursoNaoSelecionado) camposFaltando.push('Curso');
      if (planoNaoSelecionado) camposFaltando.push('Plano');

      let mensagem = `Por favor, selecione uma opção para: ${camposFaltando.join(', ')}.`;
      exibirErro(mensagem);
      return;
    }

    ocultarErro();

    const tipoAula = 'Aula';
    const itemAula = aulaSelect.options[indiceAula].text;
    const tipoCurso = 'Curso';
    const itemCurso = cursoSelect.options[indiceCurso].text;
    const tipoPlano = 'Plano';
    const itemPlano = planoSelect.options[indicePlano].text;

    console.log("Dados para envio:");
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Telefone:", telefone || 'Não informado');
    console.log("Tipo de Inscrição (Aula):", tipoAula);
    console.log("Item Selecionado (Aula):", itemAula);
    console.log("Tipo de Inscrição (Curso):", tipoCurso);
    console.log("Item Selecionado (Curso):", itemCurso);
    console.log("Tipo de Inscrição (Plano):", tipoPlano);
    console.log("Item Selecionado (Plano):", itemPlano);

    alert(`Obrigado, ${nome}! Sua inscrição para Aula "${itemAula}", Curso "${itemCurso}" e Plano "${itemPlano}" foi recebida. Em breve entraremos em contato.`);

    fecharModal();
    formInscricao.reset();
  });
});
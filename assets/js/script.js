document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('modalOverlay');
    const btnFecharX = document.getElementById('modalFechar');
    const btnFechar = document.getElementById('modalFecharBtn');
    const telaBoasVindas = document.getElementById('telaBoasVindas');
    const telaFeedback = document.getElementById('telaFeedback');
    const btnAbrirFeedback = document.getElementById('btnAbrirFeedback');
    const btnVoltarFeedback = document.getElementById('btnVoltarFeedback');
    const formFeedback = document.getElementById('formFeedback');
    const feedbackStatus = document.getElementById('feedbackStatus');
    const btnEnviarFeedback = document.getElementById('btnEnviarFeedback');
    const btnFeedbackFooter = document.getElementById('btnFeedbackFooter');

    function abrirModal() {
        document.body.style.overflow = 'hidden';
        overlay.classList.add('modal-visivel');
    }

    function fecharModal() {
        overlay.classList.remove('modal-visivel');
        document.body.style.overflow = '';
    }

    function mostrarTela(tela) {
        telaBoasVindas.classList.add('modal-tela-oculta');
        telaFeedback.classList.add('modal-tela-oculta');
        tela.classList.remove('modal-tela-oculta');
    }

    // pequena espera para a animação de entrada ficar suave
    setTimeout(abrirModal, 300);

    btnFecharX.addEventListener('click', fecharModal);
    btnFechar.addEventListener('click', fecharModal);

    btnAbrirFeedback.addEventListener('click', function () {
        mostrarTela(telaFeedback);
    });

    btnVoltarFeedback.addEventListener('click', function () {
        mostrarTela(telaBoasVindas);
    });

    // botão "Enviar Feedback" no rodapé: abre o modal já na tela do formulário
    btnFeedbackFooter.addEventListener('click', function () {
        mostrarTela(telaFeedback);
        abrirModal();
    });

    // fecha clicando fora da caixa (no fundo escuro)
    overlay.addEventListener('click', function (evento) {
        if (evento.target === overlay) {
            fecharModal();
        }
    });

    // fecha com a tecla Esc
    document.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape' && overlay.classList.contains('modal-visivel')) {
            fecharModal();
        }
    });

    // envio do formulário de feedback sem sair da página
    formFeedback.addEventListener('submit', async function (evento) {
        evento.preventDefault();
        btnEnviarFeedback.disabled = true;
        btnEnviarFeedback.textContent = 'Enviando...';
        feedbackStatus.textContent = '';
        feedbackStatus.className = 'modal-status';

        try {
            const resposta = await fetch(formFeedback.action, {
                method: 'POST',
                body: new FormData(formFeedback),
                headers: { 'Accept': 'application/json' }
            });

            if (resposta.ok) {
                feedbackStatus.textContent = 'Obrigado! Sua mensagem foi enviada com sucesso. 🙌';
                feedbackStatus.classList.add('sucesso');
                formFeedback.reset();
            } else {
                feedbackStatus.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
                feedbackStatus.classList.add('erro');
            }
        } catch (erro) {
            feedbackStatus.textContent = 'Erro de conexão. Verifique sua internet e tente novamente.';
            feedbackStatus.classList.add('erro');
        } finally {
            btnEnviarFeedback.disabled = false;
            btnEnviarFeedback.textContent = 'Enviar';
        }
    });
});
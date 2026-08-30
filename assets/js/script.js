document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('modalOverlay');
    const btnFecharX = document.getElementById('modalFechar');
    const btnFechar = document.getElementById('modalFecharBtn');

    function abrirModal() {
        document.body.style.overflow = 'hidden';
        overlay.classList.add('modal-visivel');
    }

    function fecharModal() {
        overlay.classList.remove('modal-visivel');
        document.body.style.overflow = '';
    }

    // pequena espera para a animação de entrada ficar suave
    setTimeout(abrirModal, 300);

    btnFecharX.addEventListener('click', fecharModal);
    btnFechar.addEventListener('click', fecharModal);

    // fecha também clicando fora da caixa (no fundo escuro)
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
});

let modal = document.querySelector('.modal');
let modalText = document.getElementById('modal-text');
let modalButton = document.getElementById('modal-button');
let nextHandler = null;

let confettiCanvas = document.getElementById('confetti-canvas');   
const confettiCall = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true
});

export { showModal };

function showModal(passed, nextLevel) {
    modalText.textContent = '';
    nextHandler = nextLevel;
    modalButton.textContent = '';
    if (passed) {
        modalText.textContent = 'Level Completed!';
        modalButton.textContent = 'NEXT LEVEL'; 
        confettiCall({
            particleCount: 1200,
            spread: 200,
            origin: { y: 0.6 },
        });
    }

    else {
        modalText.textContent = 'Level Failed!';
        modalButton.textContent = 'TRY AGAIN';
    }
    modal.style.display = 'grid';
    
    modalButton.addEventListener('click', function () {
        hideModal();
        if (nextHandler) {
            nextHandler();
            nextHandler = null; // reset nextHandler to prevent multiple calls
        }

    });
}
function hideModal() {
    modal.style.display = 'none';
}
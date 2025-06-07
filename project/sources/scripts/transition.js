
const modal = document.querySelector('.modal');
const modalText = document.getElementById('modal-text');
const modalButton = document.getElementById('modal-button');
let nextHandler = null;

export { showModal };

function showModal(passed, nextLevel) {
    modalText.textContent = '';
    nextHandler = nextLevel;
    modalButton.textContent = '';
    if (passed) {
        modalText.textContent = 'Level Completed!';
        modalButton.textContent = 'NEXT LEVEL'; 
    }

    else {
        modalText.textContent = 'Level Failed!';
        modalButton.textContent = 'TRY AGAIN';
    }
    modal.style.display = "grid";
    
    modalButton.addEventListener('click', function() {
        hideModal();
        if (nextHandler) {
            nextHandler();
            nextHandler = null; // reset nextHandler to prevent multiple calls
        }

    });
}
function hideModal() {
    modal.style.display = "none";
}
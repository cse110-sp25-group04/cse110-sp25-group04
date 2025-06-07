
const modal = document.querySelector('.modal');
const modalText = document.getElementById('modal-text');
const modalButton = document.getElementById('modal-button');

export { showModal };

function showModal(passed, nextLevel) {
    modalText.textContent = '';
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
        if (typeof nextLevel === 'function') {
            nextLevel();
        }
    });
}
function hideModal() {
    modal.style.display = "none";
}
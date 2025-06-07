const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-text');
const modalButton = document.querySelector('.modal-button');


export function showModal(passed) {
    if (passed) {
        modalText.textContent = 'Level Completed!';
        modalButton.textContent = 'NEXT LEVEL';
    }

    else {
        modalText.textContent = 'Level Failed!';
        modalButton.textContent = 'TRY AGAIN';
    }
    modal.classList.add('visible');
    modal.classList.remove('hidden');
}

export function hideModal() {
    modal.classList.remove('visible');
    // Ensure the modal is hidden after the transition
    window.setTimeout(function() {
        modal.classList.add('hidden');
    }, 300);
}

modalButton.addEventListener('click', function() {
    hideModal();
})
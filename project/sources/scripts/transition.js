/**
 * @param {string} modalSelector - The HTML selector for the modal element. (.modal)
 * @param {string} textSelector - The HTML selector for the text element inside the modal. (#modal-text)
 * @param {string} buttonSelector - The HTML selector for the button element inside the modal. (#modal-button)  
 */
class Modal {
    constructor(modalSelector, textSelector, buttonSelector) {
        // Initializes the modal with the provided selectors for the modal, text, and button elements.
        this.modal = document.querySelector(modalSelector);
        this.modalText = document.querySelector(textSelector);
        this.modalButton = document.querySelector(buttonSelector);
        this.nextHandler = null;

        this.modalButton.addEventListener('click', () => {
            this.hide();
            if (this.nextHandler) {
                this.nextHandler();
                this.nextHandler = null; // reset nextHandler to prevent multiple calls
            }
        });
    }

    /**
     * Displays the modal overlay with the appropriate message and button text.
     * @param {boolean} passed - Indicates if the level was completed or failed.
     * @param {function} nextLevel - Function to call back when the modal button is clicked.
     * @returns n/a
     */
    show(passed, nextLevel) {
        this.nextHandler = nextLevel;
        if (passed) {
            this.modalText.textContent = 'Level Completed!';
            this.modalButton.textContent = 'NEXT LEVEL'; 
        }
        else {
            this.modalText.textContent = 'Level Failed!';
            this.modalButton.textContent = 'TRY AGAIN';
        }
        this.modal.style.display = 'grid';
    }

    /**
     * Function to hide the modal overlay.
     * 
     * @returns n/a
     */
    hide() {
        this.modal.style.display = 'none';
    }
}

export default Modal;
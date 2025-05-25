class DragAndDropManager {
    constructor(handCells, gridCells) {
        // Properties (was global vars)
        this.draggedElement = null;
        this.initialMouseX = 0;
        this.initialMouseY = 0;
        this.initialElementLeft = 0;
        this.initialElementTop = 0;
        this.originalParentCell = null;
        this.currentDropTarget = null;
        this.latestMouseX = 0;
        this.latestMouseY = 0;
        this.animationFrameId = null;
        this.isTransitioning = false;

        // Store drop targets
        this.dropTargets = [...handCells, ...gridCells];

        // Bind methods to 'this' to ensure correct context
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.updatePositionAndCheckTargets = this.updatePositionAndCheckTargets.bind(this);

        // Set up event listener
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * Function to handle when dragging an element across the board
     * 
     * @param {*} event 
     * @returns n/a
     */
    handleMouseDown(event) {
        if (event.button !== 0 || this.isTransitioning) return;

        this.draggedElement = event.target.closest('.card');
        if (!this.draggedElement || 
            (this.draggedElement.parentElement && this.draggedElement.parentElement.classList.contains('grid-cell')) ||
            this.draggedElement.classList.contains('locked')) {
            return;
        }

        event.preventDefault();

        this.#updateMouse(event);

        //maintain styling
        this.#updateStyle();

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);

        this.animationFrameId = requestAnimationFrame(this.updatePositionAndCheckTargets);
    }

    handleMouseMove(event) {
        this.latestMouseX = event.clientX;
        this.latestMouseY = event.clientY;
        if (this.animationFrameId === null) {
            this.animationFrameId = requestAnimationFrame(this.updatePositionAndCheckTargets);
        }
    }

    /**
     * Function to update the targets elements while dragging a card
     * 
     * @returns n/a
     */
    updatePositionAndCheckTargets() {
        if (!this.draggedElement) {
            this.animationFrameId = null;
            return;
        }

        try {
            const deltaX = this.latestMouseX - this.initialMouseX;
            const deltaY = this.latestMouseY - this.initialMouseY;

            this.draggedElement.style.left = `${this.initialElementLeft + deltaX}px`;
            this.draggedElement.style.top = `${this.initialElementTop + deltaY}px`;

            const cardRect = this.draggedElement.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            let hoveredTarget = null;
            this.dropTargets.forEach(function (target) {
                const targetRect = target.getBoundingClientRect();
                if (cardCenterX > targetRect.left && cardCenterX < targetRect.right &&
                    cardCenterY > targetRect.top && cardCenterY < targetRect.bottom) {
                    hoveredTarget = target;
                }
            });

            if (hoveredTarget !== this.currentDropTarget) {
                if (this.currentDropTarget) {
                    this.currentDropTarget.classList.remove('drag-over');
                }

                if (hoveredTarget) {
                    const hasCard = hoveredTarget.querySelector('.card');
                    if (!hasCard || hoveredTarget === this.originalParentCell) {
                        hoveredTarget.classList.add('drag-over');
                        this.currentDropTarget = hoveredTarget;
                    } else {
                        this.currentDropTarget = null;
                    }
                } else {
                    this.currentDropTarget = null;
                }
            }
        } catch (error) {
            this.resetState();
            return;
        }

        if (this.draggedElement) {
            this.animationFrameId = requestAnimationFrame(this.updatePositionAndCheckTargets);
        } else {
            this.animationFrameId = null;
        }
    }

    /**
     * Function to handle the functionality when dropping an element on the page.
     * 
     * @returns n/a
     */
    handleMouseUp() {
        if (!this.draggedElement) return;

        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;

        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);

        this.draggedElement.classList.remove('dragging');
        if (this.currentDropTarget) {
            this.currentDropTarget.classList.remove('drag-over');
        }

        if (this.currentDropTarget && (!this.currentDropTarget.querySelector('.card') || this.currentDropTarget === this.originalParentCell)) {
            //removes card from parent cell and updates state of parent
            if (this.originalParentCell && this.originalParentCell !== this.currentDropTarget) {
                this.originalParentCell.removeChild(this.draggedElement);
                this.originalParentCell.classList.remove('has-card');
            }

            this.#addChild();
        } else {
            this.handleTransition();
        }
    }

    //helper function to reset state
    resetState() {
        this.draggedElement = null;
        this.originalParentCell = null;
        this.currentDropTarget = null;
        this.animationFrameId = null;
    }

    //update mouse positions
    #updateMouse(event) {
        this.initialMouseX = event.clientX;
        this.initialMouseY = event.clientY;
        this.latestMouseX = event.clientX;
        this.latestMouseY = event.clientY;
    }

    //add card to gridcell
    #addChild() {
        this.currentDropTarget.appendChild(this.draggedElement);
        this.draggedElement.style.left = '';
        this.draggedElement.style.top = '';
        this.draggedElement.style.position = '';
        this.currentDropTarget.classList.add('has-card');
    }

    //maintain styling of elements
    #updateStyle() {
        const rect = this.draggedElement.getBoundingClientRect();
        this.initialElementLeft = rect.left;
        this.initialElementTop = rect.top;
        const initialElementWidth = rect.width;
        const initialElementHeight = rect.height;

        this.originalParentCell = this.draggedElement.parentElement;
        this.draggedElement.classList.add('dragging');
        this.draggedElement.style.left = `${this.initialElementLeft}px`;
        this.draggedElement.style.top = `${this.initialElementTop}px`;
        this.draggedElement.style.width = `${initialElementWidth}px`;
        this.draggedElement.style.height = `${initialElementHeight}px`;
    }

    //handles the snapping back transition animation
    handleTransition() {
        this.draggedElement.classList.add('snapping-back');
        this.isTransitioning = true;

        const originalRect = this.originalParentCell.getBoundingClientRect();
        const paddingTop = parseFloat(getComputedStyle(this.originalParentCell).paddingTop);
        const paddingLeft = parseFloat(getComputedStyle(this.originalParentCell).paddingLeft);
        const targetLeft = originalRect.left + paddingLeft;
        const targetTop = originalRect.top + paddingTop;

        this.draggedElement.style.left = `${targetLeft}px`;
        this.draggedElement.style.top = `${targetTop}px`;

        const snappingCard = this.draggedElement;

        snappingCard.addEventListener('transitionend', function () {
            snappingCard.classList.remove('snapping-back');
            this.isTransitioning = false;

            if (this.originalParentCell && snappingCard.parentElement !== this.originalParentCell) {
                this.originalParentCell.appendChild(snappingCard);
                this.originalParentCell.classList.add('has-card');
            }

            if (this.currentDropTarget && this.currentDropTarget.classList.contains('grid-cell')) {
                snappingCard.classList.add('locked');
                snappingCard.style.cursor = 'default';
            }

            snappingCard.style.left = '';
            snappingCard.style.top = '';
            snappingCard.style.position = '';

            this.resetState();
        }.bind(this), { once: true });
    }
}

export default DragAndDropManager;
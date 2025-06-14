import { changeBoard, BOARD, drawBoard } from './board.js';
import { checkGameStatus } from './main.js';
import { DEBUG, CELL_STATES, FLOWER_TYPES, FAIL_AUDIO, CARD_GRAB, CARD_PLACE } from './constants.js';

/**
 * Hanles dragging for flower cards from hand to grid,
 * handles visuals, undo history, and failure audio
 * 
 * @class DragAndDropManager
 */
class DragAndDropManager {
    /**
     * Creates a new drag and drop manager
     * 
     * @param {HTMLElement[]} handCells Array of hand elements
     * @param {HTMLElement[]} gridCells Array of grid cell elements
     */
    constructor(handCells, gridCells) {
        // Drag State
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

        // Card move history for undo
        this.moveHistory = [];

        // Store drop targets
        this.dropTargets = [...handCells, ...gridCells];
        this.gridCells = [...gridCells];
        this.handCells = [...handCells];

        // Bind methods to 'this' to ensure correct context
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.updatePositionAndCheckTargets = this.updatePositionAndCheckTargets.bind(this);

        // Set up event listener for drag start
        document.addEventListener('mousedown', this.handleMouseDown);
    }

    /**
     * Handle when dragging an element across the board
     * 
     * @param {MouseEvent} event 
     * @returns {void}
     */
    handleMouseDown(event) {
        if (event.button !== 0 || this.isTransitioning) return;
        
        this.draggedElement = event.target.closest('.card');
        const notValidDrag = !this.draggedElement || (this.draggedElement.parentElement && this.draggedElement.parentElement.classList.contains('grid-cell'));
        if (notValidDrag) {
            return;
        }

        event.preventDefault();
        CARD_GRAB.play();
        this.#updateMouse(event);

        //maintain styling
        this.#updateStyle();

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);

        this.animationFrameId = requestAnimationFrame(this.updatePositionAndCheckTargets);
    }

    /**
     * Track cursor movements and position updates
     * 
     * @param {MouseEvent} event 
     */
    handleMouseMove(event) {
        this.latestMouseX = event.clientX;
        this.latestMouseY = event.clientY;
        if (this.animationFrameId === null) {
            this.animationFrameId = requestAnimationFrame(this.updatePositionAndCheckTargets);
        }
    }

    /**
     * Updates the dragged card and highlight the cell under its center
     * 
     * @returns {void}
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
     * Drop card and apply placement rules or snap back on failure of placement
     * 
     * @returns {void}
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
        
        // No valid drop target
        if (this.currentDropTarget === null) {
            this.#failAudio();
            this.handleTransition();
            return;
        }
    
        // Valid placement only on GRASS 
        const invalidGrid = !this.currentDropTarget.querySelector('.card') || this.currentDropTarget === this.originalParentCell;
        if (this.currentDropTarget && (invalidGrid)
            && this.currentDropTarget.dataset.cellState === CELL_STATES.GRASS) {
            // Remove from old cell
            if (this.originalParentCell && this.originalParentCell !== this.currentDropTarget) {
                this.originalParentCell.removeChild(this.draggedElement);
                this.originalParentCell.classList.remove('has-card');
            }
            this.#addChild();
        } else {
            this.#failAudio();
            this.handleTransition();
        }
    }

    /**
     * Clear drag properties
     */
    resetState() {
        this.draggedElement = null;
        this.originalParentCell = null;
        this.currentDropTarget = null;
        this.animationFrameId = null;
    }

    
    /**
     * Record cursor coordinates
     * 
     * @param {MouseEvent} event: original mouse event
     */
    #updateMouse(event) {
        this.initialMouseX = event.clientX;
        this.initialMouseY = event.clientY;
        this.latestMouseX = event.clientX;
        this.latestMouseY = event.clientY;
    }

    /**
     * Place card into target cell and update board & history
     */
    #addChild() {
        CARD_PLACE.play();
        this.currentDropTarget.appendChild(this.draggedElement);
        this.draggedElement.style.left = '';
        this.draggedElement.style.top = '';
        this.draggedElement.style.position = '';
        this.draggedElement.style.width = '';
        this.draggedElement.style.height = '';
        this.currentDropTarget.classList.add('has-card');

        /**
         * HOOK: This is where flowers that are placed on board by the user can be styled
         * IMPORTANT NOTE: These are the same cards that will be styled when they are put in the user's hand
         * So this should only be used if you want to add some special emphasis or effect for cards when placed
         * If you do add an effect here make sure to roll back the effect in the undo card hook.
         * This is because a card can be placed, then taken off with undo, then placed again. Just be careful.
         * Uncomment the line below for an example in your local build
         * this.draggedElement.style.backgroundColor = 'black'
         */
        const type = this.draggedElement.dataset.type;

        const updatedBoard = changeBoard(this.currentDropTarget, type);
        this.moveHistory.push({
            card: this.draggedElement,
            originalParent: this.originalParentCell,
            targetCell: this.currentDropTarget,
            history: updatedBoard
        });

        // Delay of animation
        setTimeout(checkGameStatus, 1);
    }

    /**
     * Update card and parent cell
     */
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

    /**
     * Animate card snap back to original cell
     */
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

            snappingCard.style.left = '';
            snappingCard.style.top = '';
            snappingCard.style.position = '';
            snappingCard.style.width = '';
            snappingCard.style.height = '';

            this.resetState();
        }.bind(this), { once: true });
    }

    /**
     * Revert last placement of card, restores board and moves card back
     * 
     * @returns {void}
     */
    undo() {
        if (this.moveHistory.length === 0) { return; }
        const lastMove = this.moveHistory.pop();

        // Revert Board back to corrupt and update DOM
        lastMove.history.forEach(function (coordinates) {
            let x = coordinates.x;
            let y = coordinates.y;
            BOARD[y][x] = CELL_STATES.CORRUPT;
            document.getElementById(`${x}-${y}`).dataset.cellState = CELL_STATES.CORRUPT;
        });

        drawBoard();

        // Move the card back
        lastMove.targetCell.removeChild(lastMove.card);
        lastMove.targetCell.classList.remove('has-card');
        lastMove.originalParent.appendChild(lastMove.card);
        lastMove.originalParent.classList.add('has-card');

        /**
         * HOOK: This is where cards that have been returned to your hand by an undo can be styled.
         * Uncomment the below for an example.
         */
        // lastMove.card.styled.backgroundColor = 'black';

        /**
         * HOOK: Can add successful card placement audio here!
         */

    }

    /**
     * HOOK: function to play fail audio when card is placed somewhere invalid
     * Play error sound on invalid placements of cards
     */
    #failAudio() {
        FAIL_AUDIO.play();
    }
}

export default DragAndDropManager;
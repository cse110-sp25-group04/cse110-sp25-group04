// //declare variables
// let draggedElement = null;
// let initialMouseX;
// let initialMouseY;
// let initialElementLeft;
// let initialElementTop;
// let originalParentCell = null;
// let currentDropTarget = null;
// //Variables to store the latest mouse position for requestAnimationFrame
// let latestMouseX = 0;
// let latestMouseY = 0;
// let animationFrameId = null; //To track if an animation frame is scheduled
// let isTransitioning = false;

// let dropTargets;

// function setupDragAndDrop(handCells, gridCells) {
//     let dropTargets = [...handCells, ...gridCells];

//     //Function to handle mouse down on a draggable element
//     function handleMouseDown(event) {
//         //Left Mouse Button Check
//         if (event.button !== 0) return;

//         if(isTransitioning) {
//             return;
//         }

//         console.log('[Drag Start] Dragging element:', draggedElement);
//         console.log('[Drag Start] animationFrameId before:', animationFrameId);

//         draggedElement = event.target.closest('.card');
//         // Check if a card was found AND if its parent is NOT a grid-cell
//         if (!draggedElement || (draggedElement.parentElement && draggedElement.parentElement.classList.contains('grid-cell')) ||
//         draggedElement.classList.contains('locked')) { // Added parentElement check for safety
//             console.log('Drag prevented: Not a card or card is in a grid cell.');
//             return; // Not a card or card is in a grid cell, prevent drag
//         }

//         event.preventDefault();

//         //MOUSE position relative to viewport
//         initialMouseX = event.clientX;
//         initialMouseY = event.clientY;
//         // Set initial latest mouse position
//         latestMouseX = event.clientX;
//         latestMouseY = event.clientY;

//         //ELEMENT position relative to the viewport
//         const rect = draggedElement.getBoundingClientRect();
//         initialElementLeft = rect.left;
//         initialElementTop = rect.top;
//         // Store initial width and height
//         const initialElementWidth = rect.width;
//         const initialElementHeight = rect.height;

//         originalParentCell = draggedElement.parentElement;
//         draggedElement.classList.add('dragging');
//         //add pixels for css positioning
//         draggedElement.style.left = initialElementLeft + 'px';
//         draggedElement.style.top = initialElementTop + 'px';
//         // Explicitly set width and height when dragging starts
//         draggedElement.style.width = initialElementWidth + 'px';
//         draggedElement.style.height = initialElementHeight + 'px';

//         // Add event listeners to the document for moving and dropping
//         // Use the direct handleMouseMove here to capture latest position
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', handleMouseUp);

//         // Start the animation loop for positioning and checks
//         animationFrameId = requestAnimationFrame(updatePositionAndCheckTargets);
//         console.log('requestAnimationFrame loop started.'); // Log when loop starts
//     }

//     // Function to capture the latest mouse position(helper)
//     function handleMouseMove(event) {
//         latestMouseX = event.clientX;
//         latestMouseY = event.clientY;
//         // Request an animation frame if one is not already scheduled
//         if (animationFrameId === null) {
//             animationFrameId = requestAnimationFrame(updatePositionAndCheckTargets);
//             console.log('requestAnimationFrame requested from mousemove.'); // Log when frame is requested
//         }
//     }

//     // Function to update card position and check drop targets
//     function updatePositionAndCheckTargets() {
//         console.log('updatePositionAndCheckTargets running.'); // Log each time the function runs
//         if (!draggedElement) {
//             console.log('updatePositionAndCheckTargets stopping: draggedElement is null.'); // Log when stopping
//             animationFrameId = null; // Stop the loop if element is gone
//             return;
//         }

//         try {
//             // Calculate the new position based on latest mouse movement
//             const deltaX = latestMouseX - initialMouseX;
//             const deltaY = latestMouseY - initialMouseY;

//             //Move card along with mouse cursor
//             draggedElement.style.left = (initialElementLeft + deltaX) + 'px';
//             draggedElement.style.top = (initialElementTop + deltaY) + 'px';

//             const cardRect = draggedElement.getBoundingClientRect();
//             const cardCenterX = cardRect.left + cardRect.width / 2;
//             const cardCenterY = cardRect.top + cardRect.height / 2;

//             //Iterate through potential drop targets
//             let hoveredTarget = null;
//             dropTargets.forEach(target => {
//                 const targetRect = target.getBoundingClientRect();

//                 //Check if card is on target (using center point)
//                 if (cardCenterX > targetRect.left && cardCenterX < targetRect.right &&
//                     cardCenterY > targetRect.top && cardCenterY < targetRect.bottom) {
//                     hoveredTarget = target;
//                 }
//             });

//             //Update visual feedback on drop targets, currentDroptarget is null initially
//             if (hoveredTarget !== currentDropTarget) {
//                 if (currentDropTarget) {
//                     currentDropTarget.classList.remove('drag-over');
//                 }

//                 if (hoveredTarget) {
//                     //Add drag-over class only if the target is a valid drop location (empty or original cell)
//                     const hasCard = hoveredTarget.querySelector('.card');
//                     if (!hasCard || hoveredTarget === originalParentCell) {
//                         hoveredTarget.classList.add('drag-over');
//                         currentDropTarget = hoveredTarget;
//                     } else {
//                         currentDropTarget = null;
//                     }
//                 } else {
//                     currentDropTarget = null;
//                 }
//             }

//         } catch (error) {
//             //the animation stuff didn't work without this catch idk why lmao
//             //console.error("Error in updatePositionAndCheckTargets:", error); // Log any errors
//             //Attempt to clean up dragging state if an error occurs
//             if (draggedElement) {
//                 draggedElement.classList.remove('dragging', 'snapping-back');
//                 draggedElement.style.left = '';
//                 draggedElement.style.top = '';
//                 draggedElement.style.position = '';
//                 draggedElement.style.width = '';
//                 draggedElement.style.height = '';
//             }
//             //Reset variables
//             draggedElement = null;
//             originalParentCell = null;
//             currentDropTarget = null;
//             initialElementWidth = null;
//             initialElementHeight = null;
//             animationFrameId = null;
//             //Remove event listeners to prevent further issues
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//             return;
//         }

//         //Continue the animation loop if dragging is still active
//         if (draggedElement) {
//             animationFrameId = requestAnimationFrame(updatePositionAndCheckTargets);
//         } else {
//             animationFrameId = null;
//         }
//     }

//     // Function to handle mouse up (drop)
//     function handleMouseUp() {
//         if (!draggedElement) return;

//         // Cancel any pending animation frame
//         cancelAnimationFrame(animationFrameId);
//         animationFrameId = null;

//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//         draggedElement.classList.remove('dragging');

//         //Remove drag-over class from any hovered target
//         if (currentDropTarget) {
//             currentDropTarget.classList.remove('drag-over');
//         }

//         if (currentDropTarget && (!currentDropTarget.querySelector('.card') || currentDropTarget === originalParentCell)) {

//             //delete info from parent
//             if (originalParentCell && originalParentCell !== currentDropTarget) {
//                 originalParentCell.removeChild(draggedElement);
//                 originalParentCell.classList.remove('has-card');
//             }

//             currentDropTarget.appendChild(draggedElement);

//             //Reset position and remove absolute positioning
//             draggedElement.style.left = '';
//             draggedElement.style.top = '';
//             draggedElement.style.position = '';
//             currentDropTarget.classList.add('has-card');

//         } else {
//             //Invalid drop target, snap back
//             draggedElement.classList.add('snapping-back');

//             //disable dragging during transition
//             isTransitioning = true;

//             //Get the original position relative to the viewport
//             const originalRect = originalParentCell.getBoundingClientRect();
//             //Gets padding position for original cell
//             const originalCellPaddingTop = parseFloat(getComputedStyle(originalParentCell).paddingTop);
//             const originalCellPaddingLeft = parseFloat(getComputedStyle(originalParentCell).paddingLeft);
//             //Where the card snaps back to
//             const targetSnapLeft = originalRect.left + originalCellPaddingLeft;
//             const targetSnapTop = originalRect.top + originalCellPaddingTop;

//             draggedElement.style.left = targetSnapLeft + 'px';
//             draggedElement.style.top = targetSnapTop + 'px';

//             const snappingCard = draggedElement; // Save a reference for use in the handler

//             snappingCard.addEventListener('transitionend', function handler() {
//                 snappingCard.removeEventListener('transitionend', handler);
//                 console.log('[Snap Back] Transition ended for', snappingCard);

//                 snappingCard.classList.remove('snapping-back');
//                 isTransitioning = false;

//                 if (originalParentCell && snappingCard.parentElement !== originalParentCell) {
//                     originalParentCell.appendChild(snappingCard);
//                     originalParentCell.classList.add('has-card');
//                 }

//                 if (currentDropTarget && currentDropTarget.classList.contains('grid-cell')) {
//                     snappingCard.classList.add('locked');
//                     snappingCard.style.cursor = 'default';
//                 }

//                 // Reset position styles
//                 snappingCard.style.left = '';
//                 snappingCard.style.top = '';
//                 snappingCard.style.position = '';

//                 //Reset vars
//                 resetVars();
//             });
//         }
//     }
//     document.addEventListener('mousedown', handleMouseDown);
// }

// //resets global vars after changing state
// function resetVars () {
//     draggedElement = null;
//     originalParentCell = null;
//     currentDropTarget = null;
//     animationFrameId = null;
// }

// export { setupDragAndDrop };

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
            this.dropTargets.forEach(target => {
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
            this.#resetState();
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
    #resetState() {
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

        snappingCard.addEventListener('transitionend', () => {
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

            this.#resetState();
        }, { once: true });
    }
}

export default DragAndDropManager;
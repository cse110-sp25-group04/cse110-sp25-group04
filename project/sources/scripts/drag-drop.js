//declare variables
let draggedElement = null;
let initialMouseX;
let initialMouseY;
let initialElementLeft;
let initialElementTop;
let originalParentCell = null;
let currentDropTarget = null;
//Variables to store the latest mouse position for requestAnimationFrame
let latestMouseX = 0;
let latestMouseY = 0;
let animationFrameId = null; //To track if an animation frame is scheduled
let isTransitioning = false;

let dropTargets;

function setupDragAndDrop(handCells, gridCells) {
    dropTargets = document.querySelectorAll('.grid-cell, .hand-cell');

    //Function to handle mouse down on a draggable element
    function handleMouseDown(event) {
        //Left Mouse Button Check
        if (event.button !== 0) return;

        if(isTransitioning) {
            return;
        }

        // if (animationFrameId !== null) {
        //     cancelAnimationFrame(animationFrameId);
        //     animationFrameId = null;
        // }
        console.log('[Drag Start] Dragging element:', draggedElement);
        console.log('[Drag Start] animationFrameId before:', animationFrameId);

        draggedElement = event.target.closest('.card');
        // Check if a card was found AND if its parent is NOT a grid-cell
        if (!draggedElement || (draggedElement.parentElement && draggedElement.parentElement.classList.contains('grid-cell')) ||
        draggedElement.classList.contains('locked')) { // Added parentElement check for safety
            console.log('Drag prevented: Not a card or card is in a grid cell.');
            return; // Not a card or card is in a grid cell, prevent drag
        }

        event.preventDefault();

        //MOUSE position relative to viewport
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
        // Set initial latest mouse position
        latestMouseX = event.clientX;
        latestMouseY = event.clientY;

        //ELEMENT position relative to the viewport
        const rect = draggedElement.getBoundingClientRect();
        initialElementLeft = rect.left;
        initialElementTop = rect.top;
        // Store initial width and height
        const initialElementWidth = rect.width;
        const initialElementHeight = rect.height;

        originalParentCell = draggedElement.parentElement;
        draggedElement.classList.add('dragging');
        //add pixels for css positioning
        draggedElement.style.left = initialElementLeft + 'px';
        draggedElement.style.top = initialElementTop + 'px';
        // Explicitly set width and height when dragging starts
        draggedElement.style.width = initialElementWidth + 'px';
        draggedElement.style.height = initialElementHeight + 'px';

        // Add event listeners to the document for moving and dropping
        // Use the direct handleMouseMove here to capture latest position
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Start the animation loop for positioning and checks
        animationFrameId = requestAnimationFrame(updatePositionAndCheckTargets);
        console.log('requestAnimationFrame loop started.'); // Log when loop starts
    }

    // Function to capture the latest mouse position(helper)
    function handleMouseMove(event) {
        latestMouseX = event.clientX;
        latestMouseY = event.clientY;
        // Request an animation frame if one is not already scheduled
        if (animationFrameId === null) {
            animationFrameId = requestAnimationFrame(updatePositionAndCheckTargets);
            console.log('requestAnimationFrame requested from mousemove.'); // Log when frame is requested
        }
    }

    // Function to update card position and check drop targets
    function updatePositionAndCheckTargets() {
        console.log('updatePositionAndCheckTargets running.'); // Log each time the function runs
        if (!draggedElement) {
            console.log('updatePositionAndCheckTargets stopping: draggedElement is null.'); // Log when stopping
            animationFrameId = null; // Stop the loop if element is gone
            return;
        }

        try {
            // Calculate the new position based on latest mouse movement
            const deltaX = latestMouseX - initialMouseX;
            const deltaY = latestMouseY - initialMouseY;

            //Move card along with mouse cursor
            draggedElement.style.left = (initialElementLeft + deltaX) + 'px';
            draggedElement.style.top = (initialElementTop + deltaY) + 'px';

            const cardRect = draggedElement.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            //Iterate through potential drop targets
            let hoveredTarget = null;
            dropTargets.forEach(target => {
                const targetRect = target.getBoundingClientRect();

                //Check if card is on target (using center point)
                if (cardCenterX > targetRect.left && cardCenterX < targetRect.right &&
                    cardCenterY > targetRect.top && cardCenterY < targetRect.bottom) {
                    hoveredTarget = target;
                }
            });

            //Update visual feedback on drop targets, currentDroptarget is null initially
            if (hoveredTarget !== currentDropTarget) {
                if (currentDropTarget) {
                    currentDropTarget.classList.remove('drag-over');
                }

                if (hoveredTarget) {
                    //Add drag-over class only if the target is a valid drop location (empty or original cell)
                    const hasCard = hoveredTarget.querySelector('.card');
                    if (!hasCard || hoveredTarget === originalParentCell) {
                        hoveredTarget.classList.add('drag-over');
                        currentDropTarget = hoveredTarget;
                    } else {
                        currentDropTarget = null;
                    }
                } else {
                    currentDropTarget = null;
                }
            }

        } catch (error) {
            //the animation stuff didn't work without this catch idk why lmao
            //console.error("Error in updatePositionAndCheckTargets:", error); // Log any errors
            //Attempt to clean up dragging state if an error occurs
            if (draggedElement) {
                draggedElement.classList.remove('dragging', 'snapping-back');
                draggedElement.style.left = '';
                draggedElement.style.top = '';
                draggedElement.style.position = '';
                draggedElement.style.width = '';
                draggedElement.style.height = '';
            }
            //Reset variables
            draggedElement = null;
            originalParentCell = null;
            currentDropTarget = null;
            initialElementWidth = null;
            initialElementHeight = null;
            animationFrameId = null;
            //Remove event listeners to prevent further issues
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            return;
        }

        //Continue the animation loop if dragging is still active
        if (draggedElement) {
            animationFrameId = requestAnimationFrame(updatePositionAndCheckTargets);
        } else {
            animationFrameId = null;
        }
    }

    // Function to handle mouse up (drop)
    function handleMouseUp() {
        if (!draggedElement) return;

        // Cancel any pending animation frame
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        draggedElement.classList.remove('dragging');

        //Remove drag-over class from any hovered target
        if (currentDropTarget) {
            currentDropTarget.classList.remove('drag-over');
        }

        if (currentDropTarget && (!currentDropTarget.querySelector('.card') || currentDropTarget === originalParentCell)) {

            //delete info from parent
            if (originalParentCell && originalParentCell !== currentDropTarget) {
                originalParentCell.removeChild(draggedElement);
                originalParentCell.classList.remove('has-card');
            }

            currentDropTarget.appendChild(draggedElement);

            //Reset position and remove absolute positioning
            draggedElement.style.left = '';
            draggedElement.style.top = '';
            draggedElement.style.position = '';
            currentDropTarget.classList.add('has-card');

        } else {
            //Invalid drop target, snap back
            draggedElement.classList.add('snapping-back');

            //disable dragging during transition
            isTransitioning = true;

            //Get the original position relative to the viewport
            const originalRect = originalParentCell.getBoundingClientRect();
            //Gets padding position for original cell
            const originalCellPaddingTop = parseFloat(getComputedStyle(originalParentCell).paddingTop);
            const originalCellPaddingLeft = parseFloat(getComputedStyle(originalParentCell).paddingLeft);
            //Where the card snaps back to
            const targetSnapLeft = originalRect.left + originalCellPaddingLeft;
            const targetSnapTop = originalRect.top + originalCellPaddingTop;

            draggedElement.style.left = targetSnapLeft + 'px';
            draggedElement.style.top = targetSnapTop + 'px';

            const snappingCard = draggedElement; // Save a reference for use in the handler

            snappingCard.addEventListener('transitionend', function handler() {
                snappingCard.removeEventListener('transitionend', handler);
                console.log('[Snap Back] Transition ended for', snappingCard);

                snappingCard.classList.remove('snapping-back');
                isTransitioning = false;

                if (originalParentCell && snappingCard.parentElement !== originalParentCell) {
                    originalParentCell.appendChild(snappingCard);
                    originalParentCell.classList.add('has-card');
                }

                if (currentDropTarget && currentDropTarget.classList.contains('grid-cell')) {
                    snappingCard.classList.add('locked');
                    snappingCard.style.cursor = 'default';
                }

                // Reset position styles
                snappingCard.style.left = '';
                snappingCard.style.top = '';
                snappingCard.style.position = '';

                //Reset vars
                draggedElement = null;
                originalParentCell = null;
                currentDropTarget = null;
                animationFrameId = null;
            });
        }

        //resets position and removes absolute positioning

        //Reset vars
        // draggedElement = null;
        // originalParentCell = null;
        // currentDropTarget = null;
        // animationFrameId = null;
    }
    document.addEventListener('mousedown', handleMouseDown);
}

export { setupDragAndDrop };
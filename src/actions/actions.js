import types from "./types";

/**
 * Action handler to update the value of a cell
 * Dipatched from:
 * - User inputs a value in an editable cell (Board-Component)
 * - Backtacking button (Buttons-Component)
 */
const cellUpdateHandler = (
  userInput,
  rowIndex,
  cellIndex,
  isCurrentlyBacktracking
) => {
  return {
    type: types.UPDATE_CELL,
    payload: {
      userInput: userInput,
      rowIndex: rowIndex,
      cellIndex: cellIndex,
      isCurrentlyBacktracking: isCurrentlyBacktracking,
    },
  };
};

/**
 * Action handler to get a new board
 * Dispatched from:
 * -New Board Button (Buttons-Component)
 */
const newBoardHandler = (result) => {
  return {
    type: types.NEW_BOARD,
    payload: {
      result: result,
    },
  };
};

/**
 * Action handler to reset board to its original state
 * Dispatched from:
 * -Reset Button (Buttons-Component)
 */
const resetBoardHandler = () => {
  return {
    type: types.RESET_BOARD,
  };
};

/**
 * Action handler to backtrack board
 * Dispatched from:
 * N/A
 * Note : Thought i'd need it, might need later
 */
const backTrackBoardHandler = () => {
  return {
    type: types.BACKTRACK_BOARD,
  };
};

/**
 * Action handler to modify how fast is backtracking
 * the board
 * Dispatched from:
 * - Slider (Buttons-component)
 */
const backTrackSpeedChangeHandler = (backTrackingSpeed) => {
  return {
    type: types.BACKTRACK_SPEED,
    payload: {
      backTrackingSpeed: backTrackingSpeed,
    },
  };
};

/**
 * Action handler to solve the board instantly
 * Using the API-given solution
 * Dispatched from:
 * -Solve Instantly Button (Buttons-Component)
 */
const solveInstantlyHandler = () => {
  return {
    type: types.SOLVE_INSTANTLY,
  };
};

/**
 * Action handler to validate the current board
 * Is my current board the solution or not
 * Using the API-given solution
 * Dispatched from:
 * -Validate Button (Buttons-Component)
 */
const validateBoardHandler = () => {
  return {
    type: types.VALIDATE_SOLUTION,
  };
};

/**
 * Action handler to undo the last move
 * Dispatched from:
 * -Undo Button (Buttons-Component)
 */
const undoMoveHandler = () => {
  return {
    type: types.UNDO_MOVE,
  };
};

/**
 * Action to change game difficulty
 * Dispatched from:
 * -Difficulty Dropdown (Buttons-Component)
 */
const levelChangeHandler = (eventKey) => {
  return {
    type: types.LEVELS_CHANGE,
    payload: {
      eventKey: eventKey,
    },
  };
};

/**
 * Action to evaluate the current state of the board
 * Inform user on how they're doing
 * Dispatched from:
 * -How am i doing (Buttons-Component)
 */
const performanceHandler = () => {
  return {
    type: types.USER_PERFORMANCE,
  };
};

export {
  cellUpdateHandler,
  newBoardHandler,
  resetBoardHandler,
  backTrackBoardHandler,
  solveInstantlyHandler,
  validateBoardHandler,
  undoMoveHandler,
  backTrackSpeedChangeHandler,
  levelChangeHandler,
  performanceHandler,
};

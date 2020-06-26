import types from "../actions/types";
import {
  implementNewBoardState,
  implementUserInputandTable,
  implementResetBoardState,
  implementStateToSolveInstantly,
  implementStateToValidateSolution,
  implementStateUndoMove,
  implementStateBackTrackingSpeed,
  implementStateBoardDifficulty,
} from "./boardReducerHelpers";

import { INITIAL_STATE } from "../constants";

const boardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_CELL:
      return {
        ...state,
        ...implementUserInputandTable(
          state.board,
          action.payload,
          state.history
        ),
      };
    case types.NEW_BOARD:
      return {
        ...state,
        ...implementNewBoardState(action.payload),
      };
    case types.RESET_BOARD:
      return {
        ...state,
        ...implementResetBoardState(state.ogBoard),
      };
    case types.BACKTRACK_BOARD:
      return {
        ...state,
      };
    case types.SOLVE_INSTANTLY:
      return {
        ...state,
        ...implementStateToSolveInstantly(state.solution),
      };
    case types.VALIDATE_SOLUTION:
      return {
        ...state,
        ...implementStateToValidateSolution(
          state.board,
          state.solution,
          state.isSolutionValid,
          state.isCurrentlyBacktracking
        ),
      };
    case types.UNDO_MOVE:
      return {
        ...state,
        ...implementStateUndoMove(state.history),
      };
    case types.BACKTRACK_SPEED:
      return {
        ...state,
        ...implementStateBackTrackingSpeed(action.payload),
      };
    case types.DIFFICULTIES_CHANGE:
      return {
        ...state,
        ...implementStateBoardDifficulty(action.payload),
      };
    case types.USER_PERFORMANCE:
      return {
        ...state,
        boardConflicts: [{ row: 1 }],
      };
    default:
      return {
        ...state,
      };
  }
};

export default boardReducer;

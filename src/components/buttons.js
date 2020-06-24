import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Button, ButtonGroup, Modal } from "react-bootstrap";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core";

import { getNewBoardAndSolveAsync } from "../sudokuMachine/sudokuSolver";

import {
  newBoardHandler,
  resetBoardHandler,
  cellUpdateHandler,
  solveInstantlyHandler,
  validateBoardHandler,
  undoMoveHandler,
  backTrackSpeedChangeHandler,
  levelChangeHandler,
} from "../actions/actions";

import { DIFFICULTIES_MENU } from "../constants";

const useStyles = makeStyles({
  slider: {
    width: "50%",
    marginLeft: "5%",
    top: "25%",
    color: "blue",
  },
  buttonCol: {
    margin: "2%",
  },
});

const Buttons = () => {
  const {
    backtrackingChangesSteps,
    backTrackingSpeed,
    isSolutionValid,
  } = useSelector((state) => ({
    ...state.boardReducer,
  }));

  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [backtrackId, setBacktrackId] = useState([]);

  const dispatch = useDispatch();
  const classes = useStyles();
  // const { width, height } = useWindowSize();

  const makeRequestForNewGame = async (eventKey) => {
    setDifficulty(eventKey);
    let difficulty = DIFFICULTIES_MENU[eventKey];
    let result = await getNewBoardAndSolveAsync(difficulty);
    dispatch(newBoardHandler(result));
  };

  const backtrackFunc = (i) => {
    i + 1 === backtrackingChangesSteps.length
      ? setLoading(false)
      : setLoading(true);
    //console.log('%d => %d', i, backtrackingChangesSteps[i]);
    let { rowIndex, cellIndex, value } = backtrackingChangesSteps[i];
    dispatch(cellUpdateHandler(value, rowIndex, cellIndex, true));
  };

  const stopBackTrack = () => {
    for (let i = 0; i < backtrackId.length; i++) {
      if (i + 1 === backtrackId.length) {
        setLoading(false);
        dispatch(resetBoardHandler());
      } else {
        setLoading(true);
      }
      clearTimeout(backtrackId[i]);
    }
  };

  const backTrack = () => {
    dispatch(resetBoardHandler());
    for (let i = 0; i < backtrackingChangesSteps.length; i++) {
      const speed = Math.round(
        backtrackingChangesSteps.length / backTrackingSpeed
      );
      const timeoutId = setTimeout(backtrackFunc, (i / 10) * speed, i);
      backtrackId.push(timeoutId);
      setBacktrackId(backtrackId);
    }
  };

  const backTrackSpeedChange = (e) => {
    dispatch(backTrackSpeedChangeHandler(e));
  };

  const resetBoard = () => {
    dispatch(resetBoardHandler());
  };

  const solveInstantly = () => {
    dispatch(solveInstantlyHandler());
  };

  const validateSolution = () => {
    dispatch(validateBoardHandler());
    isSolutionValid ? setShow(false) : setShow(true);
  };

  const undoAction = () => {
    dispatch(undoMoveHandler());
  };

  const setDifficulty = (eventKey) => {
    dispatch(levelChangeHandler(eventKey));
  };
  const renderValidateModal = () => {
    return (
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>Keep going. You can do this!! </Modal.Body>
      </Modal>
    );
  };

  const renderCongratulationsModal = () => {
    return (
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          Congratulations!! You have successfully solved the board
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      {isSolutionValid ? renderCongratulationsModal() : renderValidateModal()}
      <Row className="buttons">
        <Col className={classes.buttonCol}>
          <ButtonGroup>
            <Button
              variant="outline-dark"
              disabled={isLoading}
              onClick={async (eventKey) =>
                await makeRequestForNewGame(eventKey)
              }
            >
              Start
            </Button>
            {/* </Dropdown> */}
            <Button
              variant="outline-dark"
              onClick={() => undoAction()}
              disabled={isLoading}
            >
              Undo
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => validateSolution()}
              disabled={isLoading}
            >
              Verify
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => resetBoard()}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => solveInstantly()}
              disabled={isLoading}
            >
              Solve
            </Button>
            <Button
              size="md"
              variant="outline-dark"
              onClick={() => {
                isLoading ? stopBackTrack() : backTrack();
              }}
            >
              {isLoading ? "Stop Backtracking" : "Run Backtracker"}
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col className={classes.buttonCol}>
          <span>Speed :</span>
          <Slider
            aria-label="custom thumb label"
            orientation="horizontal"
            min={1}
            max={50}
            defaultValue={25}
            onChange={(e, val) => backTrackSpeedChange(val)}
            className={classes.slider}
            disabled={isLoading}
          />
        </Col>
      </Row>
    </>
  );
};

export default Buttons;

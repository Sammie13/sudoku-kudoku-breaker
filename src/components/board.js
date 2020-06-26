import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Table, Row, Col } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";

import { cellUpdateHandler } from "../actions/actions";

const useStyles = makeStyles({
  table: {
    minWidth: 800,
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: "#black",
  },
  input: {
    width: "100%",
    height: "100%",
    padding: "0.75rem",
    backgroundColor: "white",
    color: "#282c34",
    textAlign: "center",
    border: "none",
    "&&:disabled": {
      fontWeight: "normal",
      fontSize: "1em",
      color: "black",
    },
  },
  cell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    padding: 0,
    "&&&:focus": {
      borderStyle: "solid",
      borderWidth: 0.5,
      borderColor: "black",
      padding: 0,
    },
  },
  thirdCell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRightStyle: "solid",
    borderRightWidth: 4,
    borderRightColor: "black",
    padding: 0,
    "&&&:focus": {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      borderRightStyle: "solid",
      borderRightWidth: 4,
      borderRightColor: "black",
      padding: 0,
    },
  },
  thirdRow: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderBottomStyle: "solid",
    borderBottomWidth: 5,
    borderBottomColor: "black",
  },
});

const Board = () => {
  const {
    board,
    ogBoard,
    selectedRow,
    selectedCol,
    isCurrentlyBacktracking,
  } = useSelector((state) => ({
    ...state.boardReducer,
  }));
  const dispatch = useDispatch();

  //Create style classes
  const classes = useStyles();

  // Method to style third cell differently
  const thirdStyle = (idx, style) => {
    return idx && (idx + 1) % 3 === 0 ? style : classes.cell;
  };

  // Method that renders each cell of a row
  const renderCell = (cellValue, cellIdx, rowIdx) => {
    const cellStyle = thirdStyle(cellIdx, classes.thirdCell);
    const inputStyle = classes.input;
    const isCellPlayable = ogBoard[rowIdx][cellIdx] === 0;
    let extraStyle = {};
    if (
      selectedRow === rowIdx &&
      selectedCol === cellIdx &&
      isCurrentlyBacktracking
    ) {
      extraStyle = {
        backgroundColor: "green",
      };
    }
    return (
      <td
        key={`${rowIdx}-${cellIdx}`}
        className={cellStyle}
        style={{
          alignText: "center",
          padding: 0,
        }}
      >
        <input
          value={cellValue ? cellValue : "_"}
          style={extraStyle}
          className={inputStyle}
          onKeyPress={(e) =>
            dispatch(cellUpdateHandler(e.key, rowIdx, cellIdx, false))
          }
          type="number"
          onChange={() => {
            return; //need to put this because of consolo "warning"
          }}
          disabled={!isCellPlayable}
        ></input>
      </td>
    );
  };

  // Method that renders board rows
  const renderRow = (row, rowIdx) => {
    const rowStyle = thirdStyle(rowIdx, classes.thirdRow);
    return (
      <tr key={`row-${rowIdx}`} className={rowStyle}>
        {row.map((col, colIdx) => {
          return renderCell(col, colIdx, rowIdx);
        })}
      </tr>
    );
  };

  // Produce the board
  return (
    <>
      <Row className="board">
        <Col>
          <Table
            responsive="xl"
            style={{
              borderStyle: "solid",
              borderWidth: 4,
              borderColor: "#black",
            }}
          >
            <tbody>
              {board && board.length ? (
                board.map((row, rowIdx) => {
                  return renderRow(row, rowIdx);
                })
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Board;

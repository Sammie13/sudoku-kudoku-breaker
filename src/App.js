import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import "./css/App.css";

import Board from "./components/board";
import Buttons from "./components/buttons";

const App = () => {
  /**
   * Render the Board Component
   */
  const renderBoard = () => {
    return (
      <Row className="board">
        <Col>
          <Board />
        </Col>
        <Col>
          <Buttons />
        </Col>
      </Row>
    );
  };
  /**
   * Render the Buttons Component
   */
  // const renderButtons = () => {
  //   return <Buttons />;
  // };

  const renderHeader = () => {
    return (
      <Row className="App-header">
        <Col
          xl={4}
          style={{
            textAlign: "left",
          }}
        ></Col>
        <Col xl={4}>Sudoku Kudoku Breaker</Col>
        <Col
          xl={4}
          style={{
            textAlign: "right",
          }}
        ></Col>
      </Row>
    );
  };

  /**
   * Render ALL THE APP
   */
  return (
    <div>
      <Container className="App">
        {renderHeader()}
        {renderBoard()}
        {/* {renderButtons()} */}
      </Container>
    </div>
  );
};

export default App;

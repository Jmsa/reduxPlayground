import React from "react";
import "./App.css";
import { store } from "./store";
import { connect } from "react-redux";
import * as api from "./api";

function undo() {
  store.dispatch({ type: "UNDO" });
}
function redo() {
  store.dispatch({ type: "REDO" });
}
function add() {
  const input = document.getElementById("input");
  store.dispatch({ type: "ADD", payload: input.value });
}

function getPost() {
  store.dispatch({type: "GET_POST_REQUESTED"})
  // api.getPost().then(response => {
    // store.dispatch({ type: "ADD", payload: response });
  // });
}

function addPost() {
  api.addPost();
}
function deletePost() {
  api.deletePost();
}

function cancelGetPost(){
  store.dispatch({type:"CANCEL_GET_POST_REQUESTED"})
}

function App(props = {}) {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <div>
        <input id="input" type="text" autoFocus />
        <div>
          <button onClick={add}>Add</button>
          <button onClick={undo}>Undo</button>
          <button onClick={redo}>Redo</button>
        </div>
        <div>
          <button onClick={getPost}>getPost</button>
          <button onClick={addPost}>addPost</button>
          <button onClick={deletePost}>deletePost</button>
        </div>
        <div>
          <button onClick={cancelGetPost}>cancelGetPost</button>
        </div>
        <div>past: {props.storeValue.past.length}</div>
        <div>future: {props.storeValue.future.length}</div>
        <div>present: {JSON.stringify(props.storeValue.present)}</div>
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;
const mapStateToProps = state => {
  return {
    storeValue: state
  };
};
export const ConnectedApp = connect(mapStateToProps)(App);

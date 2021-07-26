import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./views/main";

const App:React.FC = ():JSX.Element => {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;

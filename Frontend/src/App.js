import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./commons/components/Main";
import Login from "./commons/components/Login";
import MakeDocs from "./commons/components/MakeDocs";
import Docs from "./commons/components/Docs";
import MyDocs from "./commons/components/MyDocs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/makeDocs" element={<MakeDocs />} />
        <Route path="/own/:id" element={<MyDocs />} />
        <Route path="/:id" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

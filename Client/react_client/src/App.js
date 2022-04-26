import DoctumentEditor from "./pages/DoctumentEditor";
import DocumentsOverview from "./pages/DocumentsOverview";
import ApiController from "./helpers/API";
import ConnectionBuilder from "./helpers/ConnectionBuilder";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

/**
 * Top-Level App Component
 * @returns
 */
export default function App() {
  const [api] = useState(new ApiController());
  const [connectionBuilder] = useState(new ConnectionBuilder());

  return (
    <Routes>
      <Route path="/" element={<DocumentsOverview api={api} />} />
      <Route
        path="/documents/:id"
        element={
          <DoctumentEditor api={api} connectionBuilder={connectionBuilder} />
        }
      />
    </Routes>
  );
}

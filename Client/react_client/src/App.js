import DoctumentEditor from "./pages/DoctumentEditor";
import DocumentsOverview from "./pages/DocumentsOverview";
import ApiController from "./helpers/API";
import ConnectionBuilder from "./helpers/ConnectionBuilder";
import DocumentProvider from "./helpers/DocumentProvider";
import UserProvider from "./helpers/UserProvider";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

/**
 * Top-Level App Component
 * @returns
 */
export default function App() {
  const [api] = useState(new ApiController());
  const [connectionBuilder] = useState(new ConnectionBuilder());
  const [documentProvider] = useState(new DocumentProvider());
  const [userProvider] = useState(new UserProvider());

  return (
    <Routes>
      <Route path="/" element={<DocumentsOverview api={api} userProvider={userProvider} />} />
      <Route
        path="/documents/:id"
        element={
          <DoctumentEditor 
            api={api} 
            connectionBuilder={connectionBuilder}  
            userProvider={userProvider}
            documentProvider={documentProvider} 
           />
        }
      />
    </Routes>
  );
}

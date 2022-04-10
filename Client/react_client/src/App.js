import DoctumentEditor from "./DoctumentEditor"
import DocumentsOverview from "./DocumentsOverview"
import {
  Routes,
  Route
} from "react-router-dom"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DocumentsOverview/>} />
      <Route path="/documents/:id" element={<DoctumentEditor />} />
    </Routes>
  )
}
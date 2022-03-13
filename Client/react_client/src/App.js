import TextEditor from "./TextEditor"
import Documents from "./Documents"
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Documents/>} />
      <Route path="/documents/:id" element={<TextEditor />} />
    </Routes>
  )
}
//element={<Navigate to={`/documents/${uuidV4()}`} />}
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoList from "./todoList";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TodoList />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoList from "./todoList";
import Index from ".";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TodoList />}></Route>
      <Route path="/plus" element={<Index />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

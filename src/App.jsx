import { useEffect, useState } from "react";
import "./App.css";
import { RiDeleteBin6Line } from "react-icons/ri";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: "", description: "" });

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.name && newTodo.description) {
      setTodos([...todos, { id: Date.now(), ...newTodo, color: "white", isBarred: false }]); // Initial color & isBarred
      setNewTodo({ name: "", description: "" });
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  const handleSelectChange = (todoId, event) => {
    const selectedValue = event.target.value;
    const newColor = selectedValue === "padding" ? "orange" : selectedValue === "pause" ? "blue" : "green";
    const isBarred = selectedValue === "terminer"; 
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, color: newColor, isBarred } : todo
      )
    );
  };

  return (
    <div className="App">
      <h2>Todolist</h2>
      <form className="form-container" onSubmit={handleAddTodo}>
        <input
          type="text"
          name="name"
          placeholder="Nom de la tâche"
          value={newTodo.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTodo.description}
          onChange={handleInputChange}
        />
        <button type="submit">Ajouter</button>
      </form>
      <ol>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={
              todo.isDone ? "todo-done todo-line-through" : "todo-list-item" + (todo.isBarred ? " barred" : "")
            }
          >
            <div className="tache-list">
              <span style={{ color: todo.color, textDecoration: todo.isBarred ? "line-through" : "none" }}>
                {todo.name}
              </span>
            </div>
            <div className="tache-list">
              <p style={{ color: todo.color, textDecoration: todo.isBarred ? "line-through" : "none" }}>
                {todo.description}
              </p>
            </div>
            <select value={todo.color} onChange={(event) => handleSelectChange(todo.id, event)}>
              <option value="">--Etat--</option>
              <option value="padding">En attente</option>
              <option value="pause">En cours</option>
              <option value="terminer">Terminé</option>
            </select>
            <div className="">
              <RiDeleteBin6Line className="icon" onClick={() => handleDeleteTodo(todo.id)} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;

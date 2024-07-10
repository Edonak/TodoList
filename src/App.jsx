import { useState, useEffect } from "react";
import "./App.css";
import { RiDeleteBin6Line } from "react-icons/ri";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: "", description: "" });
  const [showDetails, setShowDetails] = useState({}); //////////////////

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);


  const handleCheckboxClick = (todoId, event) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, isDone: !todo.isDone }
          : todo
      )
      
    );
    if (event.target.type === 'radio') {
      setShowDetails({ ...showDetails, [todoId]: !showDetails[todoId] }); // Toggle visibility
    }
  };
  


  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.name && newTodo.description) {
      setTodos([...todos, { id: Date.now(), ...newTodo, isDone: false }]);
      setNewTodo({ name: "", description: "" });
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
              todo.isDone ? "todo-done todo-line-through" : "todo-list-item"
            }
          >
            <div className="tache-list">
              <span
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                  color: todo.isDone ? "green" : "white",
                }}
                onClick={() => handleCheckboxClick(todo.id)}
              >
                {todo.name}
              </span>
            </div>
            <div className="tache-list">
              <p
                style={{
                  textDecoration: todo.isDone ? "line-through" : "none",
                  color: todo.isDone ? "green" : "white",
                }}
                onClick={() => handleCheckboxClick(todo.id)}
              >
                {todo.description}
              </p>
            </div>
            <div>
              <input
                type="checkbox"
                name={`radio-${todo.id}`}
                id={`radio-${todo.id}`}
                onChange={() => handleToggleTodo(todo.id)}
              />
            </div>
            <div>
              <input
                type="checkbox"
                name={`radio-${todo.id}`}
                id={`radio-${todo.id}`}
              />
            </div>
            <div>
              <input
                type="checkbox"
                name={`radio-${todo.id}`}
                id={`radio-${todo.id}`}
              />
            </div>
            
            <div className="">
              <RiDeleteBin6Line
                className="icon"
                onClick={() => handleDeleteTodo(todo.id)}
              />
            </div>
            {showDetails[todo.id] && (
              <ul className="details-list">
                <li>Priorité: Haute</li>
                <li>Date d'échéance: 2024-07-15</li>
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;

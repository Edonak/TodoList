import{ useState, useEffect } from "react";
import "./App.css";
import { RiDeleteBin6Line } from "react-icons/ri";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: "", description: "" });

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.name && newTodo.description) {
      setTodos([...todos, { id: Date.now(), ...newTodo, isDone: false }]);
      setNewTodo({ name: "", description: "" }); // Clear input fields
    }
  };

  const handleCheckboxClick = (todoId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
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
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  return (
    <div className="App">
      <h2>Todolist</h2>
      <form
        className="form-container"
        onSubmit={handleAddTodo}
      >
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
            className={todo.isDone ? "todo-done todo-line-through" : "todo-list-item"}
          >
            <div className="tache-list">
              <span
                style={{ textDecoration: todo.isDone ? "line-through" : "none",
                  color: todo.isDone ? "green" : "white", 
                 }}
                onClick={() => handleCheckboxClick(todo.id)}
              >
                {todo.name}
              </span>
            </div>
            <div className="tache-list">
              <p
                style={{ textDecoration: todo.isDone ? "line-through" : "none",
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
                name={`checkbox-${todo.id}`}
                id={`checkbox-${todo.id}`}
                checked={todo.isDone}
                onChange={() => handleCheckboxClick(todo.id)}
              />
            </div>
            <div className="">
              <RiDeleteBin6Line
                className="icon"
                onClick={() => handleDeleteTodo(todo.id)}
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default App;

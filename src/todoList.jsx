import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    targetDuration: "",
  });

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.name && newTodo.description) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          ...newTodo,
          color: "white",
          isBarred: false,
          startTime: Date.now(),
          duration: "0",
        },
      ]);
      setNewTodo({ name: "", description: "", targetDuration: "" });
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
    const newColor =
      selectedValue === "padding"
        ? "orange"
        : selectedValue === "pause"
        ? "blue"
        : "green";
    const isBarred = selectedValue === "terminer";
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, color: newColor, isBarred } : todo
      )
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.targetDuration > 0) {
            const elapsedTime = Date.now() - todo.startTime;
            const remainingTime = Math.max(
              todo.targetDuration - elapsedTime,
              0
            );
  
            // Calcul des minutes et secondes
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
  
            // Formatage du temps
            const formattedTime = `${minutes}min:${seconds
              .toString()
              .padStart(2, "0")}sec`;
  
            return {
              ...todo,
              duration: elapsedTime,
              isBarred: remainingTime === 0,
              color: remainingTime === 0 ? "green" : todo.color,
              formattedTime,
            };
          } else {
            return todo;
          }
        })
      );
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [todos]);
  
  return (
    <div className="App">
      <h2>Todolist</h2>
      <Link to="/plus">
        <p>Voir Plus</p>
      </Link>
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
        <input
          type="number"
          name="targetDuration"
          placeholder="Durée tache en seconde"
          value={newTodo.targetDuration}
          onChange={handleInputChange}
        />
        <button type="submit">Ajouter</button>
      </form>
      <ol>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={
              todo.isDone
                ? "todo-done todo-line-through"
                : "todo-list-item" + (todo.isBarred ? " barred" : "")
            }
          >
            <div className="tache-list">
              <span
                style={{
                  color: todo.color,
                  textDecoration: todo.isBarred ? "line-through" : "none",
                }}
              >
                {todo.name}
              </span>
            </div>
            <div className="tache-list">
              <p
                style={{
                  color: todo.color,
                  textDecoration: todo.isBarred ? "line-through" : "none",
                }}
              >
                {todo.description}
              </p>
            </div>
            <select
              value={todo.color}
              onChange={(event) => handleSelectChange(todo.id, event)}
            >
              <option value="">--Etat--</option>
              <option value="padding">En attente</option>
              <option value="pause">En cours</option>
              <option value="terminer">Terminé</option>
            </select>
            <div>Temps écoulé: {todo.formattedTime}</div>
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

export default TodoList;

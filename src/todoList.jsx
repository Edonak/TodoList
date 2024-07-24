import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Todolist = () => {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [taskName, setTaskName] = useState(""); // Nom de la tâche
  const [n, setN] = useState(0);
  const [taskDescription, setTaskDescription] = useState("");

  //supprimer une tache
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  // Fonction pour ajouter une tâche
  const addTask = () => {
    if (taskName.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          name: taskName,
          description: taskDescription,
          duration: n, // Utilise la valeur de n comme timing initial
          color: "white", // Couleur par défaut
          isBarred: false, // Par défaut, non barré
        },
      ]);
      setTaskName("");
      setTaskDescription(""); // Réinitialise le champ de saisie
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleSelectChange = (taskId, event) => {
    const selectedValue = event.target.value;
    const newColor =
      selectedValue === "padding"
        ? "orange"
        : selectedValue === "pause"
        ? "blue"
        : "green";
    const isBarred = selectedValue === "terminer";
    setTasks(
      tasks.map((task) =>
        tasks.id === taskId ? { ...task, color: newColor, isBarred } : task
      )
    );
  };

  // Effet secondaire pour gérer le compte à rebours
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => ({
          ...task,
          duration: Math.max(task.duration - 1, 0),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId); // Nettoyer l'intervalle au démontage du composant
  }, []);

  return (
    <div className="App">
      <h2>Todolist</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Nom de la tâche"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description de la tâche"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Entrer n"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className={
              task.isDone
                ? "todo-done todo-line-through"
                : "todo-list-item" + (task.isBarred ? " barred" : "")
            }
          >
            <div className="tache-list">
              <span
                style={{
                  color: task.duration === 0 ? "green" : "white",
                  textDecoration: task.duration === 0 ? "line-through" : "none",
                }}
              >
                {task.name}
              </span>
            </div>
            <div className="tache-list">
              <span
                style={{
                  color: task.duration === 0 ? "green" : "white",
                  textDecoration: task.duration === 0 ? "line-through" : "none",
                }}
              >
                {task.description}
              </span>
            </div>
            <select
              value={task.color}
              onChange={(event) => handleSelectChange(task.id, event)}
            >
              <option value="">--Etat--</option>
              <option value="padding">En attente</option>
              <option value="pause">En cours</option>
              <option value="terminer">Terminé</option>
            </select>
            <div className="tache-list">
              {Math.floor(task.duration / 60)}min:{task.duration % 60}sec
            </div>

            <div className="">
              <RiDeleteBin6Line
                className="icon"
                onClick={() => handleDeleteTask(task.id)}
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Todolist;

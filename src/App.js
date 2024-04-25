import React, { useState } from 'react';
import './App.css'; // Importamos el archivo CSS donde colocaremos los estilos

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newImage, setNewImage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [editedImage, setEditedImage] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { task: newTask, image: newImage }]);
      setNewTask('');
      setNewImage('');
    }
  };

  const startEditing = (index, task, image) => {
    setEditingIndex(index);
    setEditedTask(task);
    setEditedImage(image);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedTask('');
    setEditedImage('');
  };

  const saveEditedTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { task: editedTask, image: editedImage };
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask('');
    setEditedImage('');
  };

  const removeTask = (index) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
    if (confirmDelete) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="container"> {/* Le aplicamos una clase CSS al contenedor principal */}
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Ingrese una nueva tarea"
        className="input-field" // Le aplicamos una clase CSS al campo de entrada
      />
      <input
        type="text"
        value={newImage}
        onChange={(e) => setNewImage(e.target.value)}
        placeholder="URL de la imagen"
        className="input-field" // Le aplicamos una clase CSS al campo de entrada
      />
      <button onClick={addTask} className="btn">Agregar tarea</button> {/* Le aplicamos una clase CSS al botón */}
      <ul className="task-list"> {/* Le aplicamos una clase CSS a la lista de tareas */}
        {tasks.map((task, index) => (
          <li key={index} className="task-item"> {/* Le aplicamos una clase CSS a cada elemento de la lista */}
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  className="input-field" // Le aplicamos una clase CSS al campo de entrada
                />
                <input
                  type="text"
                  value={editedImage}
                  onChange={(e) => setEditedImage(e.target.value)}
                  placeholder="URL de la imagen"
                  className="input-field" // Le aplicamos una clase CSS al campo de entrada
                />
                <button onClick={() => saveEditedTask(index)} className="btn">Guardar</button> {/* Le aplicamos una clase CSS al botón */}
                <button onClick={cancelEditing} className="btn">Cancelar</button> {/* Le aplicamos una clase CSS al botón */}
              </>
            ) : (
              <>
                <div>{task.task}</div>
                {task.image && <img src={task.image} alt="Task" className="task-image" />} {/* Le aplicamos una clase CSS a la imagen */}
                <button onClick={() => startEditing(index, task.task, task.image)} className="btn">Editar</button> {/* Le aplicamos una clase CSS al botón */}
                <button onClick={() => removeTask(index)} className="btn">Eliminar</button> {/* Le aplicamos una clase CSS al botón */}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewtask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewtask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const removeTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">Agregar nueva tarea</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setNewtask(e.target.value)}
                    value={newTask}
                    autoFocus
                    required
                    ref={taskInput}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
          {tasks.map((task: ITask, index: number) => (
            <div className="card mb-2" key={index}>
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <span
                    style={{ textDecoration: task.done ? "line-through" : "" }}
                  >
                    {task.name}
                  </span>
                  <div>
                    <button
                      className={
                        task.done
                          ? "btn btn-sm btn-success"
                          : "btn btn-sm btn-primary"
                      }
                      onClick={() => toggleDoneTask(index)}
                      title={task.done ? "uncheck" : "check"}
                    >
                      {task.done ? "✔" : "✖"}
                    </button>{" "}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeTask(index)}
                      title="remove"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

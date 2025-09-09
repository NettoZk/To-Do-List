import { PlusCircle } from '@phosphor-icons/react'
import { useState } from 'react'
import styles from './App.module.css'

import { Button } from './components/Button/Button'
import { Header } from './components/Header/Header'
import { Input } from './components/Input/Input'
import { Empty } from './components/Empty/Empty'
import { Item } from './components/Item/Item'

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputName, setInputName] = useState("");

  // Contadores derivados de tasks
  const tasksCount = tasks.length;
  const completedCount = tasks.filter((t) => t.isChecked).length;

  function addTask() {
    const trimmedInput = inputName.trim();
    if (trimmedInput.length <= 0) return;

    const existTask = tasks.find(
      (t) => t.text.trim().toLowerCase() === trimmedInput.toLowerCase()
    );
    if (existTask) return;

    const newTask: ITask = {
      id: Math.random(),
      text: trimmedInput,
      isChecked: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInputName(""); // limpa o input
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTaskStatus(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  return (
    <main>
      <Header />

      <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}
          />
          <Button onClick={addTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        {/* Contadores de tarefas */}
        <div className={styles.taskCounters}>
          <p>Tarefas criadas: <span>{tasksCount}</span></p>
          <p>Concluídas: <span>{completedCount} de {tasksCount}</span></p>
        </div>

        <div className={styles.tasksList}>
          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={() => removeTask(task.id)}
                  toggleTaskStatus={() => toggleTaskStatus(task.id)}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </section>
    </main>
  );
}

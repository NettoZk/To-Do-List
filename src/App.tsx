import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import { PlusCircle } from '@phosphor-icons/react'

import styles from './App.module.css'

import { Button } from './components/Button/Button'
import { Header } from './components/Header/Header'
import { Input } from './components/Input/Input'
import { Empty } from './components/Empty/Empty'
import { Item } from './components/Item/Item'
import { Favoritos } from './pages/Favoritos'

export interface ITask {
  id: number;
  text: string;
  isDone: boolean;
  isFavorite: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputName, setInputName] = useState("")

  const tasksCount = tasks.length
  const completedCount = tasks.filter((t) => t.isDone).length

  function addTask() {
    const trimmedInput = inputName.trim()
    if (trimmedInput.length <= 0) return

    const existTask = tasks.find(
      (t) => t.text.trim().toLowerCase() === trimmedInput.toLowerCase()
    )
    if (existTask) return

    const newTask: ITask = {
      id: Math.random(),
      text: trimmedInput,
      isDone: false,
      isFavorite: false,
    }

    setTasks((prev) => [...prev, newTask])
    setInputName("")
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  function toggleTaskStatus(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    )
  }

  function toggleFavStatus(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
      )
    )
  }

  return (
    <BrowserRouter>
      <Header />
      <nav style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <section className={styles.content}>
            <div className={styles.taskInfoContainer}>
              <Input
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTask()
                }}
              />
              <Button onClick={addTask}>
                Criar
                <PlusCircle size={16} color="#f2f2f2" weight="bold" />
              </Button>
            </div>

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
                      removeTask={removeTask}
                      toggleTaskStatus={toggleTaskStatus}
                      toggleFavStatus={toggleFavStatus}
                    />
                  ))}
                </div>
              ) : (
                <Empty />
              )}
            </div>
          </section>
        }/>

        <Route path="/favoritos" element={<Favoritos tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  )
}

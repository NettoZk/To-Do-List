import { ITask } from '../App'
import { Item } from '../components/Item/Item'
import styles from './Favoritos.module.css'

interface FavoritosProps {
  tasks: ITask[]
  removeTask: (id: number) => void
  toggleTaskStatus: (id: number) => void
  toggleFavStatus: (id: number) => void
}

export function Favoritos({ tasks, removeTask, toggleTaskStatus, toggleFavStatus }: FavoritosProps) {
  const favoritos = tasks.filter((t) => t.isFavorite)

  return (
    <main className={styles.container}>
      <h1>⭐ Favoritos</h1>

      {favoritos.length > 0 ? (
        <div className={styles.list}>
          {favoritos.map((fav) => (
            <Item
              key={fav.id}
              data={fav}
              removeTask={removeTask}
              toggleTaskStatus={toggleTaskStatus}
              toggleFavStatus={toggleFavStatus}
            />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Nenhuma tarefa marcada como favorita ainda.</p>
      )}
    </main>
  )
}
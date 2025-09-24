import { Trash, Check, Star } from '@phosphor-icons/react'
import { ITask } from '../../App'
import styles from './Item.module.css'

interface Props {
  data: ITask
  removeTask: (id: number) => void
  toggleTaskStatus: (id: number) => void
  toggleFavStatus: (id: number) => void
}

export function Item({ data, removeTask, toggleTaskStatus, toggleFavStatus }: Props) {
  const checkboxCheckedClassname = data.isDone
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']
  const paragraphCheckedClassname = data.isDone
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        {/* Botão de favorito */}
        <button
          onClick={() => toggleFavStatus(data.id)}
          className={styles.favButton}
          title={data.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Star
            size={18}
            weight={data.isFavorite ? "fill" : "regular"}
            color={data.isFavorite ? "gold" : "#808080"}
          />
        </button>

        {/* Checkbox + texto */}
        <label htmlFor={`checkbox-${data.id}`} onClick={() => toggleTaskStatus(data.id)}>
          <input readOnly type="checkbox" checked={data.isDone} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.isDone && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.text}
          </p>
        </label>
      </div>

      {/* Botão de remover */}
      <button onClick={() => removeTask(data.id)}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}

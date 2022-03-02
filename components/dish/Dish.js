import cn from 'classnames';
import styles from './Dish.module.css';

export default function Dish({ type, name }) {
  //
  let label = '';

  switch (type) {
    //
    case 'vegan':
      label = 'Vegetariano / Vegetarian';
      break;

    case 'fish':
      label = 'Peixe / Fish';
      break;

    case 'meat':
      label = 'Carne / Meat';
      break;

    default:
      break;
  }

  return (
    <div className={styles.container}>
      <h2
        className={cn({
          [styles.type]: true,
          [styles.vegan]: type == 'vegan',
          [styles.fish]: type == 'fish',
          [styles.meat]: type == 'meat',
        })}
      >
        {label}
      </h2>
      <p className={styles.pt}>{name.pt}</p>
      <p className={styles.en}>{name.en}</p>
    </div>
  );
}

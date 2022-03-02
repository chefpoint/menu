import cn from 'classnames';
import styles from './Day.module.css';
import Dish from '../dish/Dish';

export default function Day({ content }) {
  //

  function isToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const itemDate = new Date(content.date);
    itemDate.setHours(0, 0, 0, 0);
    return today.getTime() === itemDate.getTime();
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-pt', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.today]: isToday(),
        [styles.special]: true,
      })}
    >
      <div className={styles.date}>
        <h1>{formatDate(content.date)}</h1>
      </div>
      <div className={styles.dishes}>
        <Dish type={'vegan'} name={content.vegan} />
        <Dish type={'fish'} name={content.fish} />
        <Dish type={'meat'} name={content.meat} />
      </div>
    </div>
  );
}

import styles from './Info.module.css';

export default function Info({ text }) {
  return <div className={styles.container}>{text}</div>;
}

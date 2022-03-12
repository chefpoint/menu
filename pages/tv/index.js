import menu from '../../data/menu.json';
import Day from '../../components/day/Day';
import Image from 'next/image';
import styles from '../../styles/Tv.module.css';

export default function Home() {
  //

  const filterMenu = menu.filter((item) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);

    return today.getTime() === itemDate.getTime();
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={'/brand/chefpoint-logo-light.svg'} width={500} height={120} alt={'Chef Point - Leading Food & Beverages Solutions'} />
        <p className={styles.message}>
          Full month available at <span>menu.chefpoint.pt</span>
        </p>
      </div>
      <div className={styles.list}>
        {filterMenu.map((item, index) => (
          <Day key={index} content={item}></Day>
        ))}
      </div>
    </div>
  );
}

import styles from '../styles/Home.module.css';

import menu from '../data/menu.json';
import Day from '../components/day/Day';
import Image from 'next/image';
import IconButton from '../components/iconButton/IconButton';

export default function Home() {
  //

  const filterMenu = menu.filter((item) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);

    return today.getTime() <= itemDate.getTime();
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={'/chefpoint-logo.svg'} width={250} height={50} alt={'Chef Point - Leading Food & Beverages Solutions'} />
        <div className={styles.toolbar}>
          <IconButton label={'Contact Us'} href={'mailto:support@chefpoint.pt'} />
        </div>
      </div>
      <div className={styles.list}>
        {filterMenu.map((item, index) => (
          <Day key={index} content={item}></Day>
        ))}
      </div>
    </div>
  );
}

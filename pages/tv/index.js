import useSWR from 'swr';
import Day from '../../components/day/Day';
import Image from 'next/image';
import styles from '../../styles/Tv.module.css';

export default function Home() {
  //

  const { data: menu } = useSWR('/api/*');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={'/brand/chefpoint-logo-light.svg'} width={500} height={120} alt={'Chef Point - Leading Food & Beverages Solutions'} />
        <p className={styles.message}>
          Full month available at <span>menu.chefpoint.pt</span>
        </p>
      </div>
      <div className={styles.list}>{menu ? menu.map((item, index) => <Day key={index} content={item}></Day>) : null}</div>
    </div>
  );
}

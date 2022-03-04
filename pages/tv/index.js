import styles from '../../styles/Tv.module.css';

import menu from '../../data/menu.json';
import Day from '../../components/day/Day';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  //

  const filterMenu = menu.filter((item) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);

    return today.getTime() === itemDate.getTime() || tomorrow.getTime() === itemDate.getTime();
  });

  const size = useWindowSize();

  if (typeof window !== 'undefined') {
    // detect window screen width function
  }

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== 'undefined') {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image src={'/brand/chefpoint-logo-light.svg'} width={500} height={120} alt={'Chef Point - Leading Food & Beverages Solutions'} />
        <p className={styles.message}>
          Full month available at <span>lunch.chefpoint.pt</span>
        </p>
        <p className={styles.message}>
          {size.width}px / {size.height}px
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

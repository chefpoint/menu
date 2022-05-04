import cn from 'classnames';
import useSWR from 'swr';
import { Badge, Switch, Autocomplete, Select, SimpleGrid, TextInput, Grid, Paper, Divider } from '@mantine/core';
import styles from './DayEdit.module.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { apicbaseAPI } from '../../services/apicbase';

export default function DayEdit({ content }) {
  //

  // const { data: recipes } = useSWR('/api/recipes');
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await apicbaseAPI('/products/recipes?page_size=200', 'GET');
      const formated = data.results.map((item) => ({ value: item.id, label: item.name }));
      setRecipes(formated);
      console.log(formated);
    })();
  }, []);

  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.date}>
          <p className={styles.weekday}>Dia da Semana</p>
          <h1 className={styles.monthday}>Mês</h1>
        </div>
        <Badge color='green' variant='dot'>
          Published
        </Badge>
      </div>
      <div className={styles.dishes}>
        <SimpleGrid cols={1}>
          <Switch label='Special Day' size='md' checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} />
          {checked ? (
            <>
              <Grid columns={3}>
                <Grid.Col md={1}>
                  <TextInput placeholder='Choose a flag emoji' label='Special Day Icon' />
                </Grid.Col>
                <Grid.Col md={2}>
                  <TextInput placeholder='Título' label='Título do Dia Especial' />
                </Grid.Col>
              </Grid>
              <Divider variant='dotted' />
            </>
          ) : null}
          <SimpleGrid cols={3}>
            {recipes ? <Select label='Vegan' placeholder='Pick one' searchable nothingFound='No options' data={recipes} /> : null}
            <Autocomplete label='Peixe' placeholder='Pick one' data={['React', 'Angular', 'Svelte', 'Vue']} />
            <Autocomplete label='Carne' placeholder='Pick one' data={['React', 'Angular', 'Svelte', 'Vue']} />
          </SimpleGrid>
        </SimpleGrid>
      </div>
    </div>
  );
}

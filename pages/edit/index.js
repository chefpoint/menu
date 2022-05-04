import { Container, SimpleGrid } from '@mantine/core';
import { Button } from '@mantine/core';
import DayEdit from '../../components/dayEdit/DayEdit';
import { useEffect } from 'react';

export default function Edit() {
  //

  async function initAuth() {
    window.location.assign(
      'https://app.apicbase.com/oauth/authorize/?response_type=code&client_id=' + process.env.NEXT_PUBLIC_APICBASE_CLIENT_ID + '&scope=library'
    );
  }

  return (
    <Container>
      <Button onClick={initAuth}>Login with Apicbase</Button>
      <SimpleGrid cols={1} spacing='lg'>
        <DayEdit></DayEdit>
      </SimpleGrid>
    </Container>
  );
}

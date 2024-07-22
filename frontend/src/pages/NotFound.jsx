import React from 'react'
import { createTheme, MantineProvider } from '@mantine/core';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './css/NotFoundTitle.module.css';

export function NotFound() {
  const theme = createTheme({
    /** Your theme override here */
  });

  const navigate = useNavigate()

  return (
    <MantineProvider theme={theme}>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
          been moved to another URL.
        </Text>
        <Group justify="center">
          <Button variant="subtle" size="md" onClick={() => navigate('/')}>
            Take me back to home page
          </Button>
        </Group>
      </Container>
      </MantineProvider>
  );
}

export default NotFound
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import { Todos } from './components/Todos/Todos';

import { Provider } from "react-redux";
import { store } from "./app/store";


export default function App() {
  return (
    <Provider store={store}>
      <Container maxWidth={false} sx={{ maxWidth: '700px'}}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: 'center' }}>
            Todos
          </Typography>
          <Todos />
        </Box>
      </Container>
    </Provider>
  );
}

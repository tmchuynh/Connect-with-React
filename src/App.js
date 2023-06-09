import './App.css';

import Container from 'react-bootstrap/Container';

import { DoubleNavbar } from './Components/Navbar';
import { CardsCarousel } from './Components/Card';
import { TableSort } from './Components/TableSort';

import styles from './Style_Modules/Main.modules.css';

function App() {

  const data = [
    { name: 'John Doe', email: 'john.doe@example.com', company: 'ABC Corp' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', company: 'XYZ Inc' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', company: 'DEF Co' },
    { name: 'Alice Brown', email: 'alice.brown@example.com', company: 'GHI Ltd' },
    { name: 'Charlie Davis', email: 'charlie.davis@example.com', company: 'JKL LLC' },
  ];

  return (
    <Container>

      <DoubleNavbar className={styles.margin}>
      </DoubleNavbar>
      <CardsCarousel />
      <TableSort data={data} />
    </Container>
  );
}

export default App;

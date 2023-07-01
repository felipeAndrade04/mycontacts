import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  console.log(contacts);
  useEffect(() => {
    fetch('http://localhost:3001/contacts').then(async (response) => {
      const json = await response.json();
      setContacts(json);
    });
  }, []);

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="arrow" />
          </button>
        </header>
      </ListContainer>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Felipe Andrade</strong>
            <small>instagram</small>
          </div>
          <span>felipe2gmail.com</span>
          <span>(88) 98888-8888</span>
        </div>

        <div className="actions">
          <Link to="/edit/123">
            <img src={edit} alt="Edit" />
          </Link>
          <button type="button">
            <img src={trash} alt="Delete" />
          </button>
        </div>
      </Card>
    </Container>
  );
}

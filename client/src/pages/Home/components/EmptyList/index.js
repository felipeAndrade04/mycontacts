import { Container } from './styles';
import emptyBox from '../../../../assets/images/icons/empty-box.svg';

export default function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="empty" />

      <p>
        Você ainda não tem nenhum contato cadastrado! Clique no botão
        <strong> Novo contato</strong> à cima para cadastradar o seu primeiro!
      </p>
    </Container>
  );
}

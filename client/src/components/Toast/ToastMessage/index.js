import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  const { id, text, type } = message;
  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};

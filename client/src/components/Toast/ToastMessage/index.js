import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  const { id, text, type, duration } = message;

  const handleRemoveToast = useCallback(() => {
    onRemoveMessage(id);
  }, [id, onRemoveMessage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleRemoveToast();
    }, duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [handleRemoveToast, duration]);

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
    id: PropTypes.number.isRequired,
    duration: PropTypes.number,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};

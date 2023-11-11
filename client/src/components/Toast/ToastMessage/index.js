import PropTypes from 'prop-types';
import { memo, useCallback, useEffect } from 'react';
import { Container } from './styles';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({ message, onRemoveMessage, isLeaving, animatedRef }) {
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
      isLeaving={isLeaving}
      ref={animatedRef}
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
  animatedRef: PropTypes.shape().isRequired,
  isLeaving: PropTypes.bool.isRequired,
};

export default memo(ToastMessage);

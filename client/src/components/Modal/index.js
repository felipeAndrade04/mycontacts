import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Container, Footer, Overlay } from './styles';
import Button from '../Button';

export default function Modal({
  visible,
  danger,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title}</h1>

        <div className="modal-body">{children}</div>

        <Footer>
          <button className="cancel-button" type="button" onClick={onCancel}>
            {cancelLabel}
          </button>
          <Button danger={danger} type="button" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root')
  );
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};

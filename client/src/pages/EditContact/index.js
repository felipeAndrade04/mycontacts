import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const history = useHistory();
  const { id } = useParams();
  const isMounted = useIsMounted();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contactData);
          setContactName(contactData.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }

    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(data) {
    try {
      const contact = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        category_id: data.category,
      };

      const contactData = await ContactsService.updateContact(id, contact);

      setContactName(contactData.name);
      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}

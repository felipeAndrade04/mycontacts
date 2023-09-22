import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';

export default function Home() {
  async function handleSubmit(data) {
    try {
      const contact = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        category_id: data.category,
      };

      const response = await ContactsService.createContact(contact);
      console.log(response);
    } catch (error) {
      alert('erro ao cadastrar contato');
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  );
}

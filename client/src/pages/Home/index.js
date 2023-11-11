import Loader from '../../components/Loader';
import { Container } from './styles';
import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    isLoading,
    hasError,
    isDeliteModalVisible,
    isLoadingDelete,
    filteredContacts,
    contactBeingDeleted,
    handleCloseDeleteModal,
    contacts,
    searchTerm,
    orderBy,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleConfirmDeleteContact,
    handleDeleteContact,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isEmptyList = !hasError && !isLoading && !hasContacts;
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1;

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}
      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />
      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isEmptyList && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}
      {hasContacts && (
        <>
          <ContactsList
            isDeliteModalVisible={isDeliteModalVisible}
            isLoadingDelete={isLoadingDelete}
            contactBeingDeleted={contactBeingDeleted}
            orderBy={orderBy}
            filteredContacts={filteredContacts}
            onToggleOrderBy={handleToggleOrderBy}
            onConfirmDeleteContact={handleConfirmDeleteContact}
            onDeleteContact={handleDeleteContact}
            onCloseDeleteModal={handleCloseDeleteModal}
          />

          <Modal
            visible={isDeliteModalVisible}
            danger
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel="Deletar"
            isLoading={isLoadingDelete}
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Esta ação não poderá ser desfeita</p>
          </Modal>
        </>
      )}
    </Container>
  );
}

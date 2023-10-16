import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from './App.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { ThreeDots } from 'react-loader-spinner';
import { fetchContacts } from 'redux/thunk';
import {
  selectAllContacts,
  selectError,
  selectIsLoading,
} from 'redux/contactSlice';
import Loader from 'components/Loader/Loader';

export const App = () => {
  const contacts = useSelector(selectAllContacts);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        {isLoading && !error ? <Loader /> : <ContactList />}
        {!contacts.length && (
          <p className={css.message}>There are no contacts in the Phonebook</p>
        )}
      </div>
    </div>
  );
};

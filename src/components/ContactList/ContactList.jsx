import { List } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllContacts } from 'redux/contactSlice';
import { deleteContact } from 'redux/thunk';

export const ContactList = () => {
  const contacts = useSelector(selectAllContacts);
  const dispatch = useDispatch();

  return (
    <List>
      {contacts.map(contact => {
        return (
          <li key={contact.id}>
            <span>{contact.name}</span>
            <span>{contact.phone}</span>
            <button
              type="button"
              onClick={() => {
                dispatch(deleteContact(contact.id));
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </List>
  );
};

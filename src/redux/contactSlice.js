import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './thunk';
import { selectFilterValue } from './filterSlice';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    return builder

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.payload.id);
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          fetchContacts.rejected,
          addContact.fulfilled,
          addContact.rejected,
          deleteContact.fulfilled,
          deleteContact.rejected
        ),

        state => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),

        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled
        ),

        state => {
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),

        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
export const selectContactsArray = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectAllContacts = createSelector(
  [selectContactsArray, selectFilterValue],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

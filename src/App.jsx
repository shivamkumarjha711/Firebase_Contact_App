import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { FiSearch } from 'react-icons/fi';
import { AiFillPlusCircle } from 'react-icons/ai';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config/Firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from './components/ContactCard'
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import NotFoundContact from './components/NotFoundContact';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const {isOpen, onClose, onOpen} = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
        try {
          const contactsRef = collection(db, "contacts");

          onSnapshot(contactsRef, (snapshot) => {
            const contactLists = snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            })
            setContacts(contactLists);
            return contactLists;
          });

        } catch (err) {
;          
        }
    }

    getContacts();

  }, [])

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })

      const filteredContacts = contactLists.filter(contact => 
        contact.name.toLowerCase().includes(value.toLowerCase()))

      setContacts(filteredContacts);
      return filteredContacts;
    });
  }

  return (
   <>
    <div className='mx-auto max-w-[370px] px-4'>
      <Navbar />
      <div className='flex gap-2'>
        <div className='relative flex flex-grow items-center'>
          <FiSearch className='absolute ml-2 text-3xl text-white ' />
          <input 
            onChange={filterContacts}
            type="text" className='h-10 text-white pl-11 flex-grow border border-white bg-transparent rounded-md' />
        </div>
        <AiFillPlusCircle 
          onClick={onOpen}
          className='text-5xl text-white cursor-pointer' />
      </div>
      <div className='mt-4 flex flex-col gap-4'>
        {contacts.length <= 0 ? ( <NotFoundContact/> ) : ( contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        )))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position='bottom-center' />
    </>  
  )
}

export default App

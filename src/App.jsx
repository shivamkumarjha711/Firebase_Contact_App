import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { FiSearch } from 'react-icons/fi';
import { AiFillPlusCircle } from 'react-icons/ai';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/Firebase';
import ContactCard from './components/ContactCard'
import Model from './components/Modal';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
        try {
          const contactsRef = collection(db, "contacts");
          const contactsSnapshot = await getDocs(contactsRef);
          const contactLists = contactsSnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
          setContacts(contactLists)

        } catch (err) {
;          
        }
    }

    getContacts();

  }, [])

  return (
   <>
    <div className='mx-auto max-w-[370px] px-4'>
      <Navbar />
      <div className='flex gap-2'>
        <div className='relative flex flex-grow items-center'>
          <FiSearch className='absolute ml-2 text-3xl text-white ' />
          <input type="text" className='h-10 text-white pl-11 flex-grow border border-white bg-transparent rounded-md' />
        </div>
        <AiFillPlusCircle 
          onClick={onOpen}
          className='text-5xl text-white cursor-pointer' />
      </div>
      <div className='mt-4 flex flex-col gap-4'>{
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
        </div>
      </div>
      <AddAndUpdateContact />
    </>  
  )
}

export default App

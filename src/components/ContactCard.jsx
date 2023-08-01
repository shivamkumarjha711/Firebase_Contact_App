import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';

function ContactCard({ contact }) {
  return (
    <div key={contact.id} className='bg-yellow flex justify-between items-center p-2 rounded-lg'>
    <div className='flex gap-1 items-center'>
     <HiOutlineUserCircle className='text-4xl text-orange' />
    <div className=''>
      <h2 className='font-medium'>{contact.name}</h2>
      <p className='text-sm'>{contact.email}</p>
    </div>
    </div>
    <div className='flex text-3xl'>
      <RiEditCircleLine />
      <IoMdTrash className='text-orange' />
    </div>
  </div>
  )
}

export default ContactCard;
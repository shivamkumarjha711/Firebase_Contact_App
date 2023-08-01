import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from './Modal';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { toast } from 'react-toastify';
import * as Yup from 'yup'

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is required"),
    email:Yup.string().email("Invalid Email").required("Email is required"),
})

const AddAndUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {

    const addContact = async (contact) => {
        try {
            const contactsRef = collection(db, "contacts");
            await addDoc(contactsRef, contact);
            onClose();
            toast.success("Contact Addea Successfully")
        } catch (err) {
            console.log(err);
        }
    };

    const updateContact = async (contact, id) => {
        try {
            const contactsRef = doc(db, "contacts", id);
            await updateDoc(contactsRef, contact);
            onClose();
            toast.success("Contact Updated Successfully")
        } catch (err) {
            console.log(err);
        }
    };

  return (
  <div>
    <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
            initialValues={isUpdate 
                ? {
                name: contact.name,
                email: contact.email,
            } : {
                name: "",
                email: "",
            }
        }
            onSubmit={(values) => {
                console.log(values);
                isUpdate ?
                updateContact(values, contact.id) :
                addContact(values);
            }}
          >
            <Form className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name">Name</label>
                    <Field name="name" className="border h-10" />
                    <div className='text-red-500'>
                        <ErrorMessage name='name' />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email">Email</label>
                    <Field name="email" className="border h-10" />
                    <div className='text-red-500'>
                        <ErrorMessage name='email' />
                    </div>
                </div>

                <button className='bg-orange px-3 py-2 border self-end'>{isUpdate ? "Update" : "Add"} Contact</button>
            </Form>
        </Formik>
    </Modal>
  </div>  
  );
};

export default AddAndUpdateContact
import React from 'react'
import Model from './Model'
import { Form,Field,Formik, ErrorMessage } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
  });

const AddUpdateandDelete = ({isOpen,onClose ,isUpdate ,contact}) => {
     
    const addContact = async (contact) =>{
        try{
            const contactRef = collection(db,"Contacts");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("Contact Added Successfully");
        }catch(error){
            console.log(error)
        }
    }

    const updateContact = async (contact, id) => {
        try {
          const contactRef = doc(db, "Contacts", id);
          await updateDoc(contactRef, contact);
          onClose();
          toast.success("Contact Update Successfully");
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div> <Model isOpen={isOpen} onClose={onClose} >
        <Formik
         validationSchema={contactSchemaValidation} 
         initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
        onSubmit={(values) =>{
            console.log(values)
            isUpdate ? updateContact(values,contact.id):
            addContact(values)
        }}
        >
            <Form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <Field name ="name" className="border h-10"/>
                </div>
                <div className='text-red-500 text-xs'>
                  <ErrorMessage name = "name" />
                </div>
                <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email</label>
                <Field type ="email "name ="email" className="border h-10"/>
                </div>
                <div className='text-red-500 text-xs'>
                  <ErrorMessage name = "email" />
                </div>
                <button className='self-end border bg-orange px-3 py-1.5'>
                        {isUpdate ? "upadte" : "add"} contact
                </button>
            </Form>
        </Formik>
    </Model></div>
  )
}

export default AddUpdateandDelete
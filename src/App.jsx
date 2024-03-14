import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus, FaS } from "react-icons/fa6";
import { collection,getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from './components/ContactCard';
import Model from './components/Model';
import AddUpdateandDelete from './components/AddUpdateandDelete';
import useDisclose from './Hooks/useDisclose';
import NotFoundContact from './components/NotFoundContact';

const App = () => {

 const[contacts,setContacts] = useState([]);
 const {isOpen,onClose,onOpen} = useDisclose()

 useEffect(()=>{
  const getContacts = async () => {
    try{
      const contactRef = collection(db,"Contacts");
      onSnapshot(contactRef, (snapshot) => {
        const contactLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
        return contactLists;
      });


    }catch(error){
      console.log(error);
    }
  }
  getContacts();  
 },[]);

 
 const filterContacts = (e) => {
  const value = e.target.value;

  const contactsRef = collection(db, "Contacts");

  onSnapshot(contactsRef, (snapshot) => {
    const contactLists = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const filteredContacts = contactLists.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );

    setContacts(filteredContacts);

    return filteredContacts;
  });
};

  return (
    <>
    <div className='max-w-[370px] mx-auto'>
      <Navbar />
  <div className='flex gap-2'>
  <div className='flex relative items-center '>
     <FiSearch className='text-white absolute text-3xl ml-1'/>
        <input onChange={filterContacts} type="text" className="border border-white bg-transparent h-10 rounded-md flex-grow px-4 text-white pl-9 w-[314px]" />
      </div>
        <FaCirclePlus onClick={onOpen} className="text-white text-5xl cursor-pointer " />
  </div>
    <div className='mt-4 flex flex-col gap-3'>
      {contacts.length <= 0 ? <NotFoundContact />: contacts.map((contact)=>(
         <ContactCard key={contact.id} contact={contact}/>
        ))}
    </div>
      </div>
      <AddUpdateandDelete onClose={onClose} isOpen={isOpen} />
      <ToastContainer />
      </>
  )
}

export default App
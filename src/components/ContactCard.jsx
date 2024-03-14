import { deleteDoc,doc } from "firebase/firestore";
import {HiOutlineUserCircle} from "react-icons/hi";
import {IoMdTrash} from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddUpdateandDelete from "./AddUpdateandDelete";
import { useState } from "react";
import useDisclose from "../Hooks/useDisclose";
import { toast } from "react-toastify";
const ContactCard = ({contact}) => {
  
  const {isOpen,onClose,onOpen} = useDisclose()

  
    const deleteContact = async (id) =>{
        try{

            await deleteDoc(doc(db,"Contacts",id));
            toast.success("Contact Deleted Successfully")
        }catch(error)
        {

        }
    }

  return (
    <>
    <div key={contact.id} className="bg-yellow rounded-lg flex justify-around items-center p-2 ">
    <div className='flex gap-4'>
    <HiOutlineUserCircle className='text-orange text-4xl'/>
      <div className="">
        <h2 className="font-medium">{contact.name}</h2>
        <p className="text-sm">{contact.email}</p>
      </div>
      <div>
    </div>
    <div className='flex text-3xl'>
        <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
        <IoMdTrash onClick={()=>deleteContact(contact.id)}className="text-orange cursor-pointer" />
        </div>
      </div>
    </div>
    <AddUpdateandDelete contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default ContactCard
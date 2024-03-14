import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Model = ({onClose,isOpen,children}) => {
  return  createPortal(
    <>{isOpen && (
    <>    <div className=" relative  m-auto z-50 min-h-[200px] max-w-[20vw] bg-white p-4">
        <div className="flex justify-end">
            <AiOutlineClose onClick={onClose} className="text-2xl"/>
        </div>
        {children}
    </div>
   
    <div 
    className="absolute top-0 z-40  h-screen w-screen backdrop-blur">

    </div>
    </>

    )}
    </>
  ,document.getElementById("model"));
};

export default Model
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({onClose, isOpen, children}) => {

  return createPortal(
  <>
  {isOpen && (
    <>
        <div className="m-auto relative z-50 min-h-[200px] max-w-[80%] bg-white p-4">
          <div className="flex justify-end">
            <AiOutlineClose onClick={onClose} className="text-2xl self-end cursor-pointer" />
          </div>
            {children}
        </div>
        <div onClick={onClose} className=" backdrop-blur h-screen w-screen absolute top-0 z-40" />
    </>
  )}
  </>
  , document.getElementById("modal-root")
  ); 
};

export default Modal;
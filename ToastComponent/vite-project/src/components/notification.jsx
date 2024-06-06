/* eslint-disable react/prop-types */
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai"; 
import "./notification.css";
import { useRef ,useEffect} from "react";

const iconStyles = {marginRight: "10px"};
const icons = {
  success: <AiOutlineCheckCircle style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />,
};

 const animations = {
  fade :"fadeIn",
  pop  :"popup",
  slide:"slideIn",
 };

const Notification = ({type = "info", message, onClose = () => {}} , animation = "slide") => {
  const notificationRef = useRef(null)
  useEffect(() =>{
    if(notificationRef.current){
      notificationRef.current.focus();
    }
  },[])
  const ariaRole = type === "error" ||type === "warning"?"alert":"status";
  const ariaLive =  type === "error" ||type === "warning"?"assertive":"polite";
  return (
    <div className={`notification ${type} ${animations[animation]}`}
    role={ariaRole}
    aria-live={ariaLive}
    tabIndex={-1}
    ref={notificationRef}
    >
      {/* icon */}
      {icons[type]}
      {/* message */}
      {message}
      {/* close button */}

      <button onClick={() => onClose()}  className="closeBtn"></button>

      <AiOutlineClose
        color="white"
       
        
      />
    </div>
  );
};

export default Notification;
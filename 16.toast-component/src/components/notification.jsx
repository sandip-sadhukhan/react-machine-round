import React, { useEffect, useRef } from 'react'
import
{
    AiOutlineCheckCircle,
    AiOutlineClose,
    AiOutlineCloseCircle,
    AiOutlineInfoCircle,
    AiOutlineWarning
} from 'react-icons/ai'
import './notification.css'

const iconStyles = {marginRight: "10px"};

const icons = {
  success: <AiOutlineCheckCircle style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles}/>,
  warning: <AiOutlineWarning style={iconStyles}/>,
  error: <AiOutlineCloseCircle style={iconStyles}/>
}

const animations = {
  fade: "fadeIn",
  pop: "popup",
  slide: "slideIn"
}

const Notification = ({
  type = "info",
  message,
  onClose,
  animation="slide",
}) => {
  const notificationRef = useRef(null);
  const ariaRole = ["error", "warning"].includes(type) ? "alert" : "status";
  const ariaLive = ["error", "warning"].includes(type) ? "assertive": "polite";

  useEffect(() => {
    if (notificationRef.current) {
      notificationRef.current.focus();
    }
  }, [])

  return (
    <div
      className={`notification ${type} ${animations[animation]}`}
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
      <button className='closeBtn' onClick={() => onClose()}>
        <AiOutlineClose
          className='closeBtn'
          color="white"
        />
      </button>
    </div>
  )
}

export default Notification
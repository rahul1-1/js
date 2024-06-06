import { useCallback, useState } from "react";
import Notification from "../components/notification";
import { v4 as uuidv4 } from "uuid";
const useNotification = (position = "top-right") => {
  const [notifications, setNotifications] = useState([]);

  const triggerNotification = useCallback((notificationProps) => {
    const toastId = uuidv4();
    setNotifications((prevNotification) => [
      ...prevNotification,
      {
        id: toastId,
        ...notificationProps,
      },
    ]);
    setTimeout(() => {
      setNotifications((prevNotification) =>
        prevNotification.filter((n) => n.id !== toastId)
      );
    }, notificationProps.duration);
  }, []);

  const handleNotificationClose = (index) =>{
    setNotifications((prevNotification)=>{
        const updatedNotification = [...prevNotification];
        updatedNotification.splice(index,1);
        return updatedNotification;
    })
  }

  const NotificationComponent = (
    <div className={`notification-container ${position} ${position.split("-")[0]}`}>
      {notifications.map((notification,index) => {
        return <Notification key={notification.id} {...notification}
        onClose={()=>handleNotificationClose(index)}
        />;
      })}
    </div>
  );
  return { NotificationComponent, triggerNotification };
};

export default useNotification;

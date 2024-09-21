import React, { useCallback, useState } from "react";
import Notification from "../ts-components/notification";
import {v4 as uuidv4} from "uuid"

type Position = "bottom-left" | "bottom-right" | "top-left" | "top-right";

interface NotificationProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  duration: number;
  animation?: "fade" | "pop" | "slide";
}


interface UseNotificationReturn {
  NotificationComponent: JSX.Element;
  triggerNotification: (notificationProps: NotificationProps) => void;
}

const useNotification = (position:Position="top-right"):UseNotificationReturn => {
  const [notifications, setNotifications] = useState<(NotificationProps & {id: string})[]>([]);

  const triggerNotification = useCallback((notificationProps: NotificationProps) => {
    const toastId = uuidv4()

    setNotifications(prevNotifications => [...prevNotifications,
      {id: toastId, ...notificationProps}]);

    setTimeout(() => {
      setNotifications(prevNotifications => prevNotifications.filter(n => n.id !== toastId));
    }, notificationProps.duration)
  }, []);

  const handleNotificationClose = (index:number) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = [...prevNotifications]
      updatedNotifications.splice(index, 1);
      return updatedNotifications;
    })
  }

  const NotificationComponent = (
    <div className={`notification-container ${position} ${position.split("-")[0]}`}>
      {
        notifications.map((notification, index) => {
          return <Notification key={notification.id} {...notification} onClose={() => handleNotificationClose(index)} />
        })
      }
    </div>
  );

  return {NotificationComponent, triggerNotification}
}

export default useNotification;
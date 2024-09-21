import './App.css'
import Notification from './components/notification'
import useNotification from './hooks/use-notification'

function App() {
  const {NotificationComponent, triggerNotification} = useNotification("bottom-right")

  return (
    <>
    <h1>Notification component</h1>
    <button
      onClick={() => triggerNotification({
        type: "success",
        message: "File Sent Successfully",
        duration: 3000,
        animation: "fadeIn"
      })}
    >
      Trigger success
    </button>

    <button
      onClick={() => triggerNotification({
        type: "error",
        message: "File Sent Failed",
        duration: 3000
      })}
    >
      Trigger failed
    </button>

    {NotificationComponent}
    </>
  )
}

export default App

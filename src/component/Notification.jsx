import React, { useEffect, useState } from 'react'
import { onMessagingListener, requestPermission } from '../firebase'
import toast, { Toaster } from 'react-hot-toast';

export default function Notification() {

    const [notification, setNotification] = useState({title: "", body: ""})

    useEffect(()=> {
        requestPermission();

        const unsubscribe = onMessagingListener().then(payload => {
            setNotification({
                title: payload?.notification?.title,
                body: payload?.notification?.body
            })

            // test Notification

        toast.success(`${payload?.notification?.title}: ${payload?.Notification?.body}`, {
            duration: 6000,
            position: "top-right"
        })
        })

        return () => {
            unsubscribe.catch(err => console.log("failed", err))
        }
        
    }, [])
  return (
    <div>
      <Toaster/>
    </div>
  )
}

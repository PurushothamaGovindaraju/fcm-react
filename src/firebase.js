import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCEc_rHUl3Xf3-w4EB3090i5D0PLXb27zs",
  authDomain: "fcm-testing-trial.firebaseapp.com",
  projectId: "fcm-testing-trial",
  storageBucket: "fcm-testing-trial.appspot.com",
  messagingSenderId: "280603612235",
  appId: "1:280603612235:web:f55ed5edce12ffad1a29ce",
  measurementId: "G-H4NCLFXYFE",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log("Requesting user permission");

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User permission Granted.");

      return getToken(messaging, {
        vapidKey:
          "BKgDXheix_f1bm1Bnk5GGlaPPJwzwG_9gcg27NRhDtfBJfdr781yWoafh4n0SUwljc-H_Dtwpcv-mTc-ZTv7lw8",
        
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client token", currentToken);
          } else {
            console.log("Failed to granted the app registration token.");
          }
        })
        .catch((err) => {
          console.log(
            "Error has been generated when requesting to access token",
            err
          );
        });
    } else {
      console.log("User Permission Denied");
    }
  });
};

requestPermission();

export const onMessagingListener = () => {
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAh6qZTHtPOwTbhZslGA-pIKQdthm9dqlg",
    authDomain: "reactfirebaseblog-5a9a8.firebaseapp.com",
    projectId: "reactfirebaseblog-5a9a8",
    storageBucket: "reactfirebaseblog-5a9a8.appspot.com",
    messagingSenderId: "922560035890",
    appId: "1:922560035890:web:f371b9252259cf14ee902b"
  };

const app = initializeApp(firebaseConfig)

const auth = getAuth()

const db = getFirestore(app)

const storage = getStorage(app)

export {
	app as default,
  auth,
	db,
  storage,
}
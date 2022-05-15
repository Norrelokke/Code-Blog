import  { useState, useEffect } from 'react'
import { db, storage } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL , uploadBytesResumable } from 'firebase/storage'
import { useAuthContext } from '../contexts/AuthContext'
import { updateProfile } from 'firebase/auth'

const usefileUpload = (file) => {
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState(null)
    const [url, setUrl] = useState(null)
    const { currentUser } = useAuthContext()

    useEffect(() => {
        const storageRef = ref(storage, `${currentUser.uid}/profileimages/ ${file.name}`);
        const collectionRef = collection(db, 'profileimages');
        
        uploadBytesResumable(storageRef, file).on('state_changed', (snap) => {
          setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100))
        }, (e) => {
          setMessage(e);
        }, async () => {
          const url = await getDownloadURL(storageRef);
          setUrl(url);

          updateProfile(currentUser, {
            	photoURL: url,
            })
            
          await addDoc(collectionRef, {
            created: serverTimestamp(),
            filename: file.name,
            owner: currentUser.uid,
            path: storageRef.fullPath,
            size: file.size,
            type: file.type,
            url,
          })

        });
      
      }, [file]);

        return { progress, url, message }
}

export default usefileUpload

import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useGetPosts = (params = {}) => {
    const { currentUser  } = useAuthContext()
      const colImagesRef = collection(db, 'blogposts')
  
    const queryKey = ['blogposts']
  
    const queryRef = params.fetchUserPosts
    ? query(colImagesRef, where('owner', '==', currentUser.uid))
    : query(colImagesRef)
  
      const postQuery = useFirestoreQueryData(queryKey, queryRef, {
      subscribe: true,
      }, {
      refetchOnMount: 'always',
    })
  
      return postQuery
  }
  
  export default useGetPosts;

import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const deletePost = async (post) => {

  try {
    await deleteDoc(doc(db, "blogposts", post))

  } catch (e) {
    console.log(e)
  }
  return { deletePost }
}


export default deletePost
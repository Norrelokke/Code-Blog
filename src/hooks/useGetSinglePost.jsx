import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const useGetSinglePost = (id) => {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState()

	useEffect(() => {
        setLoading(true)
        const ref = doc(db, 'blogposts', id)
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (!snapshot.exists()) {
                setData(false)
                setLoading(false)
                return
            }
            setData(snapshot.data())
            setLoading(false)
        })

        return  unsubscribe

	}, [id])

	return {
		loading,
		data,
	}
}

export default useGetSinglePost
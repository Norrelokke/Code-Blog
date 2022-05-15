import React, { useRef, useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Form, Button, Container } from 'react-bootstrap'
import { db, storage } from '../firebase'
import { serverTimestamp, doc, setDoc } from 'firebase/firestore'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from '../contexts/AuthContext'

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const CreatePost = () => {

  const module = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const [value, setValue] = useState();
  const { currentUser } = useAuthContext()
  const [imgUrl, setImgUrl] = useState(null)
  const imgUrlref = useRef()

  const id = uuidv4();
  const [message, setMessage] = useState(null)
  const [url, setUrl] = useState(null)

  const handleQuillChange = value => {
    setValue(value)
  }
  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected && selected.type.includes('image')) {
      setImgUrl(selected);
    } else {
      setImgUrl(null);
      setMessage({
        type: "warning",
        msg: 'File must be an image'
      });
    }
  };

  const inputHeading = useRef()
  const inputDesc = useRef()
  const inputTags = useRef()

  const handleSubmit = async e => {

    e.preventDefault()
    if (!inputHeading.current.value.length && !inputDesc.current.value.length && !inputTags.current.value.length) {
      return
    }
    /*----image upload -----*/

    const imagefileRef = ref(storage, `${currentUser.uid}/blogpostimages/` + id)
    uploadBytesResumable(imagefileRef, imgUrl).on('state_changed', (snap) => {
    }, (e) => {
      setMessage(e);
    }, async () => {

      const url = await getDownloadURL(imagefileRef)
      setUrl(url);

      /*----image upload -----*/


      await setDoc(doc(db, 'blogposts', id), {
        postid: id,
        url,
        heading: inputHeading.current.value,
        desc: inputDesc.current.value,
        tags: inputTags.current.value,
        timestamp: serverTimestamp(),
        owner: currentUser.uid,
        value,

      })
      inputHeading.current.value = ''
      inputDesc.current.value = ''
      inputTags.current.value = ''
    })
  }

  return (

    <>
      <Container fluid className="grey">
        <Container className="py-3">
          <p>Image</p>
          <input type="file" ref={imgUrlref} onChange={handleChange} />
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-2" controlId="title">
              <Form.Label>Heading</Form.Label>
              <Form.Control type="text" ref={inputHeading} />
              <Form.Label>Desc</Form.Label>
              <Form.Control type="text" ref={inputDesc} />
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" ref={inputTags} />
            </Form.Group>
            <div className="editorstyle">
              <div className="container">

                <ReactQuill
                  className="ql-toolbar"
                  theme="snow"
                  onChange={handleQuillChange}
                  modules={module}
                  formats={formats}
                />
              </div>
              <div className="col-md-12 text-center">
                <Button className="text-center" type="submit" variant="primary">Create post</Button></div>
            </div>

          </Form>

        </Container>
      </Container>
    </>
  )
}

export default CreatePost

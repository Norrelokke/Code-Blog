import React, { useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import Image from './image'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UploadImg = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);

  const handleUpload = (e) => {
    let selected = e.target.files[0];

    if (selected && selected.type.includes('image')) {
      setFile(selected);

    } else {
      setFile(null);
      setMessage({
        type: "warning",
        msg: 'File must be an image'
    });
    }
  };

  return (
      <div  className="UploadForm">
    <Form>
        	{message && <Alert variant={message.type}>{message.msg}</Alert>}
          <div className="image-upload">
      <label htmlFor="file-input">
      <FontAwesomeIcon className="blogcogicon" icon={faPen}/>
        <input id="file-input" type="file" onChange={handleUpload} />
      </label>
      </div>
      <div className="output">

        { file && <Image file={file} setFile={setFile}/> }
      </div>
    </Form>
    </div>
  );
}

export default UploadImg;
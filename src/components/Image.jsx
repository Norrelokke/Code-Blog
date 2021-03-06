import React, { useEffect } from 'react';
import usefileUpload from '../hooks/usefileUpload';

const Images = ({ file, setFile }) => {
  const { progress, url } = usefileUpload(file);
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <>

    </>
  );
}

export default Images;
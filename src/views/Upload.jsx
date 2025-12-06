import {useForm} from "../hooks/formhooks.js";
import {useState} from "react";
import {useFile, useMedia} from "../hooks/apiHooks.js";
import {useNavigate} from "react-router";

const Upload = () => {
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: ''
  }


  const [file, setFile] = useState(null);

  const {postFile} = useFile();
  const {postMedia} = useMedia();

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    try {
      const fileData  = await postFile(file, localStorage.getItem('token'));
      const responce = postMedia(fileData, inputs, localStorage.getItem('token'));
      console.log(responce);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(doUpload, initValues);

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://placehold.co/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;

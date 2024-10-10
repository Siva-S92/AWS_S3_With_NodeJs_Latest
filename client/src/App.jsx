import React, { useState } from "react";
import { Modal } from "antd";
import axios  from 'axios'

function App() {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [butndisabled, setButndisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileuploader = (e) => {
    const selectFile = e.target.files[0];
    let url = URL.createObjectURL(selectFile);
    setFile(selectFile);
    // setImgUrl(url);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { file };
    try {
      const res = await axios.post(`http://localhost:3080/api/getuploaded-files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = res.data;
      if (data.success) {
        setButndisabled(false);
        setImgUrl(data.fileUrl)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="container w-full max-w-6xl mx-auto py-5">
      <h1 className="text-3xl text-gray-500 font-bold underline text-center">
        Upload your images at AWS-S3 bucket
      </h1>
      <form onSubmit={handleSubmit} className="mt-10 pl-[40%]">
        <div>
          <label className="text-red-500" htmlFor="filechoosen">
            upload your images:
          </label>
          <br />
          <input
            className="inline-block"
            type="file"
            accept="image/*"
            id="filechoosen"
            name="filechoosen"
            onChange={fileuploader}
          />
        </div>

        <div className="flex my-3">
        <button
            type="button"
            disabled={butndisabled}
            className="px-6 py-1 border rounded-md bg-blue-500 text-white disabled:opacity-40"
            onClick={showModal}
          >
            preview
          </button>

          <button
            type="submit"
            className="px-6 py-1 border rounded-md bg-blue-500 text-white"
          >
            submit
          </button>
          
        </div>
      </form>

      {/* antd modal */}
      <Modal
        title="Uploaded Image"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>It the file you have uploaded...</p>
        <img src={imgUrl} alt="image is not available" />
      </Modal>
    </main>
  );
}

export default App;

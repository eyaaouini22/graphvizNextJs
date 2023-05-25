import { log } from "console";
import { useState } from "react";
import axios from "axios";
 import { ToastContainer, toast } from 'react-toastify';
const Upload=()=>{
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();
  



  const handleUpload = async () => {
    try {
      setUploading(true);
      if (!selectedFile) return;
      const formData = new FormData();
       formData.append("file", selectedFile);
       console.log(   formData);
      const { data } = await axios.post("http://localhost:8084/graph/upload", formData);
       console.log(data);
       toast.success('Success message')
          } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };
    

    return (
      
        <div className="max-w-4xl mx-auto p-20 space-y-6">

          <label htmlFor="dropzone-file" className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>

    <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Gravphiz file</h2>

    <p className="mt-2 text-gray-500 tracking-wide">Upload or darg & drop your file your gravphiz file (.dot , .gv) </p>

    <input id="dropzone-file" type="file" className="hidden"   onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                   setSelectedFile(file);
                }
              }}/>
 






          
          </label>
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{ opacity: uploading ? ".5" : "1" }}
            className="bg-blue-700 p-3  u-full-width text-center rounded text-white"
          >
            {uploading ? "Uploading.." : "Upload"}
          </button>
         {/* <div className="mt-20 flex flex-col space-y-3">
            {dirs.map((item) => (
              <Link key={item} href={"/images/" + item}>
                <a className="text-blue-500 hover:underline">{item}</a>
              </Link>
            ))}*/}
       
        </div>
      );
    };





export default Upload;


import axios from 'axios';
import { log } from 'console';
import React, { useState } from 'react'
interface MyComponentProps {
    file: any;
   }
const FileCard = ({file }:any) => {
 console.log(file);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isVisible, setIsVisible] = useState(false);
 const [inputValue, setInputValue] = useState('');
 const [imageUrl, setimageUrl] = useState('');

 const handleChange = (event:any) => {
   setInputValue(event.target.value);
   console.log(event.target.value);
 };
 const handleClick = () => {
  setIsVisible(!isVisible);
};



const handleUpload = async () => {
  try {
    console.log(file.name);
    console.log(inputValue);

    //  const response = await axios.get("http://localhost:8084/graph/render", {
    //   params: {
    //     fileName: file.name,
    //     params: inputValue
    //   }});

      const response = await axios.get("http://localhost:8084/graph/renderByte", {
        params: {
          fileName: file.name,
          params: inputValue
        }});

        // let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
      setIsModalOpen(true);
      // const base64String = btoa(String.fromCharCode(...response.data));
// console.log(response.data);
    // const blob = new Blob([response.data], {type: 'image/png'});
  // const url=URL.createObjectURL(blob);
  // const base64Image = btoa(
  //   new Uint8Array(response.data).reduce(
  //     (data, byte) => data + String.fromCharCode(byte),
  //     ''
  //   )
  // ); 
   setimageUrl(response.data);
  // console.log(response.data);
    //  console.log("imgurl", response.data);
  } catch (error: any) {
    console.log(error.response?.data);
  }
 
};
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{file.name}</h2>
        <p className="text-gray-600 mb-2">{file.size}</p>
        <p className="text-gray-600 mb-2">{file.createdAt}</p>
        {/* <div className='relative '> */}
   <a href={file.url} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Download</a> 
     <button  className="bg-blue-500 u-float-right text-white py-2 px-4 rounded-lg hover:bg-blue-600 m-t-_8"   onClick={handleClick}>Generate</button>  
         <div  style={{ display: isVisible ? 'block' : 'none' }}  className='relative p-t-10'>
        <input   type="text" id="default-search" onChange={handleChange}  value={inputValue}  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="please enter parameters " />
            <button  onClick={handleUpload}  type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">ok</button>
        
            {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Generated image</h3>
                <div className="mt-2">
                <div>
      <img src= {`data:image/png;base64,${imageUrl}`} />
    </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={() => setIsModalOpen(false)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        
        
        
        </div> 
      </div>
    </div>
  )
}

export default FileCard

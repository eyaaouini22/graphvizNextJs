import React, { useEffect, useState } from 'react'
import FileCard from './FileCard'
import { graphviz } from '~/pages/api/graphviz';
import { GetServerSideProps, NextPage } from 'next';
import fetchFilesList from '~/service/graphvizService';
import axios from 'axios';
//interface Props {
  //fileList: 
//}

const FileList =() =>{
  
  
  const [graphvizArray, setGraphvizArray] = useState<graphviz[]>([]); // Initialize an empty array of the correct type

  useEffect(() => {
    async function fetchData() { 
      try{
      const response = await axios.get<graphviz[]>('http://localhost:8084/graph/list');
      setGraphvizArray(response.data); 
        }
      catch (error: any) {
         console.log(error.response?.data);
      }
    }
        
        // const fetchedGraphvizArray = await response.json(); // Parse the response into an array of Graphviz objects
    // Update the state with the fetched array
    
    fetchData();
  }, []);
  //const [files, setFiles] = useState( []);
//  const files = async () => {
    //const fileList =  async () => {
     // const fileList = await fetchFilesList();
    //setFiles(fileList);
      
    //};

  return (
    <div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {graphvizArray.map((file, index) => (
        <FileCard key={index} file={file} />
      ))}
    </div>
  )
}
//export const getServerSideProps: GetServerSideProps = async () => {
 // const fileList = await fetchFilesList();
  //console.log("works")
  //return {
    //props: { fileList },
  //};
//};

export default FileList

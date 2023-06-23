import React, { useEffect, useState } from 'react';
import ProductTable from './productTable';
import axios from 'axios';
import { graphviz } from '~/pages/api/graphviz';
import { productOffer } from '~/pages/api/productOffer';
import { groupProduct } from '~/pages/api/groupProduct';
 
const RecordsComponent = () => {
 
   const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // totale page numbers
const[searchByNameInputValue , setSearchByNameInputValue]= useState("");
const[searchByName, setSearchByName]= useState("");

  const handleChange=(event:any)=>{
setSearchByNameInputValue(event.target.value);
  }
  const searchByNameEvent=()=>{
    setSearchByName(searchByNameInputValue);
      }
   // Pagination component
   const Pagination = () => {
    const pageNumbers = [];

    // Calculate the range of visible page numbers based on the current page
    let startPage, endPage;
    if (totalPages <= 10) {
      // Less than or equal to 10 pages, show all page numbers
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than 10 pages, show a limited number of page links
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // Generate the array of page numbers to display
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="flex justify-center mt-4">
        {/* Previous page link */}
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
            >
              &laquo;
            </button>
          </li>
        )}

        {/* Page links */}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => handlePageChange(pageNumber)}
              className={`${
                pageNumber === currentPage
                  ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4'
                  : 'bg-white hover:bg-gray-200 text-blue-500 font-bold py-2 px-4'
              } rounded-l-none`}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {/* Next page link */}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            >
              &raquo;
            </button>
          </li>
        )}
      </ul>
    );
  };
  // Handle page change
  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
   };

     const [groupProducts, setGroupProducts] = useState<groupProduct[]>([]); // Initialize an empty array of the correct type

       const [isModalOpen, setIsModalOpen] = useState(false);
       const [image, setimage] = useState('');
       const generateImage = async () => {
        try {
            const response = await axios.get("http://localhost:8082/group-graph/converter/generateGroupGraph")
             setIsModalOpen(true);
         setimage(response.data);
         } catch (error: any) {
          console.log(error.response?.data);
        }
       
      };

      useEffect(() => {
        const fetchData = async () => {
          console.log("value",searchByName)
          try {
            const response = await axios.get('http://localhost:8082/group-graph/products', {
              params: {
                size:100,
                page: currentPage,
                productName: searchByName
              }});
            const jsonResponse = response.data;
            const parsedContent: groupProduct[] = jsonResponse.data.content;
            setGroupProducts(parsedContent);
              setTotalPages(jsonResponse.data.totalPages);
           } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [currentPage,searchByName]);
    

   
 
 
  return (
    <div>
      <h1 style={{fontSize: "20",marginBottom: "20px"}}>Product offers

      <div className="max-w-2xl mx-auto">

  
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
      <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="search"  onChange={handleChange}  value={searchByNameInputValue} id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search product's name" />
          <button type="submit"    onClick={searchByNameEvent}   className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
      
  
  </div>

        {/* <button  style={{marginLeft: "20px"}} className="bg-blue-500  text-white py-2 px-4 rounded-lg hover:bg-blue-600 m-t-_8"   onClick={generateImage}>show group graph</button>   */}
       </h1>
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
  <img src= {`data:image/png;base64,${image}`} />
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
    


            <ProductTable groupProducts={groupProducts} />
            <Pagination />
    </div>
  );
};

export default RecordsComponent;

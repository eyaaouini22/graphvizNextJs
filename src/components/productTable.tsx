import axios from "axios"
import React, { useEffect, useState } from "react"
import { groupProduct } from "~/pages/api/groupProduct"
 import { useRouter } from 'next/router';
import { tree } from "next/dist/build/templates/app-page";
 interface ProductTableProps {
  groupProducts: groupProduct[];
  setGroupProducts: (newValue: groupProduct[]) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ groupProducts ,setGroupProducts}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colorsMap, setColorsMap] = useState<Record<string, string>>({})
   const [image, setimage] = useState("");
   const [dot, setDot] = useState("digraph { a -> b }  ")

  const [groupingKeyTypes, setGroupingKeyTypes] = useState<String[]>([])
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
 
 
    const router = useRouter();
  
    // const generateDot = (id: string) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("GET", "http://localhost:8082/group-graph/products/generateGraphByGID/" + id, false); // `false` makes the request synchronous
    //   xhr.send();
    
    //   if (xhr.status === 200) {
    //     let response;
    //     try {
    //       response = JSON.parse(xhr.responseText);
    //       console.log("my response", response);
    //       setDot(response);
    //     } catch (error) {
    //       console.error("Error parsing JSON:", error);
    //       // Handle the error when JSON parsing fails
    //     }
    //   } else {
    //     console.log("Request failed. Status: " + xhr.status);
    //     // Handle the failed request here
    //   }
    // };
    

  const generateDot =  async (id: String)  => {
    try {
      const response =  await axios.get(
        "http://localhost:8082/group-graph/products/generateGraphByGID/" + id
      )
      console.log("myrespone",response.data)

      setDot(response.data);

      router.push({
        pathname: '/vizWebSite',
        query: { dot: response.data}
      });
  
     } catch (error: any) {
      console.log(error.response?.data)
     }
  }

  const handleGoToGraph = async (id:string) => {
      
    try{
      const test = await generateDot(id);
             console.log("myrespone",test)

             await  router.push({
         pathname: '/vizWebSite',
         query: { dot: dot}
       });
     } catch (error: any) {
       console.log(error.response?.data)
     }
    }
  const generateImage = async (id: String) => {
    try {
      const response = await axios.get(
        "http://localhost:8082/group-graph/converter/generateProducOffer/" + id
      )
      setIsModalOpen(true)
      setimage(response.data)
    } catch (error: any) {
      console.log(error.response?.data)
    }
  }
  const generateRandomColor = (): string => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  // Apply colors to grouping keys
  const applyGroupingKeyColors = async () => {
    const newColorsMap: Record<string, string> = {}
    const groupingKeyCounts: Record<string, number> = {}

    groupProducts.forEach((groupProduct) => {
      console.log("numne", groupProduct.offersNumber);
      groupProduct.offers.forEach((offer) => {
        offer.groupingKeys.forEach((groupingKey) => {
          if (!groupingKeyTypes.includes(groupingKey.type)) {
            groupingKeyTypes.push(groupingKey.type);
            console.log(groupingKeyTypes);
          }
          const { type, value } = groupingKey
          const key = `${type}-${value}`
          // Increment the count for the grouping key value
          groupingKeyCounts[key] = (groupingKeyCounts[key] || 0) + 1
        })
      })
    })

    // Assign colors to similar grouping key values
    Object.keys(groupingKeyCounts).forEach((key) => {
      const count = groupingKeyCounts[key]
      if (count > 1) {
        if (!newColorsMap[key]) {
          // Generate a random color for the grouping key value
          const color = generateRandomColor()
          newColorsMap[key] = color
         // console.log("map", newColorsMap)
        }
      }
    })
    setColorsMap(newColorsMap)
  }
    // Sort the groups array based on the selected column and sorting order

  const handleSort = (column:string) => {
    if (column === sortColumn) {
      // If the same column is clicked, toggle the sorting order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set the new column and reset the sorting order
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  


  useEffect(() => {
    applyGroupingKeyColors()
  }, [groupProducts])

  
  useEffect(() => {
    const sortedGroups = [...groupProducts].sort((a, b) => {
      if (sortColumn === "gID") {
        return sortOrder === "asc"
          ? a.gId.localeCompare(b.gId)
          : b.gId.localeCompare(a.gId);
      }
    else  if (sortColumn === "productName") {
        return sortOrder === "asc"
          ? a.offers[0].productName?.localeCompare(b.offers[0].productName)
          : b.offers[0].productName?.localeCompare(a.offers[0].productName);
      }
   else   if (sortColumn === "brandName") {
     const brandNameA=   a.offers[0].brandName? a.offers[0].brandName:"";
     const brandNameB=  b.offers[0].brandName? b.offers[0].brandName:""
        return sortOrder === "asc"
          ?  brandNameA.localeCompare(brandNameB)
          : brandNameB.localeCompare(brandNameA);
      }
      else 
      {
        return sortOrder === "asc"
        ? a.offersNumber-b.offersNumber
        : b.offersNumber-a.offersNumber



      }
      // Add additional cases for sorting other columns if needed
      return 0;
    });
    setGroupProducts(sortedGroups);
     console.log("hello test sort")
  }, [sortColumn,sortOrder])

  return (
    <div className="overflow-x-scroll overflow-y-scroll max-h-[800px] max-w-[1500px]">
      <table className="table-auto  border border-gray-300 min-w-max">
        <thead className="sticky top-0 bg-gray-200 z-1">
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider">
              #
            </th>{" "}
            {/* Add the new column */}

            <th className="px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider" onClick={() => handleSort("gID")}>
            Group Id
  {sortColumn === "gID" && (
<span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
    // <span className="ml-1">
    //   {sortOrder === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />}
    // </span>
  )}
</th>
 
            <th className="px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider ">
              {" "}
              Image
            </th>
            <th className="px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider " onClick={() => handleSort("offers")}>
               Offers
   {sortColumn === "offers" && (
<span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
     )}  </th>
            <th className="  px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider" onClick={()=>handleSort("brandName")}>
              Brand Name
              {sortColumn === "brandName" && (
<span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
            <th className="  px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider" onClick={()=>handleSort("productName")}>
              Product Name
              {sortColumn === "productName" && (
<span>{sortOrder === "asc" ? " ▲" : " ▼"}</span>
              )}
            </th>
     
            <th className="px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider">
              Product url
            </th>
            {groupingKeyTypes.map((type) => (
              <th
                key={type}
                className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider">
                gk-{type}
              </th>
            ))}
            <th className="px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider ">
              Store Name
            </th>
            <th className="px-4 py-2 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {groupProducts?.map((group, index) => (
             <React.Fragment key={index}>
               <tr    style={{border:"1px solid"}} >
               {  /* className="border-b border-gray-300" */}
                 <td
                  className="px-4 py-2 bg-gray-200"
                  rowSpan={group.offersNumber + 1}>
                  {index + 1
                  }
                </td>{" "}
                {/* Numerate the rows */}
                <td
                  className="px-4 py-2 bg-gray-200"
                  rowSpan={group.offersNumber + 1}>
                  {group.gId}
                </td>
                <td className="px-4 py-2 " rowSpan={group.offersNumber + 1}>
                  <img
                    src={group.productImage}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 " rowSpan={group.offersNumber + 1}>
                <span className="  text-blue-800 font-bold ">
                          {group.offersNumber}
                        </span>
            
                </td>
                 
              </tr>
              {group.offers.map((product, productIndex) => (
                <React.Fragment key={productIndex}>
                  <tr  className="">
                  <td className="px-4 py-2 whitespace-nowrap  ">
                      {" "}
                      <span className="tooltip max-w-xs  ">
                        {product.brandName}
                      </span>{" "}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap ">
                      <span className="tooltip max-w-xs ">
                        {product.productName}
                      </span>
                    </td>
                   
                    <td className="px-4 py-2 whitespace-nowrap">
                      <a
                        href={product.productUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        <span className="  text-blue-500 hover:underline tooltip max-w-xs ">
                          {product.productUrl}
                        </span>
                      </a>
                    </td>
                    {groupingKeyTypes.map((type) => {
                      const groupingKeyValue = product.groupingKeys.find(
                        (key) => key.type === type
                      )
                      const gkvalue = groupingKeyValue
                        ? groupingKeyValue.value
                        : "-"
                      const key = `${type}-${gkvalue}`
                      const color = colorsMap[key] || ""

                      return (
                        <td
                          key={`${type}_${group.gId}`}
                          className="px-6 py-4 whitespace-no-wrap">
                          <span
                            className="tooltip max-w-xs"
                            key={key}
                            style={{ backgroundColor: color }}>
                            {gkvalue}
                             
                            </span>
                        </td>
                      )
                    })}
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {product.storeName}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {/* <button
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
                        style={{ marginRight: "5px" }}
                        onClick={() => generateImage(group.gId)}>
                        Image
                      </button>  */}
                 
                      <button  onClick={()=>generateDot(group.gId)}    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded">
                        Html
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

//                 <td className="px-6 py-4 whitespace-no-wrap">
//                   <button
//                     className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
//                     style={{ marginRight: '5px' }}
//                     onClick={() => generateImage(groupProduct.gId)}
//                   >
//                     Image
//                   </button>
//                   <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded">Html</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {isModalOpen && (
//         <div className="fixed z-10 inset-0 overflow-y-auto">
//           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//             </div>
//             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
//               &#8203;
//             </span>
//             <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                 <h3 className="text-lg leading-6 font-medium text-gray-900">Generated image</h3>
//                 <div className="mt-2">
//                   <div>
//                     <img src={`data:image/png;base64,${image}`} alt="Generated Image" />
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default ProductTable

import axios from 'axios';
import React, { useState } from 'react';
import { groupProduct } from '~/pages/api/groupProduct';
import { productOffer } from '~/pages/api/productOffer';
interface ProductTableProps {
  groupProducts: groupProduct[];
  }
  const ProductTable: React.FC<ProductTableProps> = ({ groupProducts }) => {  
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [image, setimage] = useState('');
   const generateImage = async (id:String) => {
    try {
        const response = await axios.get("http://localhost:8082/group-graph/converter/generateProducOffer/"+id)
         setIsModalOpen(true);
     setimage(response.data);
     } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const getUniqueGroupingKeyTypes = () => {
    const groupingKeyTypes: string[] = [];

    groupProducts.forEach((groupProduct) => {
      groupProduct.offers.forEach((offer) => {
        offer.groupingKeys.forEach((key) => {
          if (!groupingKeyTypes.includes(key.type)) {
            groupingKeyTypes.push(key.type);
          }
        });
      });
    });

    return groupingKeyTypes;
  };

  const groupingKeyTypes = getUniqueGroupingKeyTypes();
  return(
    <div className="table-container">
      <div className="table-wrapper">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider">
                Group ID
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider">
                Product offers
              </th>
              {groupingKeyTypes.map((type) => (
                <th key={type} className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider">
                  {type}
                </th>
              ))}
              <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-blue-800 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {groupProducts?.map((groupProduct) => (
              <tr key={groupProduct.gId}>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">{groupProduct.gId}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  <img src={groupProduct.productImage} className="w-10 h-10 rounded-full" alt="Product Image" />
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {groupProduct.offers.map((offer) => (
                    <div key={offer.productId} className="text-sm leading-5 text-gray-900">
                      {offer.productName}
                    </div>
                  ))}
                </td>
                {groupingKeyTypes.map((type) => (
                  <td key={`${type}_${groupProduct.gId}`} className="px-6 py-4 whitespace-no-wrap">
                    {groupProduct.offers.map((offer) => {
                      const groupingKeyValue = offer.groupingKeys.find((key) => key.type === type);
                      return groupingKeyValue ? groupingKeyValue.value : '-';
                    })}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-no-wrap">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
                    style={{ marginRight: '5px' }}
                    onClick={() => generateImage(groupProduct.gId)}
                  >
                    Image
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded">Html</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Generated image</h3>
                <div className="mt-2">
                  <div>
                    <img src={`data:image/png;base64,${image}`} alt="Generated Image" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
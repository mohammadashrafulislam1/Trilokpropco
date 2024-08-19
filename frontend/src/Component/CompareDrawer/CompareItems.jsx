import { useEffect, useState } from "react";
import { endPoint } from "../ForAll/ForAll";

const CompareItems = ({ list }) => {
 

  return (
      
        <table className="table-auto w-full text-left border-collapse border border-gray-300 rounded-lg">
          <thead className="rounded-lg">
            <tr className="border-b bg-gray-200 rounded-lg">
              <th className="p-4 border border-gray-300">Side</th>
              <th className="p-4 border border-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Image</td>
              <td className="p-4 border border-gray-300">
                <img
                  src={list?.galleryImages[0]}
                  alt={list?.name}
                  className="w-[150px] h-[150px] object-cover rounded-md"
                />
              </td>
              
            </tr>
            <tr>
            <td className="p-4 font-bold border border-gray-300">Title</td>
            <td className="p-4 border border-gray-300">{list?.name}</td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Price</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                ₹ {list?.priceRange}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Size</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {list?.size}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Configuration</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {list?.configuration}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Location</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {curentLocation?.name}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Type</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {curentType?.type}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Status</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {curentStatus?.status}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Developer</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {curentDeveloper?.name}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Land Area</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {list?.projectOverview?.landArea}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Flat Area</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {list?.projectOverview?.flatArea}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Number of Blocks</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {list?.projectOverview?.numberOfBlocks}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold border border-gray-300">Number of Units</td>
              <td className="p-4 border border-gray-300" colSpan="2">
                {list?.projectOverview?.numberOfUnits}
              </td>
            </tr>
          </tbody>
        </table>
     
    
  );
};

export default CompareItems;

import { useEffect, useState } from "react";
import Header from "../../Component/Navigation/Header";
import { endPoint } from "../../Component/ForAll/ForAll";

const CompareLists = () => {
  const [compareLists, setCompareLists] = useState([]);
  const [detailedCompareLists, setDetailedCompareLists] = useState([]);

  useEffect(() => {
    // Get the comparison list from localStorage on component load
    const compareList = JSON.parse(localStorage?.getItem("compareList")) || [];
    setCompareLists(compareList);
  }, []);

  const fetchDetails = async (listItem) => {
    const [cityResponse, statusResponse, typeResponse, developerResponse] = await Promise.all([
      fetch(`${endPoint}/city`),
      fetch(`${endPoint}/status`),
      fetch(`${endPoint}/type`),
      fetch(`${endPoint}/developer`),
    ]);

    const [cityData, statusData, typeData, developerData] = await Promise.all([
      cityResponse.json(),
      statusResponse.json(),
      typeResponse.json(),
      developerResponse.json(),
    ]);

    return {
      curentLocation: cityData.find((city) => city._id === listItem?.location),
      curentStatus: statusData.find((status) => status._id === listItem?.status),
      curentType: typeData.find((type) => type._id === listItem?.type),
      curentDeveloper: developerData.find((developer) => developer._id === listItem?.developer),
    };
  };

  useEffect(() => {
    const getDetailedCompareLists = async () => {
      const updatedLists = await Promise.all(
        compareLists.map(async (item) => {
          const details = await fetchDetails(item);
          return { ...item, ...details };
        })
      );
      setDetailedCompareLists(updatedLists);
    };

    if (compareLists.length) {
      getDetailedCompareLists();
    }
  }, [compareLists]);

  return (
    <div>
      <Header />
      <div className="overflow-x-auto mx-4 lg:mx-20 !rounded-[25px]">
        <table className="table-auto border w-full !rounded-[25px]">
            <caption className="text-3xl mb-5 font-semibold">Compare Properties</caption>
          <tbody className="!rounded-[25px]">
            <tr className="border">
              <td className="p-4 font-bold"></td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">
                  <img src={item?.galleryImages[0]} alt={item?.name} className=" object-cover rounded-md" />
                </td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Title</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.name}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Price</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">₹ {item?.priceRange}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Size</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.size}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Configuration</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.configuration}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Location</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.curentLocation?.name}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Type</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.curentType?.type}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Status</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.curentStatus?.status}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Developer</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.curentDeveloper?.name}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Land Area</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.projectOverview?.landArea}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Flat Area</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.projectOverview?.flatArea}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Number of Blocks</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.projectOverview?.numberOfBlocks}</td>
              ))}
            </tr>
            <tr className="border hover:bg-[#046307] hover:text-white">
              <td className="p-4 font-bold">Number of Units</td>
              {detailedCompareLists?.map((item, index) => (
                <td key={index} className="p-4">{item?.projectOverview?.numberOfUnits}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareLists;

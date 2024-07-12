import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endPoint } from "../../forAll/forAll";
import { CustomSelectType } from "../Component/CustomSelect/CustomSelectType";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    developer: "",
    location: "",
    status: "",
    priceRange: "",
    configuration: "",
    galleryImages: [],
    projectOverview: {
      possessionStart: "",
      landArea: "",
      configuration: "",
      flatArea: "",
      priceRange: "",
      numberOfBlocks: 0,
      elevation: "",
      numberOfUnits: 0,
      RegistrationNo: "",
    },
    description: "",
    priceDetails: [
      {
        configuration: "",
        price: "",
        size: "",
      },
    ],
    plans: [
      {
        planType: "",
        image: "",
        size: "",
        price: "",
      },
    ],
    pdfDownload: "",
    amenities: [""],
    nearbyFacilities: "",
    locationMap: "",
    specifications: "",
    video: "",
  });
  
  const [typeData, setTypeData] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [developerData, setDeveloperData] = useState(null);
  console.log(typeData, statusData, developerData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeResponse, statusResponse, developerResponse] =
          await Promise.all([
            axios.get(`${endPoint}/type`),
            axios.get(`${endPoint}/status`),
            axios.get(`${endPoint}/developer`),
          ]);

        console.log(typeResponse.data);
        console.log(statusResponse.data);
        console.log(developerResponse.data);

        setTypeData(typeResponse.data);
        setStatusData(statusResponse.data);
        setDeveloperData(developerResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [endPoint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedChange = (e, path) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState };
      let currentLevel = newState;
      for (let i = 0; i < path.length - 1; i++) {
        currentLevel = currentLevel[path[i]];
      }
      currentLevel[path[path.length - 1]][name] = value;
      return newState;
    });
  };

  const handleFileChange = (e, path) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      [path]: files, // Store File objects directly in formData
    }));

    toast.success("Gallery images successfully added.", {
      position: "top-center",
    });
  };
  const handleRemoveImage = (index) => {
    setFormData((prevState) => {
      const newImages = prevState.galleryImages.filter((_, i) => i !== index);
      return { ...prevState, galleryImages: newImages };
    });
  };

  const handlePlanFileChange = (e, index) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=a5de5e1a0be6a54f959c5e75e6dad25d`,
        formData
      )
      .then((response) => {
        const imageUrl = response.data.data.url;
        toast.success("Image Successfully hosted.", {
          position: "top-center",
        });
        setFormData((prevState) => {
          const newState = { ...prevState };
          newState.plans[index].image = imageUrl;
          return newState;
        });
      })
      .catch((error) => {
        toast.error(`${error.response.data.error.message}`, {
          position: "top-left",
        });
        console.error("Error uploading image:", error);
      });
  };

  const handleAddPlan = () => {
    setFormData((prevState) => ({
      ...prevState,
      plans: [
        ...prevState.plans,
        { planType: "", image: "", size: "", price: "" },
      ],
    }));
  };

  const handleAddPriceDetail = () => {
    setFormData((prevState) => ({
      ...prevState,
      priceDetails: [
        ...prevState.priceDetails,
        { configuration: "", price: "", size: "" },
      ],
    }));
  };

  const handleRemovePlan = (index) => {
    setFormData((prevState) => {
      const newPlans = prevState.plans.filter((_, i) => i !== index);
      return {
        ...prevState,
        plans: newPlans,
      };
    });
  };

  const handleRemovePriceDetail = (index) => {
    setFormData((prevState) => {
      const newPriceDetails = prevState.priceDetails.filter(
        (_, i) => i !== index
      );
      return {
        ...prevState,
        priceDetails: newPriceDetails,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    try {
      const response = await axios.post(`${endPoint}/property`, formData);
      console.log(response.data);
      toast.success("Property successfully added!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add property. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ToastContainer />
      {/* Add Property Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 w-1/2 bg-white rounded mt-10"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <CustomSelectType
  options={typeData}
  selectedValue={formData.type} // Ensure selectedValue matches your formData structure
  onSelect={(option) => setFormData((prev) => ({ ...prev, type: option }))} // Update formData with selected option
/>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Developer</span>
          </label>
          <input
            type="text"
            name="developer"
            value={formData.developer}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Price Range</span>
          </label>
          <input
            type="text"
            name="priceRange"
            value={formData.priceRange}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Configuration</span>
          </label>
          <input
            type="text"
            name="configuration"
            value={formData.configuration}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Gallery Images</span>
          </label>
          <input
            type="file"
            name="galleryImages"
            onChange={(e) => handleFileChange(e, "galleryImages")}
            className="file-input w-full max-w-xs"
            required
            multiple
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {formData.galleryImages.map((file, index) => (
              <div key={index} className="relative h-24 m-2">
                <p className="text-center">{file.name}</p>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 p-1 bg-red-600 text-white rounded-full"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Nested Fields for Project Overview */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Project Overview</span>
          </label>
          <input
            type="text"
            name="possessionStart"
            value={formData.projectOverview.possessionStart}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered"
            placeholder="Possession Start"
          />
          <input
            type="text"
            name="landArea"
            value={formData.projectOverview.landArea}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered mt-2"
            placeholder="Land Area"
          />
          {/* Add other fields of projectOverview similarly */}
        </div>

        {/* Nested Fields for Price Details */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price Details</span>
          </label>
          {formData.priceDetails.map((priceDetail, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 flex-wrap gap-2 mt-4 border-b-2 pb-4"
            >
              <input
                type="text"
                name="configuration"
                value={priceDetail.configuration}
                onChange={(e) => handleNestedChange(e, ["priceDetails", index])}
                className="input input-bordered"
                placeholder="Configuration"
              />
              <input
                type="text"
                name="price"
                value={priceDetail.price}
                onChange={(e) => handleNestedChange(e, ["priceDetails", index])}
                className="input input-bordered"
                placeholder="Price"
              />
              <input
                type="text"
                name="size"
                value={priceDetail.size}
                onChange={(e) => handleNestedChange(e, ["priceDetails", index])}
                className="input input-bordered"
                placeholder="Size"
              />
              <button
                type="button"
                onClick={() => handleRemovePriceDetail(index)}
                className="text-[#fc0000]"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPriceDetail}
            className="cursor-pointer mt-2 text-green-600"
          >
            Add More Price Details +
          </button>
        </div>

        {/* Nested Fields for Plans */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Plans</span>
          </label>
          {formData.plans.map((plan, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 flex-wrap gap-2 mt-4 border-b-2 pb-4"
            >
              <input
                type="text"
                name="planType"
                value={plan.planType}
                onChange={(e) => handleNestedChange(e, ["plans", index])}
                className="input input-bordered"
                placeholder="Plan Type"
              />
              <input
                type="file"
                name="image"
                onChange={(e) => handlePlanFileChange(e, index)}
                className="file-input w-full max-w-xs"
                placeholder="Image"
              />
              <input
                type="text"
                name="size"
                value={plan.size}
                onChange={(e) => handleNestedChange(e, ["plans", index])}
                className="input input-bordered"
                placeholder="Size"
              />
              <input
                type="text"
                name="price"
                value={plan.price}
                onChange={(e) => handleNestedChange(e, ["plans", index])}
                className="input input-bordered"
                placeholder="Price"
              />
              <button
                type="button"
                onClick={() => handleRemovePlan(index)}
                className="text-[#fc0000]"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPlan}
            className="cursor-pointer mt-2 text-green-600"
          >
            Add More Plans +
          </button>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">PDF Download</span>
          </label>
          <input
            type="text"
            name="pdfDownload"
            value={formData.pdfDownload}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Nearby Facilities</span>
          </label>
          <input
            type="text"
            name="nearbyFacilities"
            value={formData.nearbyFacilities}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location Map</span>
          </label>
          <input
            type="text"
            name="locationMap"
            value={formData.locationMap}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Specifications</span>
          </label>
          <input
            type="text"
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Video</span>
          </label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProperty;

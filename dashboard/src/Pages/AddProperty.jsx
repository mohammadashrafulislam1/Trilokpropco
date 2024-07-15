import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { endPoint } from "../../forAll/forAll";
import { CustomSelectType } from "../Component/CustomSelect/CustomSelectType";
import { CustomSelectDeveloper } from "../Component/CustomSelect/CustomSelectDeveloper";
import { CustomSelectStatus } from "../Component/CustomSelect/CustomSelectStatus";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    developer: "",
    location: "",
    status: "",
    priceRange: "",
    configuration: "",
    size: "",
    galleryImages: [],
    bankImages: [],
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
    amenities: [],
    nearbyFacilities: "",
    locationMap: "",
    specifications: "",
    video: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [typeData, setTypeData] = useState(null);
  const [amenitiesData, setAmenities] = useState([]);
  const [statusData, setStatusData] = useState(null);
  const [developerData, setDeveloperData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          typeResponse,
          statusResponse,
          developerResponse,
          amenityResponse,
        ] = await Promise.all([
          axios.get(`${endPoint}/type`),
          axios.get(`${endPoint}/status`),
          axios.get(`${endPoint}/developer`),
          axios.get(`${endPoint}/amenity`),
        ]);
        setTypeData(typeResponse.data);
        setStatusData(statusResponse.data);
        setDeveloperData(developerResponse.data);
        setAmenities(amenityResponse.data);
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

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("image", file);

      // Push each upload promise to the array
      uploadPromises.push(
        axios.post(
          "https://api.imgbb.com/1/upload?key=d7c44914803981db7f95f8b645b0959a",
          formData
        )
      );
    }

    try {
      // Wait for all upload promises to resolve
      const responses = await Promise.all(uploadPromises);
      console.log(responses);
      // Extract the image URLs from responses
      const uploadedImages = responses.map(
        (response) => response.data.data.display_url
      );
      console.log(uploadedImages);
      // Update galleryImages in formData state
      setFormData((prevState) => ({
        ...prevState,
        galleryImages: [...prevState.galleryImages, ...uploadedImages],
      }));
      toast.success("Images uploaded successfully.", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.", {
        position: "top-center",
      });
    }
  };

  const handleFileChangeBank = async (event) => {
    const files = event.target.files;
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("image", file);

      // Push each upload promise to the array
      uploadPromises.push(
        axios.post(
          "https://api.imgbb.com/1/upload?key=d7c44914803981db7f95f8b645b0959a",
          formData
        )
      );
    }

    try {
      // Wait for all upload promises to resolve
      const responses = await Promise.all(uploadPromises);
      console.log(responses);
      // Extract the image URLs from responses
      const uploadedImages = responses.map(
        (response) => response.data.data.display_url
      );
      console.log(uploadedImages);
      // Update bankImages in formData state
      setFormData((prevState) => ({
        ...prevState,
        bankImages: [...prevState.bankImages, ...uploadedImages],
      }));
      toast.success("Images uploaded successfully.", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload images. Please try again.", {
        position: "top-center",
      });
    }
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

    // Include selected amenities IDs in formData
    const updatedFormData = {
      ...formData,
      amenities: selectedAmenities.map((amenity) => amenity._id),
    };

    console.log(updatedFormData);

    try {
      const response = await axios.post(
        `${endPoint}/property`,
        updatedFormData
      );
      console.log(response.data);
      toast.success("Property successfully added!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error submitting form:", error.response.data, error);
      toast.error(
        error.response.data.message ||
          "Failed to add property. Please try again.",
        {
          position: "top-center",
        }
      );
    }
  };
  const handleAmenitySelect = (amenity) => {
    if (!selectedAmenities.find((a) => a._id === amenity._id)) {
      setSelectedAmenities((prevSelectedAmenities) => [
        ...prevSelectedAmenities,
        amenity,
      ]);
    } else {
      toast.error("Amenity already added!");
    }
  };

  const handleRemoveAmenity = (amenityId) => {
    setSelectedAmenities((prevSelectedAmenities) =>
      prevSelectedAmenities.filter((amenity) => amenity._id !== amenityId)
    );
  };
  AddProperty.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  AddProperty.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center  md:p-5 p-5 lg:p-5">
      <ToastContainer />
      {/* Add Property Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 lg:w-3/4 w-full bg-white rounded-2xl mt-10"
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
            <span className="label-text">Description</span>
          </label>
          <ReactQuill
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            className="quill-editor h-20 mb-20 rounded-lg" // Add your own class for styling
            modules={AddProperty.modules}
            formats={AddProperty.formats}
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <CustomSelectType
            options={typeData}
            selectedValue={formData.type}
            onSelect={(option) =>
              setFormData((prev) => ({ ...prev, type: option }))
            }
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Developer</span>
          </label>
          <CustomSelectDeveloper
            options={developerData}
            selectedValue={formData.developer}
            onSelect={(option) =>
              setFormData((prev) => ({ ...prev, developer: option }))
            }
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
          <CustomSelectStatus
            options={statusData}
            selectedValue={formData.status}
            onSelect={(option) =>
              setFormData((prev) => ({ ...prev, status: option }))
            }
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
            <span className="label-text">Size</span>
          </label>
          <input
            type="text"
            name="size"
            value={formData.size}
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
            <span className="label-text">Amenities</span>
          </label>
          <div className="grid lg:grid-cols-3 gap-5 sm:grid-cols-1 md:grid-cols-3">
            {amenitiesData.map((amenity) => (
              <div
                key={amenity._id}
                className="flex items-center border p-2 rounded w-max gap-2"
              >
                <img
                  src={amenity?.logo}
                  alt={amenity.name}
                  className="w-10 h-10 object-cover"
                />
                <span>{amenity.name}</span>
                <button
                  type="button"
                  onClick={() => handleAmenitySelect(amenity)}
                  className="btn btn-sm btn-outline"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-2xl mt-10">Selected Amenities:</h3>
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedAmenities.length === 0 ? (
                <p>No amenity selected.</p>
              ) : (
                selectedAmenities.map((amenity) => (
                  <div
                    key={amenity?._id}
                    className="flex items-center space-x-2 border p-2 rounded"
                  >
                    <img
                      src={amenity?.logo}
                      alt={amenity?.name}
                      className="w-10 h-10 object-cover"
                    />
                    <span>{amenity?.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAmenity(amenity?._id)}
                      className="ml-auto text-[#fc0000]"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
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
          <input
            type="text"
            name="configuration"
            value={formData.projectOverview.configuration}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered mt-2"
            placeholder="Configuration"
          />
          <input
            type="text"
            name="flatArea"
            value={formData.projectOverview.flatArea}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered mt-2"
            placeholder="Flat Area"
          />
          <input
            type="text"
            name="priceRange"
            value={formData.projectOverview.priceRange}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered mt-2"
            placeholder="Price Range"
          />
          <input
            type="text"
            name="numberOfBlocks"
            value={formData.projectOverview.numberOfBlocks}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered mt-2"
            placeholder="Number Of Blocks"
          />
          <input
            type="text"
            name="elevation"
            value={formData.projectOverview.elevation}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered mt-2"
            placeholder="Elevation"
          />
          <input
            type="text"
            name="numberOfUnits"
            value={formData.projectOverview.numberOfUnits}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered mt-2"
            placeholder="Number Of Units"
          />
          <input
            type="text"
            name="RegistrationNo"
            value={formData.projectOverview.RegistrationNo}
            onChange={(e) => handleNestedChange(e, ["projectOverview"])}
            className="input input-bordered mt-2"
            placeholder="Registration Number"
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
                name="size"
                value={priceDetail.size}
                onChange={(e) => handleNestedChange(e, ["priceDetails", index])}
                className="input input-bordered"
                placeholder="Size"
              />
              <input
                type="text"
                name="price"
                value={priceDetail.price}
                onChange={(e) => handleNestedChange(e, ["priceDetails", index])}
                className="input input-bordered"
                placeholder="Price"
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
          <ReactQuill
            value={formData.nearbyFacilities}
            onChange={(value) =>
              setFormData({ ...formData, nearbyFacilities: value })
            }
            className="quill-editor h-20 mb-20 rounded-lg" 
            modules={AddProperty.modules}
            formats={AddProperty.formats}
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
          <ReactQuill
            value={formData.specifications}
            onChange={(value) =>
              setFormData({ ...formData, specifications: value })
            }
            className="quill-editor h-20 mb-20 rounded-lg" 
            modules={AddProperty.modules}
            formats={AddProperty.formats}
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

        <div className="form-control">
          <label className="label">
            <span className="label-text">Bank Images</span>
          </label>
          <input
            type="file"
            name="bankImages"
            onChange={(e) => handleFileChangeBank(e, "bankImages")}
            className="file-input w-full max-w-xs"
            required
            multiple
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;

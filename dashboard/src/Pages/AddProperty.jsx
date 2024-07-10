import { useState } from "react";
import axios from "axios";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    developer: '',
    location: '',
    status: '',
    priceRange: '',
    configuration: '',
    galleryImages: [],
    projectOverview: {
      possessionStart: '',
      landArea: '',
      configuration: '',
      flatArea: '',
      priceRange: '',
      numberOfBlocks: 0,
      elevation: '',
      numberOfUnits: 0,
      RegistrationNo: '',
    },
    description: '',
    priceDetails: [{
      configuration: '',
      price: '',
      size: ''
    }],
    plans: [{
      planType: '',
      image: '',
      size: '',
      price: ''
    }],
    pdfDownload: '',
    amenities: [''],
    nearbyFacilities: '',
    locationMap: '',
    specifications: '',
    video: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedChange = (e, path) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newState = { ...prevState };
      let currentLevel = newState;
      for (let i = 0; i < path.length - 1; i++) {
        currentLevel = currentLevel[path[i]];
      }
      currentLevel[path[path.length - 1]][name] = value;
      return newState;
    });
  };

  const handleFileChange = (e, path, index) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    axios.post('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY', formData)
      .then(response => {
        const imageUrl = response.data.data.url;
        setFormData(prevState => {
          const newState = { ...prevState };
          let currentLevel = newState;
          for (let i = 0; i < path.length - 1; i++) {
            currentLevel = currentLevel[path[i]];
          }
          currentLevel[path[path.length - 1]].image = imageUrl;
          return newState;
        });
      })
      .catch(error => {
        console.error("Error uploading image:", error);
      });
  };

  const handleAddPlan = () => {
    setFormData(prevState => ({
      ...prevState,
      plans: [...prevState.plans, { planType: '', image: '', size: '', price: '' }]
    }));
  };

  const handleAddPriceDetail = () => {
    setFormData(prevState => ({
      ...prevState,
      priceDetails: [...prevState.priceDetails, { configuration: '', price: '', size: '' }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* add Property Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 w-1/2 bg-white mt-10">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <input type="text" name="type" value={formData.type} onChange={handleChange} className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Developer</span>
          </label>
          <input type="text" name="developer" value={formData.developer} onChange={handleChange} className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Price Range</span>
          </label>
          <input type="text" name="priceRange" value={formData.priceRange} onChange={handleChange} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Configuration</span>
          </label>
          <input type="text" name="configuration" value={formData.configuration} onChange={handleChange} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Gallery Images</span>
          </label>
          <input type="file" name="galleryImages" className="input input-bordered" required />
        </div>

        {/* Nested Fields for Project Overview */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Project Overview</span>
          </label>
          <input type="text" name="possessionStart" value={formData.projectOverview.possessionStart} onChange={(e) => handleNestedChange(e, ['projectOverview'])} className="input input-bordered" placeholder="Possession Start" />
          <input type="text" name="landArea" value={formData.projectOverview.landArea} onChange={(e) => handleNestedChange(e, ['projectOverview'])} className="input input-bordered" placeholder="Land Area" />
          {/* Add other fields of projectOverview similarly */}
        </div>

        {/* Nested Fields for Price Details */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price Details</span>
          </label>
          {formData.priceDetails.map((priceDetail, index) => (
            <div key={index}>
              <input type="text" name="configuration" value={priceDetail.configuration} onChange={(e) => handleNestedChange(e, ['priceDetails', index])} className="input input-bordered" placeholder="Configuration" />
              <input type="text" name="price" value={priceDetail.price} onChange={(e) => handleNestedChange(e, ['priceDetails', index])} className="input input-bordered" placeholder="Price" />
              <input type="text" name="size" value={priceDetail.size} onChange={(e) => handleNestedChange(e, ['priceDetails', index])} className="input input-bordered" placeholder="Size" />
            </div>
          ))}
          <button type="button" onClick={handleAddPriceDetail} className="btn btn-secondary mt-2">Add More Price Details</button>
        </div>

        {/* Nested Fields for Plans */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Plans</span>
          </label>
          {formData.plans.map((plan, index) => (
            <div key={index}>
              <input type="text" name="planType" value={plan.planType} onChange={(e) => handleNestedChange(e, ['plans', index])} className="input input-bordered" placeholder="Plan Type" />
              <input type="file" name="image" onChange={(e) => handleFileChange(e, ['plans', index])} className="input input-bordered" placeholder="Image" />
              <input type="text" name="size" value={plan.size} onChange={(e) => handleNestedChange(e, ['plans', index])} className="input input-bordered" placeholder="Size" />
              <input type="text" name="price" value={plan.price} onChange={(e) => handleNestedChange(e, ['plans', index])} className="input input-bordered" placeholder="Price" />
            </div>
          ))}
          <button type="button" onClick={handleAddPlan} className="btn btn-secondary mt-2">Add More Plans</button>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">PDF Download</span>
          </label>
          <input type="text" name="pdfDownload" value={formData.pdfDownload} onChange={handleChange} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Nearby Facilities</span>
          </label>
          <input type="text" name="nearbyFacilities" value={formData.nearbyFacilities} onChange={handleChange} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location Map</span>
          </label>
          <input type="text" name="locationMap" value={formData.locationMap} onChange={handleChange} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Specifications</span>
          </label>
          <input type="text" name="specifications" value={formData.specifications} onChange={handleChange} className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Video</span>
          </label>
          <input type="text" name="video" value={formData.video} onChange={handleChange} className="input input-bordered" required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddProperty;


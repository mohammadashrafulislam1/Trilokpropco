import axios from "axios";
import { endPoint } from "../../forAll/forAll";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";


const Developer = () => {
    const [formData, setFormData] = useState();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           console.log(formData)
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
    }
    return (
    <div>
    <ToastContainer />    
    <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 lg:w-3/4 w-full bg-white rounded-lg mt-10"
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
            <span className="label-text">Developer Image</span>
          </label>
          <input
            type="file"
            name="galleryImages"
            value={formData.image}
            onChange={handleChange}
            className="file-input w-full max-w-xs"
            required
            multiple
          />
        </div>
        </form>  
    </div>
    );
};

export default Developer;
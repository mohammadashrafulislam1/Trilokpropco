import axios from "axios";
import { endPoint } from "../../forAll/forAll";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${endPoint}/city`);
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", imageFile);

    try {
      const response = await axios.post(`${endPoint}/city`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCities([...cities, response.data]);
      toast.success("City successfully added!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error submitting form:", error.response.data, error);
      toast.error(
        error.response.data.message || "Failed to add city. Please try again.",
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center flex-col gap-12">
       <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 lg:w-3/4 w-full bg-white rounded-lg mt-10 mx-1"
      >
        <div className="form-control">
          <label className="label">
             <span className="label-text">City Name</span>
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
          <label className="label"> <span className="label-text">City Image</span>
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="file-input w-full max-w-xs"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
        Add City 
        </button>
      </form>
      <div className="overflow-x-auto bg-white rounded-lg pt-5 lg:w-3/4 w-full">
        <table className="table">
          <caption className="table-caption text-2xl font-bold mb-8">
            All Cities
          </caption>
          <thead>
            <tr>
             <th>No</th>
             <th>Name</th>
             <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.length ? (
              cities.map((city, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={city.image} alt={city.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{city.name}</div>
                      </div>
                    </div>
                  </td>
                  <th className="flex gap-2">
                    <button className="btn btn-success text-white btn-xs">
                      Update
                    </button>
                    <button className="btn btn-error btn-xs text-white">
                      Delete
                    </button>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-5 text-center">
                  No city is available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cities;

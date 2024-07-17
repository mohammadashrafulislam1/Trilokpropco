import { useEffect, useState } from "react";
import { endPoint } from "../../forAll/forAll";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const BlogCategories = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category: '',
    });
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${endPoint}/blogCategory`);
            setCategories(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
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

      const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
          const response = await axios.post(
            `${endPoint}/blogCategory`,
            formData
          );
          setCategories([...categories, response.data]);
          toast.success("category successfully added!", {
            position: "top-center",
          });
        } catch (error) {
          console.error("Error submitting form:", error.response.data, error);
          toast.error(
            error.response.data.message ||
              "Failed to add category. Please try again.",
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
              <span className="label-text">Category Name</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add category
          </button>
        </form>

        <div className="overflow-x-auto bg-white rounded-lg pt-5 lg:w-3/4 w-full">
          <table className="table">
            <caption className="table-caption text-2xl font-bold mb-8">All categories</caption>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length ? categories.map((category, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{category.category}</div>
                      </div>
                    </div>
                  </td>
                  <th className="flex gap-2">
                    <button className="btn btn-success text-white btn-xs">Update</button>
                    <button className="btn btn-error btn-xs text-white">Delete</button>
                  </th>
                </tr>
              )) : <tr><td colSpan="3" className="p-5 text-center">No category is available.</td></tr>}
            </tbody>
          </table>
        </div>
    </div>
    );
};

export default BlogCategories;
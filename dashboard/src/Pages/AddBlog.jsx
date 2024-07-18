import axios from "axios";
import { endPoint } from "../../forAll/forAll";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

const AddBlog = () => {
  const [blogs, setBlogs] = useState();
  const [categories, setCategories] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${endPoint}/blogCategory`);
            console.log(response.data);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = new FormData();
    data.append("title", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("date", formData.date);
    data.append("image", imageFile);
    console.log(data)
    try {
      const response = await axios.post(`${endPoint}/blog`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setLoading(false)
      toast.success("Developer successfully added!", {
        position: "top-center",
      });

    } catch (error) {
      console.error("Error submitting form:", error.response.data, error);
      setLoading(false)
      toast.error(
        error.response.data.message ||
          "Failed to add developer. Please try again.",
        {
          position: "top-center",
        }
      );
    }
  };

  AddBlog.modules = {
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

  AddBlog.formats = [
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
    <div className="flex items-center justify-center flex-col gap-12 mx-1 relative overflow-hidden">
      <ToastContainer />
      { loading &&
        <div className="bg-[#0000003e] absolute w-full h-full z-10 md:py-52 lg:px-96 py-36 md:px-32">
            <div className="modal-box" >
          <h3 className="font-bold text-lg">Loading..</h3>
          <p className="py-4">Please wait untill it loaded.</p>
        </div>
        </div>
      }
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 lg:w-3/4 w-full bg-white rounded-lg mt-10"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Categroy</span>
          </label>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Select category
            </option>
            {
                categories?.map((category, index) =>(
                    <option key={index} value={formData.category}>{category.category}</option>
                ))
            }
          </select>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Blog Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Featured Image</span>
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="file-input w-full max-w-xs"
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
            className="quill-editor h-20 md:mb-20 rounded-lg mb-32" // Add your own class for styling
            modules={AddBlog.modules}
            formats={AddBlog.formats}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;

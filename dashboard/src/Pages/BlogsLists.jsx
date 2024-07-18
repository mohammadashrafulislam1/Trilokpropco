import axios from "axios";
import { endPoint } from "../../forAll/forAll";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const BlogsLists = () => {
    const [blogs, setBlogs] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${endPoint}/blog`);
            setBlogs(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
  
        fetchData();
      }, []);
    return (
        <div className="flex items-center justify-center flex-col gap-12 my-10">
        <div className="overflow-x-auto bg-white rounded-lg pt-5 lg:w-[90%] w-full lg:mx-32">
        <table className="table">
          <caption className="table-caption text-2xl font-bold mb-8">All Blogs</caption>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.length ? blogs.map((blog, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-start gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={blog.image} alt={blog.title} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{blog.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                </td>
                <th className="flex gap-2">
                  <button className="btn btn-success text-white btn-xs">Update</button>
                  <button className="btn btn-error btn-xs text-white">Delete</button>
                </th>
              </tr>
            )) : <tr><td colSpan="3" className="p-5 text-center">No blog is available.</td></tr>}
          </tbody>
        </table>
      </div></div>
    );
};

export default BlogsLists;
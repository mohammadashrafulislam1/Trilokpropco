import axios from "axios";
import { endPoint } from "../../forAll/forAll";
import { useEffect, useState } from "react";

const BlogsLists = () => {
    const [blogs, setBlogs] = useState();
    const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5; // Adjust as needed

  const getVisibleBlogs = () => {
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = Math.min(startIndex + blogsPerPage, blogs?.length || 0);
    return blogs?.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber <= 0 || pageNumber > Math.ceil(blogs?.length / blogsPerPage)) {
      return;
    }
    setCurrentPage(pageNumber);
  };
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
      <div>
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
          {blogs?.length ? (
              getVisibleBlogs().map((blog, index) => (
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
            ))) : <tr><td colSpan="3" className="p-5 text-center">No blog is available.</td></tr>}
          </tbody>
        </table>
      </div> 
      </div>;
    {/* Pagination */}
    {blogs?.length > blogsPerPage && (
      <div className="join mt-5 flex items-center justify-center my-10">
        <button
          className="join-item btn disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn">{currentPage}</button>
        <button
          className="join-item btn disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(blogs?.length / blogsPerPage)}
        >
          »
        </button>
      </div>
    )}
      </div>)};
export default BlogsLists;
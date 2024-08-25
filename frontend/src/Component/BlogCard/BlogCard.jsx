
const BlogCard = (blog) => {
    console.log(blog?.blog)
    return (
    <div>
      <div>
        <img src={blog?.blog?.image} alt={blog?.blog?.title} className="w-[340px] h-[240px]"/>
     </div>      
    </div>
    );
};

export default BlogCard;
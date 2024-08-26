
const BlogCard = (blog) => {
    console.log(blog?.blog)
    const date = new Date(blog?.blog?.date);

// Convert the date to the desired format
const day = date.getUTCDate();
const month = date.toLocaleString('default', { month: 'short' });

    return (
    <div className="w-full">
      <div className="w-full relative">
        <img src={blog?.blog?.image} alt={blog?.blog?.title} className="w-[340px] h-[240px] rounded-[30px] shadow-2xl"/>
        <p className="flex bg-white w-14 top-0 left-5
         absolute p-2"><span>{day}</span><span>{month.toString()}</span></p>
     </div>      
    </div>
    );
};

export default BlogCard;


const SectionTitle = (value) => {
    console.log(value)
    return (
        <h1 className="Bebas-Neue text-3xl md:text-4xl lg:text-5xl  text-black text-center"
        style={{
          textTransform:'uppercase'
        }}>{value?.value}</h1>
    );
};

export default SectionTitle;
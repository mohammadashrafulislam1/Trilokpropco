
export const AddProperty = async(req, res)=>{
    const {name, types, developer, location, statuses, priceRange, configuration, galleryImages, projectOverview, description, priceDetails, plans, pdfDownload, amenities, nearbyFacilities, locationMap, specifications, video} = req.body;
    try{
        
    }
    catch (e){
        console.log(e.message)
        res.status(500).json({message: "Internal Serval Error."})
    }
}
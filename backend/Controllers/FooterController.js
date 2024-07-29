import { FooterModel } from "../Models/FooterModel";

// add Footer controller:
export const addFooter = async(req, res) =>{
  try{
    const footer = new FooterModel(req.body)
    const savedFooter = await footer.save();
    res.status(200).json(savedFooter)
  }
  catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
}
// get Footers controller:
export const getFooters = async (req, res) =>{
    try{
      const footers = await FooterModel.find();
      res.status(200).json(footers)
    }catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Internal Server Error."});

}}

// Update Footer controller
export const updateFooter = async (req, res) => {
    try {
      const { id } = req.params; 
      const updatedFooter = await FooterModel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedFooter);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "Internal Server Error." });
    }
  };
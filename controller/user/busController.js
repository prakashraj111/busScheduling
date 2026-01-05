const Bus = require("../../model/busModel");
const fs = require("fs")
exports.createBusPost = async(req, res)=> {
        let filePath
         if(!req.file){
          filePath ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1dQPM88-Vq0f-YM8xILMQdKktXgKBMN6XH9cCBleA&s"
         }else{
          filePath = req.file.filename
         }
          const {busName,from,to,path} = req.body
          if(!busName || !from || !to || !path){
              return res.status(400).json({
                  message : "Some Fields are missing!"
              })
          }
          // insert into the Product collection/table
        const postCreated =  await Bus.create({
              busName ,
              from: JSON.parse(from),   // ✅ string → object
              to: JSON.parse(to),       // ✅
              path: JSON.parse(path),   // ✅ array
              image : filePath,

                // ✅ store logged-in user id
              user_id: req.user.id
          })
          res.status(200).json({
              message : "Product Created Successfully",
              data : postCreated
          })
}

exports.deletePost =  async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id"
        })
    }
    const oldData = await Bus.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
     // 🔥 Ownership check
    if (oldData.user_id.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: "You don't have permission to delete this Post" 
        })
    }
 
    const oldPostImage = oldData.image 
         // REMOVE FILE FROM UPLOADS FOLDER
            fs.unlink("./uploads/" +  oldPostImage,(err)=>{
                if(err){
                    console.log("error deleting file",err) 
                }else{
                    console.log("file deleted successfully")
                }
            })
    await Bus.findByIdAndDelete(id)
    res.status(200).json({

        message : "Post delete successfully"
    })

}

exports.updateBusPost = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) return res.status(400).json({ message: "Please provide id" })

    const oldData = await Bus.findById(id)
    if (!oldData) return res.status(404).json({ message: "Bus not found" })

    // 🔹 Ownership check
    if (oldData.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "You don't have permission to update this bus" })
    }

    // 🔹 Handle image
    let filePath = oldData.image
    if (req.file) {
      // Delete old image
      if (oldData.image) {
        fs.unlink(`./uploads/${oldData.image}`, (err) => {
          if (err) console.log("Error deleting old image:", err)
        })
      }
      filePath = req.file.filename
    }

    // 🔹 Parse nested fields if provided, else keep old values
    const busName = req.body.busName || oldData.busName
    const from = req.body.from ? JSON.parse(req.body.from) : oldData.from
    const to = req.body.to ? JSON.parse(req.body.to) : oldData.to
    const path = req.body.path ? JSON.parse(req.body.path) : oldData.path

    // 🔹 Update the document
    const updatedBus = await Bus.findByIdAndUpdate(
      id,
      { busName, from, to, path, image: filePath },
      { new: true }
    )

    res.status(200).json({
      message: "Bus updated successfully",
      data: updatedBus
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
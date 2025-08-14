const {requestModel}=require("../models/request.js")


const request=async(req,res)=>{

    const {groundId,playersNeeded,
      requirements,userId}=req.body;

    if(!playersNeeded){
        res.status(404).json({"msg":"enter number players required"});

    };

    const rese=new requestModel({
        playersNeeded,requirements,groundId,userId
    });

    await rese.save();

    res.status(200).json({"msg":"request successfull"});

}

const getAllrequests=async (req, res) => {
    try {
        console.log("requests");
        const groundId = req.query.id;

        if (!groundId) {
            return res.status(400).json({ msg: "v" });
        }

        const requests = await requestModel
            .find({ groundId })
            .populate("userId", "name email") 
            .sort({ createdAt: -1 });
            console.log(requests);

        return res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error fetching requests", error: err.message });
    }
};








module.exports={request,getAllrequests};
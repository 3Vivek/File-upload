const shortid=require("shortid");
const URL=require("../Model/url")

async function handleGenerateNewShortUrl(req,res){
    const body=req.body;
    const shortID=shortid(); 

    if(!body.url) return res.status(400).json({status:"url is not valid............."})

    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitedHistory:[],
        createdBy:req.user._id
    });
    return res.render("home",{
        id:shortID,
    });
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    res.json(
        {
            totalClick:result.visitedHistory.length,
            analytics:result.visitedHistory
    })
}

module.exports={
    handleGenerateNewShortUrl,
    handleGetAnalytics
}


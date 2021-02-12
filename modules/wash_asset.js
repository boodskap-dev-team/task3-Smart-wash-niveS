// var Common = require("./common")
// var Table = require("./tables")

// var Asset = function (app){
//     this.app = app;
//     this.common = new Common(app);
//     this.table = new Table(app);
// }
// module.exports = Asset;

// Asset.prototype.performAction = function (req,res){

//     const self = this;

   
//      if(req.params.action === 'list'){
//         self.common.commonSearch(self.table.ASSET_TABLE,req,res);
//     }
//     else{
//         res.status(401).json({status:false,message:'Invalid Access'})
//     }
// }

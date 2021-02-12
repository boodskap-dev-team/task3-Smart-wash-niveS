var Common = require("./common")
var Table = require("./tables")

var History = function (app){
    this.app = app;
    this.common = new Common(app);
    this.table = new Table(app);
}
module.exports = History;

History.prototype.performAction = function (req,res){

    const self = this;

    if(req.params.action === 'list'){
        self.common.commonSearch(self.table.HISTORY_TABLE,req,res);
    }
    
    else{
        res.status(401).json({status:false,message:'Invalid Access'})
    }
}

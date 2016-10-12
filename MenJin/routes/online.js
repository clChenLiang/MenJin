/**
 * Created by rf-lab on 15-12-4.
 */


var express = require('express');
var router = express.Router();
//var file = require('../public/child.w.design.html');

//app.use(express.static(path.join(__dirname,'public')))



router.get('/',function(req,res,next){
    console.log('online try is ready for place!')
    //res.writeHead(200,{"Content-Type":"text/html"});
    //res.write(file);
    res.end();
})
router.post('/',function(req,res,next){
    console.log('online try is ready for place!')
    res.sendfile('../child.w.design.html');
})





module.exports = router;
var express = require('express');
var router = express.Router();
var monk=require('monk');
var moment=require('moment');

var randomstring=require('randomstring');
var nodemailer=require('nodemailer');
var db=monk('localhost:27017/logininfo');
var collection=db.get('students');
var coll=db.get('regdetails');

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/details', function(req, res, next) {
  res.render('details');
});

router.get('/reset',function(req, res, next){
	res.render('reset');
})

router.post('/nandu',function(req, res){
	console.log(req.body);
	collection.insert(req.body, function(error, docs){
		if(error){
			res.sendStatus(500)
		} else{
			res.sendStatus(200)
			res.send(docs)
		}
	})
})
router.post('/posting',function(req, res){
	coll.findOne({$or:[{"email":req.body.email},{"phno":req.body.phno}]},function(error,docs){
		if(docs && !error){
			//console.log("already exists")
			res.sendStatus(500)
		}
		if(!docs){
			req.body.date=moment().format("DD-MM-YYYY")+" AT "+moment().format("HH:MM");
		//console.log(req.body);
	coll.insert(req.body, function(error, docs){
		if(error){
			res.sendStatus(500)
		} else{
			res.sendStatus(200)
			res.send(req.body)
		}
	})
}
	})
	
})



router.post('/checkmail',function(req, res){
	var otp=randomstring.generate(7);
	collection.findOne({"email":req.body.email},function(error, docs){
		if(error || (docs==null))
		{
			res.sendStatus(500)
		}
		else{
			console.log(otp)
			collection.update({"email":req.body.email},{$set:{"otp":otp}})
			res.sendStatus(200)
		}
	})
})


router.post('/checkotp',function(req, res){
	collection.findOne({"email":req.body.email, "otp":req.body.otp},function(error, docs){
		if(error ||(docs==null)){
			res.sendStatus(500)
		}
		else{
			res.sendStatus(200)
		}
	})
})

router.post('/cpassword',function(req, res){
	collection.update({"email":req.body.email},{$set:req.body},function(error, docs){
		if(error ||(docs==null)){
			res.sendStatus(500)
		}
		else{
			res.sendStatus(200)
		}
	})
})

module.exports = router;

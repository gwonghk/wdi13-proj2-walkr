var User = require('../models/user');
var Pet = require('../models/pet');
var Movement = require('../models/movement');
var Bag = require('../models/bag');


//exports.currentUserEmail = 'asdf';

exports.createNewUser = function(accessToken, refreshToken, profile, cb){

	var firstPetMovement = new Movement();
	firstPetMovement.totalSteps = 999;
	firstPetMovement.treasureSessionSteps = 0;
	firstPetMovement.save((err) => { if(err)console.log('ERROR - userController.createNewUser-firstPetMovement:', err); });

	var firstPet = new Pet();
	firstPet.name 		= 'poring';
	firstPet.age 		= 0;
	firstPet.movement 	= firstPetMovement
	firstPet.save((err) => { if(err)console.log('ERROR - userController.createNewUser-firstPet:', err); });

	var bag = new Bag();
	bag.save(err => { if(err) console.log('ERROR - userController.createNewBag:', err); });

	var user = new User();
	user.firstname = profile._json.first_name;
	user.lastname = profile._json.last_name;
	user.email = profile.emails[0].value;
	user.password = "";

  	user.pet = firstPet;
  	user.bag = bag;

	user.facebook.accessToken = accessToken;
	user.facebook.refreshToken = refreshToken;
	user.facebook.id = profile.id;
	user.facebook.profile = profile;
	user.save((err, userdata) => { if(err){console.log('ERROR - userController.createNewUser-user:', err);}
		cb(userdata);
	});
}

/*  	var user = new User();
  	//user.name = take it from fb;
  	user.email 		= email;
  	user.password 	= "";


  	user.facebook.accessToken 	= accessToken;
  	user.facebook.refreshToken 	= refreshToken;
  	user.facebook.id 			= profile.id;
  	user.facebook.profile 		= profile;
	user.save((err, user) => {
	  return done(null,user);
	  console.log(err);
	});*/
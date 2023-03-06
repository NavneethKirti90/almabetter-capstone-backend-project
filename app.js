//Import the express module
const express = require('express');

const subscribers = require('./models/subscribers');
//Import Schema model
const subscriberModel = require('./models/subscribers');

//enable express usage
const app = express();

//It parses incoming JSON requests and puts the parsed data in request.body
app.use(express.json());

//Import Joi — for API validation for Node.js and Express js
const Joi = require("joi");


//THE HOME ROUTE WHICH DISPLAY A CUSTOME MESSAGE;
app.get('/', (request, response, next) => {
  response.send({message:"almabetter  capstone project by NAVNEETH KIRTI"});
});


/**Since Mongoose functions are asynchronous, we will be using async/await.
 Once you have the data this code uses a try/catch block to send it **/


 //TO GET LIST OF ALL SUBSCRIBERS

app.get("/subscribers", async (request, response) => {

  //To retrieve records from a database collection we make use of the .find() function.
    const subscribers = await subscriberModel.find({});  
try {
//Since no parameters have been provided, it will return all of the items in the database.
      response.send(subscribers);
    } catch (error) {    //send error if route not found
      response.status(404).send(error);
    }
  });


  // TO GET NAME AND SUBSCRIBED CHANNEL OF SUBSCRIBERS

  app.get("/subscribers/name", async (request, response) =>{

    try{
//To retrieve selected records from a database collection we make use of the .find().select() function.
const subscribers = await subscriberModel.find().select({
  name:1, subscribedChannel:1, _id:0
})
    response.send(subscribers);
    }
    catch(err){
      response.status(404).send(error);
    }})
  

// TO GET THE ONLY ONE SUBSCRIBER DATA WHICH IS FIND BY ID

  app.get("/subscribers/:id", async (request, response) =>{
    try {
         const _id=request.params.id;

         //mongoose findById() function to find a single document by its _id field.
         const subscriberData = await subscriberModel.findById(_id);

        //  console.log(subscriberData);
      response.send(subscriberData);
    }
    catch(err) {
      //incase if we insert wrong id
          response.status(400).send({message:"Error! Subscriber Id does not exist"}); 
    }
});



  // FOR ADDING A NEW SUBSCRIBER
app.post("/subscribers/add", async (request, response) => {

  /**
   * Joi will validate all the object keys that will pass down the values to the database.
   *  And then that validated schema will be sent as the response.
   */


  //constructing a schema, our call to Joi.object(),
  const schema = Joi.object({

  //Validation of key "name"   
    name: Joi.string()          //value should be a string
    .regex(/^[A-Za-z ]+$/)     //value should matches that pattern..so user cant input number as name ie. "123"
    .min(2)                   //value will not less than 2 character
    .max(30)                 //value will not greater than 30 character
    .required(),            //value is required

    //Validation of key "subscribed Channel"
    subscribedChannel: Joi.string()                 //value should be a string
    .regex(/^[A-Za-z0-9 ]+$/)                      //value should matches that pattern 
    .min(2)                                       //value will not less than 2 character
    .max(50)                                     //value will not greater than 100 character 
    .required(),                                //value is required
});


// console.log(schema.validate(request.body));

/**If no errors are found then the object is returned only with the value key,
 *  otherwise the error key is also obtained with the details of the error. */
if(schema.validate(request.body).error){
  response.send(schema.validate(request.body).error.details);
}
else{

  //creating a new subscriber
  const subscriber = new subscriberModel({
    name: request.body.name,
    subscribedChannel: request.body.subscribedChannel
  });
  try {

    //Once this is done, we will use .save() to save it to the database.
    const newSubscriber = await subscriber.save();

    response.status(201).json({ newSubscriber }); //response send to the database
  } catch (err) {
    response.status(400).json({ message: err.message });
  }
}
    
});

  //FOR ADDING MULTIPLE SUBSCRIBERS

  app.post("/subscribers/addMany", async (request, response) => {

    //JOI API Validation

    //FROM HERE
    const schema = Joi.array().items({        //We use .array().items() method for each item validation
      name: Joi.string()
      .regex(/^[A-Za-z ]+$/)
      .min(2)
      .max(30)
      .required(),
      subscribedChannel: Joi.string()
      .regex(/^[A-Za-z0-9 ]+$/)
      .min(2)
      .max(50)
      .required(),
  });
  // console.log(schema.validate(request.body));

  if(schema.validate(request.body).error){
    response.send(schema.validate(request.body).error.details);
    
  }   //TILL HERE
  else{
    subscriberModel.insertMany(request.body).then((subscribers) =>{
      response.status(201);
      response.send(subscribers);
    }).catch((error) =>{
response.status(400).send(error)
    })
  }
})
  

//FOR UPDATING THE SUBSCRIBER DATA BY A ID

app.patch("/subscribers/update/:id", async (request, response)=>{

  //JOI API Validation

    //FROM HERE
const schema = Joi.object({
    name: Joi.string()
    .regex(/^[A-Za-z0-9 ]+$/)
    .min(2)
    .max(30)
    .required(),
    subscribedChannel: Joi.string()
    .regex(/^[A-Za-z ]+$/)
        .min(2)
        .max(50)
        .required(),
});
// console.log(schema.validate(request.body));
if(schema.validate(request.body).error){
  response.send(schema.validate(request.body).error.details);
}

//TILL HERE
else{
  try{

    //findOne() takes the target’s id;
    const updatedSubscriber = await subscriberModel.findOne({
        _id : request.params.id,
    })

    //Updating process of fined subscriber
    //FROM HERE

    //for updating the name
    if(request.body.name){
        updatedSubscriber.name = request.body.name; //send it to the body
    }

    //for updating the subscribed Channel
    if(request.body.subscribedChannel){
        updatedSubscriber.subscribedChannel = request.body.subscribedChannel;  //send it to the body
    }
    //TILL HERE

    //Once this is done, we will use .save() to save it to the database.
    await updatedSubscriber.save();
    response.send(updatedSubscriber)  //Updated response send it to the body;
}
catch(err){
    response.send(err.message)
}
}
})


// FOR DELETING ANY PERTICULAR SUBSCRIBER WHICH IS FIND BY ID

app.delete("/subscribers/delete/:id", async (request, response) =>{
    try{

      //deleteOne() method to easily remove a one record from the database
        await subscriberModel.deleteOne({_id:request.params.id})
        response.status(200)
    response.send({message:"subscriber deleted succesfully"})  //When deleted show a custom message
    } catch{
        response.status(400);
        response.send({error:"subscriber does not exist"})  //When id is not found
    }
});

  
//Exports module
module.exports = app;

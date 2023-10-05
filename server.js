
const socketServer = require("./socketConnection");
const app = require('express')();
const schoolRouter = require('./routes/route.school');
const parentRouter = require('./routes/route.parent');
const { createSession, createNeo4jSession } = require("./databaseConfig/config.neo4j");
const mongoDB = require("./databaseConfig/config.mongoDB");
const mongoDBConnection = require("./databaseConfig/config.mongoDB");

const bodyParse = require("body-parser");
const { makeNodeRelation } = require("./controllers/controller.route");
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());

app.use("/api/school",schoolRouter);
app.use('/api/parent',parentRouter);



//neo4j connection
createNeo4jSession();
mongoDBConnection().catch((err)=>console.log(err))
//init socker socker for live bus

socketServer.liveLocation();
socketServer.startServer();


makeNodeRelation({})

if(process.env.NODE_ENV=='Production'){
    app.listen(()=>{
   console.log("Server Started")
    });
  }else{
    app.listen(8000,()=>{
      console.log(` port 8000 is listening.......`)    
  })
  
  }
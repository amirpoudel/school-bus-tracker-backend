const { matchLocation, calculateTime } = require("../helper/helper");
const { getRouteNode, createOrUpdateTimeRelation } = require("../models/neo4j/services/service.route");


let initialized = false;
let cachedRoute = null;




const getRouteNodeOnce = async () => {
    if (!initialized) {
        cachedRoute = await getRouteNode();
        initialized = true;
        console.log("Geeting Node From Graph")
    }
    return cachedRoute;

}


let previousMatchNode = null;
let previousLocation = null;



let parentNode = [];
let mapNode = new Map();


const makeNodeRelation = async function (currentLocation) {
    const route = await getRouteNodeOnce();
    //HERE USE OR STACK DATA STRUCTURE FOR TRACKING PARENT NODES 
  // console.log(route['records'])
    //console.log("Current Location From",currentLocation)
 
    for (const record of route['records']) {
      //  console.log("this is record",record)

       // console.log(record.get('n').properties)
        const node = record.get('n').properties
        // console.log(Object.values(node))
        // console.log("this is node ",node)
        // console.log("This is record",record)

        if (matchLocation(currentLocation, node)) {

            parentNode.push({})
            console.log("Match Location",currentLocation,node)
            //only for testing
            previousMatchNode = node;
            previousLocation = currentLocation;
            //stack.push({previousMatchNode,previousLocation});


            // if previous match node is matched with current node then do nothing
            if (previousMatchNode && previousMatchNode['studentID'] === node['studentID']) {
                console.log("Previous Node Matched",previousMatchNode)
                //break;
            }
            // if previous match node is not matched with current node then make relation

            if (previousMatchNode && previousLocation) {
                //make Relations
                if(previousMatchNode['studentID'] !== node['studentID']){
                    console.log("Make Relation")
                    console.log(previousMatchNode)
    
                    //calculate ETA
                    const timeTakenMinutes = calculateTime(previousLocation, currentLocation);
                    //create or update relation
                    console.log(timeTakenMinutes)
                    
                    createOrUpdateTimeRelation(previousMatchNode, node, { time: timeTakenMinutes }).then((result) => {
                        console.log("Relation Created")
                    })}
                    previousMatchNode = node;
                    previousLocation = currentLocation;
                }
            }else{
                //console.log("No Match")
            }
          
        
        }
    }





module.exports = { makeNodeRelation }

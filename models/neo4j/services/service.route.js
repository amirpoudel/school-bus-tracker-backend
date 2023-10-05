
const {createNeo4jSession,session} = require("../../../databaseConfig/config.neo4j");



async function createRouteNode(node){
    try {
        return await session.run(
            `CREATE (:Stop {studentID: $studentID, name: $name, latitude: $latitude, longitude: $longitude, areaName: $areaName})`,
            {
                studentID: node.studentID,
                name: node.name,
                latitude: node.latitude,
                longitude: node.longitude,
                areaName: node.areaName
            }
        )
    } catch (error) {
        throw error
    }
    
}


async function getRouteNode(){
    return await session.run(
        `MATCH (n:Stop) RETURN n`
    )
}

async function matchRouteNode(longitude,latitude){

}




async function createOrUpdateTimeRelation(node1,node2,relation){
    return await session.run(
        `
        MATCH (n:Stop {studentID: $studentID1}), (m:Stop {studentID: $studentID2})
        MERGE (n)-[r:ROUTE]->(m)
        ON CREATE SET r.count = 1, r.averageTime = $newTime
        ON MATCH SET r.count = coalesce(r.count, 0) + 1, r.averageTime = coalesce(r.averageTime, 0) * (r.count - 1) / r.count + $newTime / r.count
        RETURN r
    ` ,
        {
            studentID1: node1.studentID,
            studentID2: node2.studentID,

            newTime: relation.time
        }
    )
}






module.exports = {createRouteNode,getRouteNode,createOrUpdateTimeRelation}


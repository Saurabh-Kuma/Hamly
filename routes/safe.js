const uri= "https://ap-south-1.aws.data.mongodb-api.com/app/data-folwx/endpoint/data/v1/action"
const apiKey="C0zaHx4WauwHHVyyd5A1Rl6RRka7e0NbLXSYhiKZuvONXyaIOMup3Yhh1KjfYC79"
var opperation=""

var config = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': apiKey,
    }
};  
var dbinfo={
    "collection": "users",
    "database": "dbapp",
    "dataSource": "Cluster"
}


module.exports= {uri, apiKey, config, dbinfo, opperation}
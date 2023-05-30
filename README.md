# Hamly
It is a ML based spam email detection system
Link of project: https://hamly.onrender.com 


To run this project on your local machine you should follow these steps
1. install node js in your machine.
2. open this project in your code editor.
3. open terminal on root directory of the project like: cmd, powershell.
4. run command "npm install" // to install all dependencies used in project which is mentioned in package.json.
5. add .env file in root directory and and set two env veriables uri and apiKey.
    where uri is mongodb database api endpoint + "/action" example: uri = "write-your-api-endpoint-here"+"/action" (in .env file)
    and apiKey is key which is generated on mongodb website example: apiKey = "write-your-apiKey-here" (in .env file)
6. run command "node index.js" // to run the project in your local machine.
 require("dotenv").config();
 
 async function getauthtoken(){
    let generatetoken= await fetch("http://20.244.56.144/test/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          
            {
              companyName:process.env.companyName,
              clientID: process.env.clientID,
              clientSecret:process.env.clientSecret,
              ownerName:process.env.ownerName,
              ownerEmail: process.env.ownerEmail,
              rollNo: process.env.rollNo
          }
      )
      })
      if(generatetoken){
        generatetoken=await generatetoken.json()
        console.log(generatetoken)
      return generatetoken.access_token
      }
      
}

module.exports = getauthtoken;
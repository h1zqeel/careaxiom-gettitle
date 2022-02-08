const fetch = require('node-fetch');
const express = require('express');
const res = require('express/lib/response');
const app = express()
const port = 3000;
const fetchTitle = require('./fetching.js');


app.get('/I/want/title', async (req, res) => {
    let addresses = req.query.address;

    if(typeof addresses === 'string'){
        addresses = [addresses];
    }

    res.write(`
    <html>
    <head></head>
    <body>
        <h1>Following are the titles of given Websites: </h1>
        <ul>`);
        let c = 0;
      
    for(let i = 0; i < addresses.length; i++){
        
        let address = addresses[i];
        let oldaddress = address;
        if(!address.includes('http://')){
            address = 'http://' + address;
        }
        // console.log(address);
        
            fetchTitle(address,(title)=>{

            res.write(`<li> ${oldaddress} - "${title}" </li>`);
                c++;
                if(c === addresses.length){
                    res.write(`</ul>
                    </body>
                    </html>`);
                    res.end();
                }
              
            });
        
        
       

    }


})

app.listen(port, () => {
  console.log(`Running Task 1: listening on port ${port}`)
})
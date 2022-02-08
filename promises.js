const express = require('express');
const app = express()
const port = 3000;
const fetchTitle = require('./fetching.js');

let getTitle = (address) =>{
    let oldaddress = address;
    if(!address.includes('http://')){
              address = 'http://' + address;
        }
    return new Promise((resolve,reject)=>{
        try{
        fetchTitle(address,(title)=>{
            resolve({address:oldaddress, title});
        })
        }catch(e){
            reject({address:oldaddress, title: "NO RESPONSE"});
        }
    }).catch((err)=>{
        return err;
    })
}
app.get('/I/want/title', (req, res) => {
    let addresses = req.query.address;

    if(typeof addresses === 'string'){
        addresses = [addresses];
    }
    let addressPromises = [];
    for(let i = 0; i < addresses.length; i++){
        addressPromises.push(getTitle(addresses[i]));
    }
    
    res.write(`
    <html>
    <head></head>
    <body>
        <h1>Following are the titles of given Websites: </h1>
        <ul>`);

    Promise.all(addressPromises).then((data)=>{
        data.forEach((titles)=>{
             res.write(`<li>${titles.address} - "${titles.title}"</li>`)
        })
    }).then(()=>{
        res.write(`</ul>
        </body>
        </html>`);
         res.end();
    });    
   
})

app.listen(port, () => {
  console.log(`Running Task 3: listening on port ${port}`)
})
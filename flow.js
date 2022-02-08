const express = require('express');
const app = express()
const port = 3000;
const async = require('async');
const fetchTitle = require('./fetching.js');


app.get('/I/want/title', (req, res) => {
    let addresses = req.query.address;

    if(typeof addresses === 'string'){
        addresses = [addresses];
    }

    
    let titles = [];
    async.series([
        (callback)=>{
           
            res.write(`
            <html>
            <head></head>
            <body>
                <h1>Following are the titles of given Websites: </h1>
                <ul>`);
                callback(null,1);
        },
        (callback)=>{
            async.each(addresses,(address, callback)=>{
            
                let oldaddress = address;
                if(!address.includes('http://')){
                          address = 'http://' + address;
                    }
                
                fetchTitle(address,(title)=>{
                    // console.log(title);
                    titles.push({address:oldaddress,title})
                    callback(null,title);
                })
                
                
               
                
                
            },(err)=>{
                if(!err){
                    for(let i =0; i < titles.length; i++){
                        // console.log(titles);
                        res.write(`<li> ${titles[i].address} - "${titles[i].title}" </li>`);
                        
                    }
                    callback(null,2);
                    // console.log(titles);
                }
            })
            
        },
        (callback)=>{
            res.write(`</ul>
            </body>
            </html>`);
            callback(null,3);
            
        },
        (callback)=>{
            res.end();
            callback(null,3);
        }
    ])
   
    

})

app.listen(port, () => {
  console.log(`Running Task 2: listening on port ${port}`)
})
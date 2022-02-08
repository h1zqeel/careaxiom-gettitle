const fetch = require('node-fetch');
const parseTitle = (body) => {
    let match = body.match(/<title>([^<]*)<\/title>/) 
    return match[1]
  }

let fetchTitle = (url,callback)=>{

    fetch(url)
    .then(res => res.text()) 
    .then(body => parseTitle(body)) 
    .then(title => {
      if(title != undefined){
        callback(title)
      }else {
        callback('NO RESPONSE')
      }
    })
    .catch(e=>{
      callback('NO RESPONSE')
    })
  
}

module.exports = fetchTitle;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(morgan('tiny'))
app.get('/', (req, res) => {
    res.json({
        message: 'Drake'
    })
})
function getResults(body) {
    const $ = cheerio.load(body);
    const rows = $('li.result-row');
    const results=[];
    
    rows.each((index, element) => {
        const result = $(element);
        const title = result.find('.result-title').text();
        const price = $(result.find('.result-price').get(0)).text();
        const imageData = result.find('a.result-image').attr('data-ids');
         const images = []
         if(imageData){
            const parts = imageData.split(',');
            
            const ids  = parts.map((id)=>{
                let url = `https://images.craigslist.org/${id.split(':')[1]}_300x300.jpg`
                images.push(url);
            })
        }
        const hood = result.find('.result-hood').text().trim().slice(1,-1);
    
        results.push({
            title,
            price,
            images,
            hood
        })
    })
    return results;
}
app.get('/search/:location/:search_term', (req, res) => {
    const { location, search_term } = req.params;
    const url = `https://${location}.craigslist.org/search/sss?sort=date&query=${search_term}`;
    fetch(url)
        .then(res => res.text())
        .then(body => {
            const results = getResults(body);
            res.json({
                results
            })
        })

})


app.use((req, res, next) => {
    const err = new Error('not Found');
    res.status(404);
    next(err);
})

app.use((err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message
    })
})



app.listen(3000);
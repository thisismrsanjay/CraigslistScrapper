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
        results.push({
            title,
            price
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
const googleTrends = require('google-trends-api');
const fs = require('fs');
const { topTrends } = require('./data/top_trends');

// const { days } = dailyTrends;
// const daySeconds = 60 * 60 * 24 * 1000;
const years = ['2016', '2017', '2018', '2019', '2020']
let data = { }

getBarData(0, data)

function getBarData(index, data) {
    console.log(years[index])
    let queries = topTrends[years[index]].slice(0, 5)
    let startTime = new Date(years[index]);
    let endTime = null;
    if (years[index] === '2020') {
        endTime = new Date(Date.now())
    } else {
        endTime = new Date(years[index + 1]);
    }

    googleTrends.interestOverTime({
        keyword: queries,
        startTime,
        endTime,
    })
    .then(function(results){
        results = JSON.parse(results);
        results = results["default"]["timelineData"]
        trends = [ [], [], [], [], []]
        dates = []
        results.forEach(entry => {
            dates.push(entry.time);
            entry.value.forEach((item, index) => {
                trends[index].push(item);
            });
        });
        data[years[index]] = {
            values: queries.map( (query, index) => {
                return {
                    name: query,
                    max: Math.max( ...trends[index]),
                    values: trends[index],
                }
            }),
            dates
        }

        return data;
    })
    .catch(function(err){
        console.error('Oh no there was an error', err);
    })
    .then( results => {
        // recurse through dates until on last day then break out and save data

        // base case is to end when we have reached june 9th. This is hardcoded
        // for conveniences sake rn
        if (years[index] === '2020') {
            console.log("Recursion finished")
            results = JSON.stringify(results);
            writeFile(results, 'barChart')
            return results
        }
        getBarData(index + 1, results)
    })
    .catch( err => console.log('recursion or write faile') );
}


writeFile = (data, name='output') => {
    fs.writeFile(`${name}.js`, data, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
}
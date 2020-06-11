
const googleTrends = require('google-trends-api');
const fs = require('fs');
const { topTrends } = require('./data/top_trends');

const years = ['2016', '2017', '2018', '2019', '2020']
let data = { }

getBarData(0, 0, data)

function getBarData(index, trendIndex, data) {
    console.log(years[index])
    let queries = topTrends[years[index]].slice(0, 5)
    let startTime = new Date(years[index]);
    let endTime = null;

    if (years[index] === '2020') {
        endTime = new Date(Date.now())
    } else {
        endTime = new Date(years[index + 1]);
    }

    googleTrends.interestByRegion({
        keyword: queries[trendIndex],
        startTime,
        endTime,
        geo: 'US',
    })
    .then(function(results){
        results = JSON.parse(results);
        results = results["default"]["geoMapData"]
        if (!data.hasOwnProperty(years[index])) {
            console.log('creating values and queries')
            data[years[index]] = {
                queries,
                values: []
            }
        }
        data[years[index]]["values"].push(results)
        return data;
    })
    .catch(function(err){
        console.error('Oh no there was an error', err);
    })
    .then( results => {
        // recurse through dates until on last day then break out and save data

        // base case is to end when we have reached june 9th. This is hardcoded
        // for conveniences sake rn
        if (years[index] === '2020' & trendIndex === 4) {
            console.log("Recursion finished")
            results = JSON.stringify(results);
            writeFile(results, 'mapDataSingle')
            return results
        }
        trendIndex = trendIndex === 4 ? 0 : trendIndex + 1;
        index = trendIndex == 0 ? index + 1 : index;
        console.log(index, trendIndex)
        getBarData(index, trendIndex, results)
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
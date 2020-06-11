# Tracking Trending Topics

A subtle expansion up Google [Trends](https://trends.google.com/trends/?geo=US)
to get a better understanding of what is truly *trending*

## Website

This is meant to be explored and analyzed to get your own interpretation of the
data at its webstie:[https://garrettgibo.github.io/tracking-trending-trends/](https://garrettgibo.github.io/tracking-trending-trends)

## The DATA

Getting data from Google Trends is very much a pain. There are two libraries that
can be used to interface with it: [pytrends](https://github.com/GeneralMills/pytrends)
and [google-trends-api](https://www.npmjs.com/package/google-trends-api). Neither of
them work great, but together the fill in the shortcomings of each other. Google
probably doesn't want you to actually make requests for their data, so it is
very important to not make too many request; otherwise, you will get locked out
for a period of time.

### Querying Google Trends

The data I have gathered is a collection of the top trending topics from the years
2016-now(June 2020). I have also collected geo data for the US that shows the
trending data for each year with respect to the states where searches came from.

My js scripts to query Google Trends are in the `scripts` folder. The google-trends-api
resolves around Promises, so in order to make successive requests, I designed my
query to recursively call itself after successfully gathering and cleaning data.

## What to Do

It's pretty straightforward, there is data from 2016 - now, so it is encouraged to
explore and make your own conclusions. Some of the top trends are surprising, but
context explains it all.

## How it was Made

My goal was to emulate the look and feel of Google Trends, while making the
necessary expansions. To accomplish this site itself was built using react. I
started out making the charts in d3, but I realized that I have nothing to prove
with it, so I switched to highcharts for everything.

## TODO

- Add commentary for charts to make presentation of data more guided
- Allow for finer tuning of time periods
- Expand trend comparison to worldwide searches
- Acquire data all the way back to start (2004)
- Set up backend server to get realtime updates for trending topics
var cheerio = require("cheerio");
var request = require("request");

// First, tell the console what server2.js is doing
console.log("Grabbing every event title and link from the Built in Chicago website:");

// Making a request for nhl.com's homepage
request("https://www.builtinchicago.org/events", function(error, response, html) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(html);

  // Empty array to save our scraped data
  var results = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $("div.title").each(function(i, element) {

    // Save the text of the div-tag as "title"
    var title = $(element).text();

    // Find the div tag's children attribute a-tag, and save it's href value as "link"
    var link = $(element).children().attr("href");

    // Find the div tag's children attribute a-tag, and save it's href value as "date"
    // $("div.date").each(function(i, element) {
    //   var date = $(element).text().attr("div.date");
    // });
    
    //  $("div.time").each(function(i, element) {
    //   var time = $(element).text().attr("div.time");
    // }); 

    // Make an object with data we scraped for this h4 and push it to the results array
    results.push({
      title: title,
      link: link,
      // date: date,
      // time: time,
      // sponsor: sponsor
    });
  });

  // After looping through each h4.headline-link, log the results
  console.log(results);
});

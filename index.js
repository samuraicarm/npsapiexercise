  'use strict';

  const searchURL = "https://developer.nps.gov/api/v1/parks";
  const apiKey = "9AfnCdL3rlsLEW2jkkoIYdU7tqt8tJjmcoVzQrlP"; 

  $(document).ready(function(){
    console.log("ready");
  });

  $(function() {
    console.log('App loaded! Waiting for submit!');
  });

  function watchForm() {
    console.log("watch form");
    $('form').submit(event => {
    console.log("I get called after the form is submitted.");
    event.preventDefault();
    const searchTerms = $('#searchTerms').val();
    const limit = $('#maxResults').val();
    getParkResults(searchTerms,limit);
    });
  }


//update URL to include values from form
function getParkResults(query, limit=10){
  console.log("Getting park results");
  const params = {
  api_key: apiKey,
  stateCode: query,
  limit: limit-1,
};
console.log(params);

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);
 
 //fetch park list
  fetch(url) 
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(err => {$('#errorMessage').text(`something went wrong: ${err.message}`);
  });
}

 //turn states into query
 function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key =>`${encodeURIComponent(key)
  }=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  
  //display results
  function displayResults(responseJson) {
    console.log(responseJson);
    $('#parkList').empty();
    for (let i=0; i<responseJson.data.length; i++) {
      $('#parkList').append(`
      <li><h3>${responseJson.data[i].fullName}</h3>
      <a href='${responseJson.data[i].url}'>${response.Json.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      <p>${responseJson.data[i].directionsURL}</p>
      </li>`)
    };
    $('#parkResults').removeAttr('hidden');
  }

  $(watchForm);


 






  


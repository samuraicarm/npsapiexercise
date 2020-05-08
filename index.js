  'use strict';

  const searchURL = "https://developer.nps.gov/api/v1/parks";
  const API_KEY = "9AfnCdL3rlsLEW2jkkoIYdU7tqt8tJjmcoVzQrlP"; 


  $(document).ready(function(){
    console.log("ready");
  });

  $(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
  });

  function watchForm() {
    $('form').submit(event => {
     event.preventDefault();
     let selectedStates = getStates();
     getParkResults(selectedStates);
    });

  }


  //get maxResults from form
  function getMaxResults(){
   const maxResults = document.getElementById('myInput').value;
    return maxResults
  }

  //get states from form
  function getStates(){ 
  const states = [];
   $.each($("input[name='stateCode']:checked"), function(){
     states.push($(this).val());
   }); 
    console.log(states)
  }

 //turn states into query
  function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(key =>`${encodeURIComponent(key)
  }=${encodeURIComponent(params[key])}`
    );
    return queryItems.join('&');
  }
  

  //update URL to include values from form
  function getParkResults(stateArray, maxResults=10){
  
    const params = {
  api_key: API_KEY,
  limit: maxResults,
  stateCode: stateArray,
  };
  
   const queryString = formatQueryParams(params);
   const url = searchURL + '?' + queryString;

   console.log(url)
   
   //fetch park list
    fetch(url)
      .then(response => response.json())
      .then(responseJson => console.log(responseJson))
      .catch(err=>{ alert('something went wrong')});

  }


/*
fetch("https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1609-1599", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "f0bafa3ac02bed32d95dd79bef5a5f4d"
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(accountdata) {
    appendAccountData(accountdata);
  })
  .catch(function(err) {
    console.log('error: ' + err);
  });

function appendAccountData(accountdata) {

  function objLength(obj) {
    var i = 0;
    for (var x in obj) {
      if (obj.hasOwnProperty(x)) {
        i++;
      }
    }
    return i;
  }
  const obj = accountdata;
  const myJSON = JSON.stringify(obj);
  document.getElementById("apiCall").innerHTML = myJSON;
  let mainContainer = document.getElementById("accountdataTable");
  for (let i = 0; i < Number(accountdata.response.length); i++) {
    let tr = document.createElement('tr');
    let tddate = document.createElement('td');
    let tdmatchup = document.createElement('td');
    let tdvenue = document.createElement('td');
    let tdscore = document.createElement('td');


    fixturedate = accountdata.response[i].fixture.date;
    tddate.innerHTML = dateFormat(fixturedate);

    matchup = document.createElement('div');
    matchup.classList.add('box');

    homeTeam = document.createElement('img');
    homeTeam.src = accountdata.response[i].teams.home.logo;
    homeTeam.classList.add("teamlogos");
    homeTeam.setAttribute("alt", accountdata.response[i].teams.home.name)

    awayTeam = document.createElement('img');
    awayTeam.src = accountdata.response[i].teams.away.logo;
    awayTeam.setAttribute("alt", accountdata.response[i].teams.away.name)
    awayTeam.classList.add("teamlogos");

    v = document.createElement('span');
    v.innerText = 'v';
    v.classList.add("v");

    matchup.appendChild(homeTeam);
    matchup.appendChild(v);
    matchup.appendChild(awayTeam);

    tdmatchup.appendChild(matchup);

    venue = accountdata.response[i].fixture.venue.name;
    venuecity = accountdata.response[i].fixture.venue.city;

    tdvenue.innerHTML = venue + '<br />' + venuecity

    venue = accountdata.response[i].fixture.venue.name;
    venuecity = accountdata.response[i].fixture.venue.city;

    homeScore = accountdata.response[i].goals.home;
    awayScore = accountdata.response[i].goals.away;

    if (homeScore == awayScore) {
      results = "Result: Draw";
    } else if (homeScore > awayScore) {
      results = "Result:  Home team won";
    } else {
      results = "Result:  Home team lost";
    };

    tdscore.innerHTML = results + '<br />' + homeScore + ' - ' + awayScore;

    tr.appendChild(tddate);
    tr.appendChild(tdmatchup);
    tr.appendChild(tdvenue);
    tr.appendChild(tdscore);

    mainContainer.appendChild(tr);
  }

}
*/
/*
fetch('mls.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(seasondata) {
    appendSeasonData(seasondata);
  })
  .catch(function(err) {
    console.log('error: ' + err);
  });
*/

fetch('combine.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(fixdata) {
    appendFixtureData(fixdata);
  })
  .catch(function(err) {
    console.log('error: ' + err);
  });


function appendFixtureData(fixdata) {
  let mainContainer = document.getElementById("fixturedata");
  for (var i = 0; i < fixdata.length; i++) {
    let tr = document.createElement('tr');
    //    let tdaccount = document.createElement('td');
    let tddate = document.createElement('td');
    let tdmatchup = document.createElement('td');
    let tdvenue = document.createElement('td');
    let tdscore = document.createElement('td');

    fixturedate = fixdata[i].fixture.date;
    tddate.innerHTML = dateFormat(fixturedate);
    tddate.classList.add('green');

    matchup = document.createElement('div');
    matchup.classList.add('box');

    homeTeam = document.createElement('img');
    homeTeam.src = fixdata[i].teams.home.logo;
    homeTeam.classList.add("teamlogos");
    homeTeam.setAttribute("alt", fixdata[i].teams.home.name)

    awayTeam = document.createElement('img');
    awayTeam.src = fixdata[i].teams.away.logo;
    awayTeam.setAttribute("alt", fixdata[i].teams.away.name)
    awayTeam.classList.add("teamlogos");

    v = document.createElement('span');
    v.innerText = 'v';
    v.classList.add("v");

    matchup.appendChild(homeTeam);
    matchup.appendChild(v);
    matchup.appendChild(awayTeam);

    tdmatchup.appendChild(matchup);

    venue = fixdata[i].fixture.venue.name;
    venuecity = fixdata[i].fixture.venue.city;

    tdvenue.innerHTML = venue + '<br />' + venuecity

    venue = fixdata[i].fixture.venue.name;
    venuecity = fixdata[i].fixture.venue.city;

    homeScore = fixdata[i].goals.home;
    awayScore = fixdata[i].goals.away;

    if (homeScore == awayScore) {
      results = "Result: Draw";
    } else if (homeScore > awayScore) {
      results = "Result:  Home team won";
    } else {
      results = "Result:  Home team lost";
    };

    tdscore.innerHTML = results + '<br />' + homeScore + ' - ' + awayScore;

    tr.appendChild(tddate);
    //    tr.appendChild(tdaccount);
    tr.appendChild(tdmatchup);
    tr.appendChild(tdvenue);
    tr.appendChild(tdscore);

    mainContainer.appendChild(tr);
  }

}

/*
function appendSeasonData(seasondata) {
  let mainContainer = document.getElementById("seasondata");
  for (let i = 0; i < seasondata.response[0].seasons.length; i++) {
    let tr = document.createElement('tr');
    let tdyear = document.createElement('td');
    let tdstart = document.createElement('td');
    let tdend = document.createElement('td');
    let tdcurrent = document.createElement('td');
    let tdlineups = document.createElement('td');


    tdyear.innerHTML = seasondata.response[0].seasons[i].year;
    tdyear.classList.add("year");
    seasonStart = seasondata.response[0].seasons[i].start;
    tdstart.innerHTML = dateFormat(seasonStart);
    seasonEnd = seasondata.response[0].seasons[i].end;
    tdend.innerHTML = dateFormat(seasonEnd);
    tdcurrent.innerHTML = seasondata.response[0].seasons[i].current;
    tdlineups.innerHTML = seasondata.response[0].seasons[i].coverage.fixtures.events;

    tr.appendChild(tdyear);
    tr.appendChild(tdstart);
    tr.appendChild(tdend);
    tr.appendChild(tdcurrent);
    tr.appendChild(tdlineups);

    mainContainer.appendChild(tr);
  }
}
*/

function dateFormat(x) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var d = new Date(x);
  var curr_date = d.getDate() + 1;
  var curr_month = monthNames[d.getMonth()];
  var curr_year = d.getFullYear();
  var newDate = curr_month + ' ' + curr_date + ", " + curr_year;
  return newDate;
}

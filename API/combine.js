var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "f0bafa3ac02bed32d95dd79bef5a5f4d");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


Promise.all([
/*
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1609-1602', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1609-1604', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1602-1604', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1609-1599', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1602-1599', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1604-1599', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1609-1615', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1602-1615', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1604-1615', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1599-1615', requestOptions)
    .then(function(response) {
      return response.json()
    }),

    fetch('https://v3.football.api-sports.io/fixtures/headtohead?h2h=1609-9568&league=253&season=2021', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1602-9568', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1604-9568', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1599-9568', requestOptions)
    .then(function(response) {
      return response.json()
    }),
    fetch('https://v3.football.api-sports.io/fixtures/headtohead?league=253&season=2021&h2h=1615-9568', requestOptions)
    .then(function(response) {
      return response.json()
    })
  ])
*/
  // TEST JSON FETCHES //

        fetch('fixture.json')
        .then(function(response) {
          return response.json()
        }),
        fetch('fixture-2.json').then(function(response) {
          return response.json()
        })
      ])

  .then(function(fixdataset) {
    concatData(fixdataset);
  })

  .catch((err) => {
    console.log(err);
  })



function concatData(fixdataset) {
  console.log(fixdataset.length);
  var combinedData = [];
  for (var i = 0; i < fixdataset.length; i++) {
    combinedData = combinedData.concat(fixdataset[i].response);
    console.log(combinedData);
  };
  combinedData.sort(function(a, b) {
    return new Date(b.fixture.date) - new Date(a.fixture.date)
  })
  const myJSON = JSON.stringify(combinedData);
  document.getElementById("fixdata1").innerHTML = myJSON;
  appendFixtureData(combinedData)
}

/*
function appendFixtureData(combinedData) {
  let mainContainer = document.getElementById("fixturedata");
  for (var i = 0; i < combinedData.length; i++) {
    let tr = document.createElement('tr');
    //    let tdaccount = document.createElement('td');
    let tddate = document.createElement('td');
    let tdmatchup = document.createElement('td');
    let tdvenue = document.createElement('td');
    let tdscore = document.createElement('td');

    fixturedate = combinedData[i].fixture.date;
    tddate.innerHTML = dateFormat(fixturedate);

    matchup = document.createElement('div');
    matchup.classList.add('box');

    homeTeam = document.createElement('img');
    homeTeam.src = combinedData[i].teams.home.logo;
    homeTeam.classList.add("teamlogos");
    homeTeam.setAttribute("alt", combinedData[i].teams.home.name)

    awayTeam = document.createElement('img');
    awayTeam.src = combinedData[i].teams.away.logo;
    awayTeam.setAttribute("alt", combinedData[i].teams.away.name)
    awayTeam.classList.add("teamlogos");

    v = document.createElement('span');
    v.innerText = 'v';
    v.classList.add("v");

    matchup.appendChild(homeTeam);
    matchup.appendChild(v);
    matchup.appendChild(awayTeam);

    tdmatchup.appendChild(matchup);

    venue = combinedData[i].fixture.venue.name;
    venuecity = combinedData[i].fixture.venue.city;

    tdvenue.innerHTML = venue + '<br />' + venuecity

    venue = combinedData[i].fixture.venue.name;
    venuecity = combinedData[i].fixture.venue.city;

    homeScore = combinedData[i].goals.home;
    awayScore = combinedData[i].goals.away;

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

function dateFormat(x) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var d = new Date(x);
  var curr_date = d.getDate() + 1;
  var curr_month = monthNames[d.getMonth()];
  var curr_year = d.getFullYear();
  var newDate = curr_month + ' ' + curr_date + ", " + curr_year;
  return newDate;
}
*/

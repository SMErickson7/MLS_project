fetch('combine.json')
  .then(response => response.json())
  .then(function(gameData) {
    addTeams();
    calculateGames(gameData);
    calculateWins(gameData);
    calculateLoss(gameData);
    calculateDraw(gameData);
    calculateGF(gameData);
    calculateGA(gameData);
    calculatePTS(gameData);
    appendStandingsTable();
  })
  .catch(function(err) {
    console.log('error: ' + err);
  });


const cupStandingData = [];

var teams = ["New York City FC", "DC United", "New York Red Bulls", "New England Revolution", "Philadelphia Union", "Inter Miami"];

function addTeams() {
  for (var i = 0; i < teams.length; i++) {
    var teamname = {
      "name": teams[i]
    };
    cupStandingData.push(teamname);
  }
}

function calculateGames(gameData) {
  for (var i = 0; i < teams.length; i++) {
    var games = 0;
    for (var x = 0; x < gameData.length; x++) {
      if (teams[i] == gameData[x].teams.home.name || teams[i] == gameData[x].teams.away.name) {
        if (gameData[x].teams.home.winner != null) {
          games = games + 1;
        }
      }
    }
    for (var y = 0; y < cupStandingData.length; y++) {
      if (teams[i] == cupStandingData[y].name) {
        cupStandingData[y].games = games;
      }
    }
  }
}

function calculateWins(gameData) {
  for (var i = 0; i < teams.length; i++) {
    var homeWins = 0;
    var awayWins = 0;
    var wins = 0;
    for (var x = 0; x < gameData.length; x++) {
      if (teams[i] == gameData[x].teams.home.name) {
        if (gameData[x].teams.home.winner == true) {
          homeWins = homeWins + 1;
        }
      } else if (teams[i] == gameData[x].teams.away.name) {
        if (gameData[x].teams.away.winner == true) {
          awayWins = awayWins + 1;
        }
      }
    }
    for (var y = 0; y < cupStandingData.length; y++) {
      if (teams[i] == cupStandingData[y].name) {
        cupStandingData[y].homeWins = homeWins;
        cupStandingData[y].awayWins = awayWins;
        cupStandingData[y].wins = homeWins + awayWins;
      }
    }
  }
}

function calculateLoss(gameData) {
  for (var i = 0; i < teams.length; i++) {
    var homeLoss = 0;
    var awayLoss = 0;
    var wins = 0;
    for (var x = 0; x < gameData.length; x++) {
      if (teams[i] == gameData[x].teams.home.name) {
        if (gameData[x].teams.home.winner == false) {
          homeLoss = homeLoss + 1;
        }
      } else if (teams[i] == gameData[x].teams.away.name) {
        if (gameData[x].teams.away.winner == false) {
          awayLoss = awayLoss + 1;
        }
      }
    }
    for (var y = 0; y < cupStandingData.length; y++) {
      if (teams[i] == cupStandingData[y].name) {
        cupStandingData[y].homeLoss = homeLoss;
        cupStandingData[y].awayLoss = awayLoss;
        cupStandingData[y].loss = homeLoss + awayLoss;
      }
    }
  }
}

function calculateDraw(gameData) {
  for (var i = 0; i < teams.length; i++) {
    var homeDraw = 0;
    var awayDraw = 0;
    for (var x = 0; x < gameData.length; x++) {
      if (teams[i] == gameData[x].teams.home.name) {

        if (gameData[x].fixture.status.short == "FT" && gameData[x].teams.home.winner == null) {
          homeDraw = homeDraw + 1;
        }
      } else if (teams[i] == gameData[x].teams.away.name) {
        if (gameData[x].fixture.status.short == "FT" && gameData[x].teams.away.winner == null) {
          awayDraw = awayDraw + 1;
        }
      }
    }
    for (var y = 0; y < cupStandingData.length; y++) {
      if (teams[i] == cupStandingData[y].name) {
        cupStandingData[y].homeDraw = homeDraw;
        cupStandingData[y].awayDraw = awayDraw;
        cupStandingData[y].draw = homeDraw + awayDraw;
      }
    }
  }
}

function calculateGF(gameData) {
  for (var i = 0; i < teams.length; i++) {
    var homeGF = 0;
    var awayGF = 0;
    for (var x = 0; x < gameData.length; x++) {
      if (teams[i] == gameData[x].teams.home.name && gameData[x].goals.home != null) {
        homeGF = homeGF + gameData[x].goals.home
      } else if (teams[i] == gameData[x].teams.away.name && gameData[x].goals.away != null) {
        awayGF = awayGF + gameData[x].goals.away
      }
    }
    for (var y = 0; y < cupStandingData.length; y++) {
      if (teams[i] == cupStandingData[y].name) {
        cupStandingData[y].homeGF = homeGF;
        cupStandingData[y].awayGF = awayGF;
        cupStandingData[y].GF = homeGF + awayGF;
      }
    }
  }
}

function calculateGA(gameData) {
  for (var i = 0; i < teams.length; i++) {
    var homeGA = 0;
    var awayGA = 0;
    for (var x = 0; x < gameData.length; x++) {
      if (teams[i] == gameData[x].teams.home.name && gameData[x].goals.home != null) {
        homeGA = homeGA + gameData[x].goals.away
      } else if (teams[i] == gameData[x].teams.away.name && gameData[x].goals.away != null) {
        awayGA = awayGA + gameData[x].goals.home
      }
    }
    for (var y = 0; y < cupStandingData.length; y++) {
      if (teams[i] == cupStandingData[y].name) {
        cupStandingData[y].homeGA = homeGA;
        cupStandingData[y].awayGA = awayGA;
        cupStandingData[y].GA = homeGA + awayGA;
      }
    }
  }
}

function calculatePTS(gameData) {
  for (var i = 0; i < cupStandingData.length; i++) {
    var ptsCalc = (cupStandingData[i].wins * 3) + (cupStandingData[i].draw);
    var ppgCalc = (ptsCalc / cupStandingData[i].games);
    ppgCalc = ppgCalc.toFixed(2);
    cupStandingData[i].pts = ptsCalc;
    cupStandingData[i].ppg = ppgCalc;
  }
  cupStandingData.sort(function(obj1, obj2) {
    return obj2.ppg - obj1.ppg;
    console.log("Sort comppleted");
  });
}

function appendStandingsTable() {
  let mainContainer = document.getElementById("standingsData");
  for (var i = 0; i < cupStandingData.length; i++) {

    let tr = document.createElement('tr');
    let team = document.createElement('td');
    let pl = document.createElement('td');
    let wins = document.createElement('td');
    let draws = document.createElement('td');
    let loss = document.createElement('td');
    let gf_ga = document.createElement('td');
    let gd = document.createElement('td');
    let pts = document.createElement('td');
    let ppg = document.createElement('td');
    let home = document.createElement('td');
    let away = document.createElement('td');


    team.innerHTML = cupStandingData[i].name;
    pl.innerHTML = cupStandingData[i].games;
    wins.innerHTML = cupStandingData[i].wins;
    draws.innerHTML = cupStandingData[i].draw;
    loss.innerHTML = cupStandingData[i].loss;
    gf_gaCalc = cupStandingData[i].GF + '/' + cupStandingData[i].GA;
    gf_ga.innerHTML = gf_gaCalc;
    gdCalc = cupStandingData[i].GF - cupStandingData[i].GA;

    if (gdCalc > 0) {
      gdCalcNew = "+" + gdCalc;
    } else {
      gdCalcNew = gdCalc.toString();
    }
    gd.innerHTML = gdCalcNew;
    pts.innerHTML = "<b>" + cupStandingData[i].pts + "</b>";
    ppg.innerHTML = "<b>" + cupStandingData[i].ppg + "</b>";
    home.innerHTML = cupStandingData[i].homeWins + '-' + cupStandingData[i].homeDraw + '-' + cupStandingData[i].homeLoss;
    away.innerHTML = cupStandingData[i].awayWins + '-' + cupStandingData[i].awayDraw + '-' + cupStandingData[i].awayLoss;

    tr.appendChild(team);
    tr.appendChild(pl);
    tr.appendChild(wins);
    tr.appendChild(draws);
    tr.appendChild(loss);
    tr.appendChild(gf_ga);
    tr.appendChild(gd);
    tr.appendChild(pts);
    tr.appendChild(ppg);
    tr.appendChild(home);
    tr.appendChild(away);

    mainContainer.appendChild(tr);
  }
}

const myJSON = JSON.stringify(cupStandingData);
document.getElementById("fixdata1").innerHTML = myJSON;
//console.log(cupStandingData);

//console.log("Final: ", cupStandingData);

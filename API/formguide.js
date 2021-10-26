fetch('combine.json')
  .then(response => response.json())
  .then(function(gameData) {
    addTeams();
    createFormGuide(gameData);
  })
  .catch(function(err) {
    console.log('error: ' + err);
  });

var fgTeams = ['New England Revolution', 'New York Red Bulls', 'New York City FC', 'Philadelphia Union', 'DC United', 'Inter Miami'];

function createFormGuide(gameData) {
  function comp(a, b) {
    return new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime();
  }
  gameData = gameData.sort(comp);
  let mainContainer = document.getElementById("formGuide");
  let team = document.createElement('div');
  let game = document.createElement('div');
  team.innerHTML = '<div class="fg-team" style="margin-bottom: 10px;"><strong>Team</strong></div>';
  for (var i = 0; i < 14; i++) {
    let game = document.createElement('div');
    game.classList.add('fg-cell','fg-match');
    round = i+1;
    game.innerHTML = '<div class="fg-content">'+ round +'</div>'
    team.appendChild(game);
  }
  mainContainer.appendChild(team);
  for (var i = 0; i < fgTeams.length; i++) {
    let team = document.createElement('div');
    team.classList.add('fg-row');
    team.innerHTML = '<div class="fg-team">'+ fgTeams[i] +'</div>'
    //console.log(team);
    for (var j = 0; j < gameData.length; j++) {
      let game = document.createElement('div');
      game.classList.add('fg-cell');
      if (fgTeams[i] == gameData[j].teams.home.name || fgTeams[i] == gameData[j].teams.away.name) {
        if (gameData[j].fixture.status.elapsed == null) {
          //console.log("grey -", fgTeams[i], fixturedate);
          game.classList.add('fg-match');
          gameDate = dateFormat(gameData[j].fixture.date);
          game.innerHTML = '<div role="img" class="fg-content gameInfo">&nbsp;<span class="gameInfoText">' + gameData[j].teams.home.name + ' vs ' + gameData[j].teams.away.name + ' <br /> ' + gameDate + '</span></div>';
          team.appendChild(game);
        } else if ((fgTeams[i] == gameData[j].teams.home.name && gameData[j].goals.home > gameData[j].goals.away) || (fgTeams[i] == gameData[j].teams.away.name && gameData[j].goals.away > gameData[j].goals.home)) {
          //console.log("green winner", fgTeams[i], fixturedate);
          game.classList.add('fg-win');
          gameDate = dateFormat(gameData[j].fixture.date);
          game.innerHTML = '<div role="img" class="fg-content gameInfo">W<span class="gameInfoText">' + gameData[j].teams.home.name + ' vs ' + gameData[j].teams.away.name + ' <br /> ' + gameDate + '</span></div>';
          team.appendChild(game);
        } else if ((fgTeams[i] == gameData[j].teams.home.name && gameData[j].goals.home < gameData[j].goals.away) || (fgTeams[i] == gameData[j].teams.away.name && gameData[j].goals.away < gameData[j].goals.home)) {
          //console.log("red loser", fgTeams[i], fixturedate);
          game.classList.add('fg-loss');
          gameDate = dateFormat(gameData[j].fixture.date);
          game.innerHTML = '<div role="img" class="fg-content gameInfo">L<span class="gameInfoText">' + gameData[j].teams.home.name + ' vs ' + gameData[j].teams.away.name + ' <br /> ' + gameDate + '</span></div>';
          team.appendChild(game);
        } else if ((fgTeams[i] == gameData[j].teams.home.name && gameData[j].goals.home == gameData[j].goals.away) || (fgTeams[i] == gameData[j].teams.away.name && gameData[j].goals.away == gameData[j].goals.home)) {
          //console.log("orange draw", fgTeams[i], fixturedate);
          game.classList.add('fg-draw');
          gameDate = dateFormat(gameData[j].fixture.date);
          game.innerHTML = '<div role="img" class="fg-content gameInfo">D<span class="gameInfoText">' + gameData[j].teams.home.name + ' vs ' + gameData[j].teams.away.name + ' <br /> ' + gameDate + '</span></div>';
          team.appendChild(game);
        }
        mainContainer.appendChild(team);
      }
    }
  }
}

function dateFormat(x) {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var d = new Date(x);
  var curr_date = d.getDate();
  var curr_month = monthNames[d.getMonth()];
  var curr_year = d.getFullYear();
  var newDate = curr_month + ' ' + curr_date + ", " + curr_year;
  return newDate;
}

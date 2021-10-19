from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

my_url = 'https://www.fotmob.com/leagues/130/matches/mls'

# opening up connect, grabbing the page
uClient = uReq(my_url)

 # adds content to variable
page_html = uClient.read()

# closes connection
uClient.close()

#html parsing
page_soup = soup(page_html, "html.parser")

#grabs each fixture
containers = page_soup.findAll("div", {"class":"css-1ty7xja-LeagueMatchCSS eilns270"})

#create file
filename = "fotmob_fixture.csv"
f = open(filename, "w")

#headers for CSV
headers = "link, home_team, away_team\n"

#write headers in new file
f.write(headers)


for container in containers:
    fixture = container.a["href"]
    team_container = container.findAll("span",{"class":"css-1i87lf9-TeamName"})
    home_team = team_container[0].text
    away_team = team_container[1].text

    f.write(fixture + "," + home_team + "," + away_team + "\n")

f.close()

function getUrlParam (name) {
    var url_string = window.location;
    var url = new URL(url_string);
    var c = url.searchParams.get(name);
    return c;
}

function generatePictures () {
  let htmlText = "";
  for (let i = 1; i < 10; i++) {
    htmlText = htmlText + '<img src="img/blank.png" id="pic' + i + '" class="game-picture" />';
  }
  $("#game-area").html(htmlText);
}

$( document ).ready(function() {

    if (getUrlParam("status")=="start-game") {

        // Start-Div ausblenden und Spiel-Div einblenden
        $("#game-screen").css('display', 'block');
        $("#start-screen").css('display', 'none');

        // Spieler-Namen aus der URL auslesen und einsetzen 
        $("#display-player1").html(getUrlParam("name-player-1") + '<br /><img src="img/cross.png" />');
        $("#display-player2").html(getUrlParam("name-player-2") + '<br /><img src="img/circle.png" />');

        //9 Bilder in Game-Area einfügen
        generatePictures();

      } else {

        // Start-Div eonblenden und Spiel-Div ausblenden
         $("#game-screen").css('display', 'none');
         $("#start-screen").css('display', 'flex'); 

      }
});
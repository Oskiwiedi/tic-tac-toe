imageStatus = [];

function getUrlParam (name) {
    var url_string = window.location;
    var url = new URL(url_string);
    var c = url.searchParams.get(name);
    return c;
}

function generatePictures () {
  let htmlText = "";
  for (let i = 1; i < 10; i++) {
    htmlText = htmlText + '<img src="img/blank.png" id="pic' + i + '" class="game-picture" onclick="checkImage('+ i +')" />';
    imageStatus[i] = "";
  } 
  $("#game-area").html(htmlText);
}

function checkImage(imageId) {
  if (imageStatus[imageId]=="") {
    imageStatus[imageId] = activePlayer;
    if ( activePlayer == 1 ) {
      $("#pic"+imageId).attr("src","img/cross.png");
      activePlayer = 2;
    } else {
      $("#pic"+imageId).attr("src","img/circle.png");
      activePlayer = 1;
    }
    checkWin();
    checkEnd();
    $("#game-message").html(getUrlParam("name-player-"+activePlayer)+" ist am Zug");
  }
}

function checkEnd() {
  if ( imageStatus[1] != "" &&
       imageStatus[2] != "" &&
       imageStatus[3] != "" &&
       imageStatus[4] != "" &&
       imageStatus[5] != "" &&
       imageStatus[6] != "" &&
       imageStatus[7] != "" &&
       imageStatus[8] != "" &&
       imageStatus[9] != ""
   ) {
      $("#game-message").html("Keine Züge mehr möglich");
      $("#link-right").html('<a href="index.html?name-player-1='+ getUrlParam("name-player-1") +'&name-player-2='+ getUrlParam("name-player-2") +'&status=start-game">neues Spiel starten</a> | <a href="index.html" target="_self">Spiel beenden</a>');
      exit();
   }
}

function checkWin() {
  if (imageStatus[1] != "") {
    if (imageStatus[1] == imageStatus[2] && imageStatus[2] == imageStatus[3] )
      checkOutWin();
    if (imageStatus[1] == imageStatus[4] && imageStatus[4] == imageStatus[7] )
      checkOutWin();
    if (imageStatus[1] == imageStatus[5] && imageStatus[5] == imageStatus[9] )
      checkOutWin();
  }
  if (imageStatus[5] != "") {
    if (imageStatus[5] == imageStatus[2] && imageStatus[5] == imageStatus[8] )
      checkOutWin();
    if (imageStatus[5] == imageStatus[4] && imageStatus[5] == imageStatus[6] )
      checkOutWin();
  }
  if (imageStatus[7] != "") {
    if (imageStatus[7] == imageStatus[5] && imageStatus[7] == imageStatus[3] )
      checkOutWin();
    if (imageStatus[7] == imageStatus[8] && imageStatus[7] == imageStatus[9] )
      checkOutWin();
  }
  if (imageStatus[3] != "") {
    if (imageStatus[3] == imageStatus[6] && imageStatus[3] == imageStatus[9] )
      checkOutWin();
  }
}

function checkOutWin() {
  if ( activePlayer == 1 )
    activePlayer = 2;
  else 
     activePlayer = 1;
  $("#game-message").html(getUrlParam("name-player-"+activePlayer)+' hat gewonnen!');
  $("#link-right").html('<a href="index.html?name-player-1='+ getUrlParam("name-player-1") +'&name-player-2='+ getUrlParam("name-player-2") +'&status=start-game">neues Spiel starten</a> | <a href="index.html" target="_self">Spiel beenden</a>');
  for (let i = 1; i < 10; i++)
    if (imageStatus[i] == "")
      imageStatus[i] = 3;
  exit();
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

        // Startspieler durch Zufall bestimmer 
        activePlayer = Math.floor(Math.random() * 2)+1;

        $("#game-message").html(getUrlParam("name-player-"+activePlayer)+" ist am Zug");

      } else {

        // Start-Div eonblenden und Spiel-Div ausblenden
         $("#game-screen").css('display', 'none');
         $("#start-screen").css('display', 'flex'); 

      }
});
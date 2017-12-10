$(document).ready(function() {
  var findGame = $('#find_game');
  var gameFindError = $('#game_find_error');
  var findGameColor = findGame.css('background-color');
  var findGameText = findGame.text();
  findGame.click(function(event) {
    event.preventDefault();
    findGame.prop('disabled', true);
    findGame.css('background-color', "gray");
    findGame.text("FINDING...");
    var result = {};
    $.ajax({
      type: 'post',
      url: "http://localhost:3100/api/game/",
      headers: {"Authorization": localStorage.getItem('5inaRow_token')},
      dataType: "json",
      contentType: "application/json",
      data: result
    })
    .done(function(data) {
      if(data.success == true) {
        window.localStorage.setItem('5inaRow_gameid', data.gameId);
        $('#find_game').prop('disabled', false);
        findGame.text(findGameText);
        findGame.css('background-color', findGameColor);
        window.location.href = 'game_area.html'; }
      else {
        $('#find_game').prop('disabled', false);
        findGame.text(findGameText);
        findGame.css('background-color', findGameColor);
        alert(data.msg); }
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        gameFindError.text("no connection...");
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 401) {
        message = ": " + code;
        window.location.href = 'index.html'; }
      else if (code == 403) {
        message = ": " + code;
        window.location.href = 'index.html'; }
      else if (code == 408) {
        gameFindError.text("We could not find a game for you at this time; please try again!");
        message = ": " + code; }
      else if (code == 489) {
        message = ": " + code;
        window.location.href = 'index.html'; }
      else if (code == 499) {
        message = ": " + code;
        window.location.href = 'index.html'; }
      else if (code == 502) {
        gameFindError.text("We could not find a game for you at this time; please try again!");
        message = ": " + code; }
      else {
        var message = code + ": uncaught error; " + jqXHR.responseText;
        alert(message); }
      findGame.prop('disabled', false);
      findGame.text(findGameText);
      findGame.css('background-color', findGameColor);
      // alert(message);
    })
  })
});

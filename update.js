$(document).ready(function poll() {
  setTimeout(function() {
    var gameid = localStorage.getItem('5inaRow_gameid');
    $.ajax({
      type: "get",
      url: "http://localhost:3100/api/game/poll/",
      headers: {"Authorization": localStorage.getItem('5inaRow_token')},
      dataType: "json",
      contentType: "application/json",
      complete: poll,
      timeout: 5000,
      data: {
        gameid: gameid,
      }
    })
    .done(function(data) {
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else {
        message = "uncaught error: " + jqXHR.responseText; }
      alert(message);
    })
  }, 500);
});

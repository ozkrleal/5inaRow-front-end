$(document).ready(function() {
  var leaderboard = $('#leaderboard');
  var leaderboardError = $('#leaderboard_error');
  leaderboardError.text("");
  var tableText =
    "<caption>LEADERBOARD</caption>" +
      "<tr>" +
        "<th>USERNAME</th>" +
        "<th>SCORE</th>" +
      "</tr>";
  leaderboard.html(tableText);
  $.ajax({
    type: "get",
    url: "http://localhost:3100/api/highScores/",
    headers: {"Authorization": localStorage.getItem('5inaRow_token')},
    dataType: "json",
    contentType: "application/json"
  })
  .done(function(data) {
    for(var i = 0; i < data.msg.length; i = i + 1) {
      var row =
        "<tr>" +
          "<td>" + data.msg[i].username + "</td>" +
          "<td>" + data.msg[i].score + "</td>" +
        "</tr>";
      leaderboard.append(row); }
  })
  .fail(function (jqXHR, statusText, error) {
    var code = jqXHR.status;
    if (code == 0) {
      message = "no connection"; }
    else if (code == 404) {
      message = "requested page not found: " + code; }
    else if (code == 401) {
      message = ": " + code; }
    else if (code == 403) {
      message = ": " + code; }
    else if (code == 489) {
      message = ": " + code; }
    else if (code == 499) {
      message = ": " + code; }
    else if (code == 502) {
      message = ": " + code; }
    else {
      message = code + ": uncaught error; " + message; }
    leaderboardError.text("There was a problem loading the leaderboard...");
    // alert(message);
  })
});

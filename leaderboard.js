$(document).ready(function() {
  $.ajax({
    type: "get",
    url: "http://localhost:3100/api/highScores/",
    headers: {"Authorization": localStorage.getItem('5inaRow_token')},
    dataType: "json",
    contentType: "application/json"
  })
  .done(function(data) {
    var response = JSON.parse(data);
    for(var i = 0; i < response.length; i = i + 1) {
      var row =
        "<tr>" +
          "<td>" + response[i].username + "</td>" +
          "<td>" + response[i].score + "</td>" +
        "</tr>";
      $('#leaderboard').append(row); }
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
      message = ": " + code;
      window.location.href = 'index.html'; }
    else if (code == 499) {
      message = ": " + code;
      window.location.href = 'index.html'; }
    else if (code == 502) {
      message = ": " + code; }
    else {
      message = "uncaught error: " + message; }
    alert(message);
  })
});

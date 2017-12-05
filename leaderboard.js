$(document).ready(function() {
  $.ajax({
    type: "get",
    url: "http://localhost:3100/api/highScores/",
    headers: {"Authorization": localStorage.getItem('5inaRow_token')},
    dataType: "json",
    contentType: "application/json"
  })
  .done(function(data) {
      $.each(data, function (i, item) {
          var row =
            "<tr>" +
              "<td>" + item[1] + "</td>" +
              "<td>" + item[0] + "</td>" +
            "</tr>";
          $('#leaderboard').append(row);
      });
  })
  .fail(function (jqXHR, statusText, error) {
    var code = jqXHR.status;
    if (code == 0) {
      message = "no connection"; }
    else if (code == 404) {
      message = "requested page not found: " + code; }
    else if (code == 489) {
      message = ": " + code;
      window.location.href = 'index.html'; }
    else if (code == 499) {
      message = ": " + code;
      window.location.href = 'index.html'; }
    else if (code == 502) {
      message = ": " + code; }
    else {
      message = "uncaught error: " + jqXHR.responseText; }
    alert(message);
  })
});

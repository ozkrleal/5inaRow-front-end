$(document).ready(function() {
  var form = $('#findGame');
  form.click(function(event) {
    event.preventDefault();
    var result = {};
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      headers: {"Authorization": localStorage.getItem('5inaRow_token')},
      dataType: "json",
      contentType: "application/json",
      data: result
    })
    .done(function(data) {
      if(data.success == true) {
        window.localStorage.setItem('5inaRow_gameid', data.gameId);
        window.location.href = 'game_area.html'; }
      else {
        alert(data.msg); }
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 403) {
        message = ": " + code; }
      else if (code == 408) {
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
        message = "uncaught error: " + jqXHR.responseText; }
      alert(message);
    })
  })
});

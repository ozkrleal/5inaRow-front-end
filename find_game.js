$(document).ready(function() {
  var form = $('#findGame');
  form.click(function(event) {
    event.preventDefault();
    var result = {};
    var handle201 = function(data, textStatus, jqXHR) {
     window.localStorage.setItem('5inaRow_gameid', data.gameid);
    };
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      headers: {"Authorization": localStorage.getItem('5inaRow_token')},
      dataType: "json",
      contentType: "application/json",
      data: result,
      statusCode: {
        201: handle201
      }
    })
    .done(function(data) {
      window.location.href = 'game_area.html';
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 403) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 408) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 498) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 499) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 502) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else {
        message = "uncaught error: " + jqXHR.responseText; }
      alert(message);
    })
  })
});

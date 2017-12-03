$(document).ready(function() {
  var canvas = $('#gameArea');
  var context = canvas[0].getContext('2d');
  const SIZE = 19;
  const SPACE = 3;
  const RADIUS = context.canvas.width / SIZE / 2 - SPACE;
  // drawing the board:
  for(var i = 1; i <= 18; i = i + 1)
  {
    context.moveTo(i * context.canvas.width / SIZE,
      0);
    context.lineTo(i * context.canvas.width / SIZE,
      context.canvas.height);
    context.stroke();
    context.moveTo(0,
      i * context.canvas.width / SIZE);
    context.lineTo(context.canvas.height,
      i * context.canvas.width / SIZE);
    context.stroke();
  }
  //
  canvas.click(function(event) {
    var x = Math.floor(event.offsetX * SIZE / context.canvas.width);
    var y = Math.floor(event.offsetY * SIZE / context.canvas.height);
    var gameid = localStorage.getItem('5inaRow_gameid');
    var username = localStorage.getItem('5inaRow_username');
    alert(x + ", " + y);
    $.ajax({
      type: "put",
      url: "http://localhost:3100/api/game/update/",
      headers: {"Authorization": localStorage.getItem('5inaRow_token')},
      dataType: "json",
      contentType: "application/json",
      data: {
        gameid: gameid,
        column: x,
        row: y
      }
    })
    .done(function(data) {
      // place piece:
      context.beginPath();
      context.arc(x * context.canvas.width / SIZE + context.canvas.height / SIZE / 2,
        y * context.canvas.height / SIZE + context.canvas.height / SIZE / 2,
        RADIUS,
        0,
        2 * Math.PI,
        false);
      context.fillStyle = "blue";
      context.fill();
      context.stroke();
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 403) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 489) {
        message = jqXHR.responseJSON.msg + ": " + code;
      window.location.href = 'index.html'; }
      else if (code == 499) {
        message = jqXHR.responseJSON.msg + ": " + code;
      window.location.href = 'index.html'; }
      else if (code == 502) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else {
        message = "uncaught error: " + jqXHR.responseText; }
      alert(message);
    })
  })
});

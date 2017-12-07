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
  var gameid = localStorage.getItem('5inaRow_gameid');
  // var username = localStorage.getItem('5inaRow_username');
  var objectUpdate = {};
  var timeout = setTimeout(function() {
    $.ajax({
      type: "get",
      url: "http://localhost:3100/api/game/poll/" + gameid,
      headers: {"Authorization": localStorage.getItem('5inaRow_token')},
      dataType: "json",
      contentType: "application/json",
      timeout: 5000
    })
    .done(function(data) {
      var code = data.code;
      switch(code) {
        case 4:
          logout();
          clearTimeout(timeout);
          break;
        case 7:
          window.location.href = 'game_draw.html';
          clearTimeout(timeout);
          break;
        case 8:
          window.location.href = 'game_lost.html';
          clearTimeout(timeout);
          break;
        case 9:
          // alert("It is not your turn; please wait for the other player to make a move!");
          break;
        case 10:
          if(data.column >= 0 && data.row >= 0) {
            // place piece:
            context.beginPath();
            context.arc(data.column * context.canvas.width / SIZE + context.canvas.height / SIZE / 2,
              data.row * context.canvas.height / SIZE + context.canvas.height / SIZE / 2,
              RADIUS,
              0,
              2 * Math.PI,
              false);
            context.fillStyle = "red";
            context.fill();
            context.stroke();
            //
          }
          alert("It is your turn; please make a move!");
          clearTimeout(timeout);
          break;
      }
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
  canvas.click(function(event) {
    var x = Math.floor(event.offsetX * SIZE / context.canvas.width);
    var y = Math.floor(event.offsetY * SIZE / context.canvas.height);
    // alert(x + ", " + y);
    objectUpdate["gameId"] = gameid;
    objectUpdate["column"] = x;
    objectUpdate["row"] = y;
    $.ajax({
      type: "put",
      url: "http://localhost:3100/api/game/update/",
      headers: {"Authorization": localStorage.getItem('5inaRow_token')},
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(objectUpdate)
    })
    .done(function(data) {
      var code = data.code;
      switch(code) {
        case 2:
          alert("There is already a piece there; please place a piece somewhere else!");
          break;
        case 7:
          window.location.href = 'game_draw.html';
          break;
        case 8:
          window.location.href = 'game_won.html';
          break;
        case 9:
          alert("It is not your turn! Please wait for the other player to make a move.");
          break;
        case 6:
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
          //
          alert("It is not your turn any more; please wait for the other player to make a move!");
          var timeout = setTimeout(function() {
            $.ajax({
              type: "get",
              url: "http://localhost:3100/api/game/poll/" + gameid,
              headers: {"Authorization": localStorage.getItem('5inaRow_token')},
              dataType: "json",
              contentType: "application/json",
              timeout: 5000
            })
            .done(function(data) {
              var code = data.code;
              switch(code) {
                case 4:
                  logout();
                  clearTimeout(timeout);
                  break;
                case 7:
                  window.location.href = 'game_draw.html';
                  clearTimeout(timeout);
                  break;
                case 8:
                  window.location.href = 'game_lost.html';
                  clearTimeout(timeout);
                  break;
                case 9:
                  // alert("It is not your turn; please wait for the other player to make a move!");
                  break;
                case 10:
                  if(data.column >= 0 && data.row >= 0) {
                    // place piece:
                    context.beginPath();
                    context.arc(data.column * context.canvas.width / SIZE + context.canvas.height / SIZE / 2,
                      data.row * context.canvas.height / SIZE + context.canvas.height / SIZE / 2,
                      RADIUS,
                      0,
                      2 * Math.PI,
                      false);
                    context.fillStyle = "red";
                    context.fill();
                    context.stroke();
                    //
                  }
                  alert("It is your turn; please make a move!");
                  clearTimeout(timeout);
                  break;
              }
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
          break;
      }
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
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
        message = "uncaught error: " + jqXHR.responseText; }
      alert(message);
    })
  })
});

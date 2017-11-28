$(document).ready(function() {
  var form = $('#findGame');
  form.click(function() {
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
      error: function (jqXHR, exception) {
        if (jqXHR.status == 0) {
          message = "no connection"; }
        else if (jqXHR.status == 404) {
          message = "requested page not found: 404"; }
        else if (jqXHR.status == 400) {
          message = jqXHR.responseText + ": " + jqXHR.status; }
        else if (jqXHR.status == 502) {
          message = jqXHR.responseText + ": " + jqXHR.status; }
        else {
          message = "uncaught error: " + jqXHR.responseText; }
        alert(message);
      }/*,
  	  onFailure: function () {
        alert("Ajax failure");
  	  },
  	  statusCode: {
        404: function() {
          alert("missing information");
        }
  	  }/*,
      success: function(response) {
        // alert(JSON.stringify(response));
      } */
    })
    .done(function(data) {
      window.location.href = 'game_area.html';
    })
  })
});

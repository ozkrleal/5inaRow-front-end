$(document).ready(function() {
  var form = $('#login');
  form.submit(function(event) {
    event.preventDefault();
    var result = {};
    $.each(form.serializeArray(), function() {
      result[this.name] = this.value;});
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(result), // JSON.stringify(form.serializeArray()), // form.serialize(),
      error: function (jqXHR, exception) {
        if (jqXHR.status == 0) {
            message = "no connection"; }
        else if (jqXHR.status == 404) {
            message = "requested page not found: 404"; }
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
      window.localStorage.setItem('5inaRow_token', data.token);
      window.location.href = 'find_game.html';
    })
  })
});

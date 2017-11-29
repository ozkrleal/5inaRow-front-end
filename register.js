$(document).ready(function() {
  var form = $('#registration');
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
      data: JSON.stringify(result) /*, // JSON.stringify(form.serializeArray()), // form.serialize(),
      error: function (jqXHR, statusText, error) {
        if (jqXHR.status == 0) {
          message = "no connection"; }
        else if (jqXHR.status == 404) {
          message = "requested page not found: 404"; }
        else if (jqXHR.status == 400) {
          message = jqXHR.responseText + ": " + jqXHR.status; }
        else if (jqXHR.status == 409) {
          message = jqXHR.responseText + ": " + jqXHR.status; }
        else if (jqXHR.status == 502) {
          message = jqXHR.responseText + ": " + jqXHR.status; }
        else {
          message = "uncaught error: " + jqXHR.responseText; }
        alert(message);
      } /*,
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
      alert("You have been successfully registered!")
      window.location.href = 'login.html';
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 400) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 409) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 502) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else {
        message = "uncaught error: " + jqXHR.responseText; }
      alert(message);
    })
  })
});

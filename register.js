$(document).ready(function() {
  var form = $('#registration');
  form.submit(function(event) {
    event.preventDefault();
    var result = {};
    $.each(form.serializeArray(), function() {
      result[this.name] = this.value;
    });
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(result)
    })
    .done(function(data) {
      alert("You have been successfully registered!")
      window.location.href = 'index.html';
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 400) {
        message = ": " + code; }
      else if (code == 409) {
        message = ": " + code; }
      else if (code == 502) {
        message = ": " + code; }
      else {
        message = "uncaught error: " + jqXHR.responseText; }
      alert(message);
    })
  })
});

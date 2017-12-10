$(document).ready(function() {
  var form = $('#registration');
  var submissionError = $('#submission_error');
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
      submissionError.text("");
      // alert("You have been successfully registered!")
      window.location.href = 'index.html';
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        submissionError.text("no connection...");
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 400) {
        submissionError.text("username already exists");
        message = ": " + code; }
      else if (code == 409) {
        submissionError.text("username already exists");
        message = ": " + code; }
      else if (code == 502) {
        message = ": " + code; }
      else {
        message = code + ": uncaught error; " + jqXHR.responseText; }
      // alert(message);
    })
  })
});

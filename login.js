$(document).ready(function() {
  var form = $('#login');
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
      window.localStorage.setItem('5inaRow_token', data.token);
      window.localStorage.setItem('5inaRow_username', form.find("input[name='username']").val());
      window.location.href = 'find_game.html';
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        submissionError.text("no connection...");
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 401) {
        submissionError.text("incorrect password");
        message = ": " + code; }
      else if (code == 403) {
        submissionError.text("username not found");
        message = ": " + code; }
      else if (code == 502) {
        submissionError.text("incorrect password");
        message = ": " + code; }
      else {
        message = code + ": uncaught error; " + jqXHR.responseText; }
      // alert(message);
    })
  })
});

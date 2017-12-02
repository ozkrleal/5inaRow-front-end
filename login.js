$(document).ready(function() {
  var form = $('#login');
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
      window.localStorage.setItem('5inaRow_token', data.token);
      window.localStorage.setItem('5inaRow_username', form.username.value);
      window.location.href = 'find_game.html';
    })
    .fail(function (jqXHR, statusText, error) {
      var code = jqXHR.status;
      if (code == 0) {
        message = "no connection"; }
      else if (code == 404) {
        message = "requested page not found: " + code; }
      else if (code == 401) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 403) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else if (code == 502) {
        message = jqXHR.responseJSON.msg + ": " + code; }
      else {
        message = "uncaught error: " + jqXHR.responseText; }
      alert(message);
    })
  })
});

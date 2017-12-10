$(document).ready(function() {
  $('#header').load('header_in.txt');
});
function logOut() {
  $.ajax({
    type: "get",
    url: "http://localhost:3100/api/user/logout/",
    headers: {"Authorization": localStorage.getItem('5inaRow_token')},
    contentType: "application/json"
  })
  .done(function(data) {
    window.localStorage.removeItem('5inaRow_token');
    window.localStorage.removeItem('5inaRow_username');
    window.location.href = 'index.html';
  })
  .fail(function (jqXHR, statusText, error) {
    var code = jqXHR.status;
    if (code == 0) {
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      message = "no connection";
      window.location.href = 'index.html';
    }
    else if (code == 404) {
      message = "requested page not found: " + code;
    }
    else if (code == 401) {
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      message = ": " + code;
      window.location.href = 'index.html' }
    else if (code == 403) {
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      message = ": " + code;
      window.location.href = 'index.html' }
    else if (code == 489) {
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      message = ": " + code;
      window.location.href = 'index.html'; }
    else if (code == 499) {
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      message = ": " + code;
      window.location.href = 'index.html'; }
    else if (code == 502) {
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      message = ": " + code;
      window.location.href = 'index.html'; }
    else {
      message = code + ": uncaught error; " + jqXHR.responseText; }
    // alert(message);
  })
}

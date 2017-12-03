$(document).ready(function() {
  $('#header').load('header_in.txt');
});
function logOut() {
  $.ajax({
    type: "get",
    url: "http://localhost:3100/api/user/logout/",
    headers: {"Authorization": localStorage.getItem('5inaRow_token')}
  })
  .done(function(data) {
    window.localStorage.removeItem('5inaRow_token');
    window.localStorage.removeItem('5inaRow_username');
    window.location.href = 'index.html';
  })
  .fail(function (jqXHR, statusText, error) {
    var code = jqXHR.status;
    if (code == 0) {
      message = "no connection";
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      window.location.href = 'index.html';
    }
    else if (code == 404) {
      message = "requested page not found: " + code; }
    else if (code == 489) {
      message = jqXHR.responseJSON.msg + ": " + code;
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      window.location.href = 'index.html'; }
    else if (code == 499) {
      message = jqXHR.responseJSON.msg + ": " + code;
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      window.location.href = 'index.html'; }
    else if (code == 502) {
      message = jqXHR.responseJSON.msg + ": " + code;
      window.localStorage.removeItem('5inaRow_token');
      window.localStorage.removeItem('5inaRow_username');
      window.location.href = 'index.html'; }
    else {
      message = "uncaught error: " + jqXHR.responseText; }
    alert(message);
  })
}

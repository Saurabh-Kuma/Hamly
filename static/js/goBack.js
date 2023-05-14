
function goBack() {
  var currentUrl = window.location.href;
  var parentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
  window.location.href = parentUrl;
}

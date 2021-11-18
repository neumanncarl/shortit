function sendUrl() {
  var data = {
    url: document.querySelector('input').value
  }
  fetch("/", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    if(response.ok) {
      return response.json();
    }
    throw new Error('Es ist ein Fehler aufgetreten.');
  }).then(function (response) {
    if (!response.success) {
      response.error = response.error || 'Es ist ein Fehler aufgetreten.';
      throw new Error(response.error);
    }
    return true;
  }).catch(function (err) {
    return false;
  })
}

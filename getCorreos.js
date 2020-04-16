var request = new XMLHttpRequest()

request.open('GET', 'http://programasacademicos.utp.edu.co/programa-academico/5', true)
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
      console.log(data);
    // data.forEach(movie => {
    //   console.log(movie.title)
    // })
  } else {
    console.log('error')
  }
}

request.send()
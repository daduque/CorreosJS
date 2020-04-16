export const getMails = async () => fetch('http://programasacademicos.utp.edu.co/programa-academico/5')
  .then(function(response) {
    return response.json();
  });
import { getMails } from './getCorreos.js';


const codeInput = document.getElementById("code");
// console.log(codeInput);


codeInput
    .addEventListener("change", (event) => {
        callData(codeInput.value);
        console.log(event);
    })

export const callData = (id) => {

    const serverResponse = document.getElementById("serverResponse");

    if(id != "")
    {
        
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://programasacademicos.utp.edu.co/programa-academico/${id}` , true)
        xhr.onload = function() {
        const data = JSON.parse(this.response);
        console.log(data[2][0].fichaTecnica);
        
        serverResponse.innerHTML = JSON.stringify(data[2][0].fichaTecnica);
        
    };
    
    
    
    xhr.send();
    }

else{
    serverResponse.innerHTML = "";
}
}


// var request = new XMLHttpRequest()

// request.open('GET', 'http://programasacademicos.utp.edu.co/programa-academico/5', true)
// request.onload = function() {
//   // Begin accessing JSON data here
//   var data = JSON.parse(this.response)

//   if (request.status >= 200 && request.status < 400) {
//       console.log(data);
//     // data.forEach(movie => {
//     //   console.log(movie.title)
//     // })
//   } else {
//     console.log('error')
//   }
// }

// request.send() 

// let fichaTecnica;

// const mails = async () => {
//     fichaTecnica = await getMails();
//     console.log(getMails);

//     console.log(fichaTecnica);

// };

// mails();
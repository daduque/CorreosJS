import { getMails } from './getCorreos.js';


const codeInput = document.getElementById("code");
// console.log(codeInput);


codeInput
    .addEventListener("change", (event) => {
        callData(codeInput.value);
        console.log(event);
    })

export const callData = (id) => {
    const el = document.getElementById('dataImport');
    el.innerHTML = "";

    const serverResponse = document.getElementById("serverResponse");

    if(id != "")
    {
        
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://programasacademicos.utp.edu.co/programa-academico/${id}` , true)
        xhr.onload = function() {
        const data = JSON.parse(this.response);
        // console.log(data[2][0].fichaTecnica);

        const formatedData = JSON.stringify(data[2][0].fichaTecnica)
        
        serverResponse.innerHTML = formatedData;
        
        const unformatedData = data[2][0].fichaTecnica;

        const entriesData = Object.entries(unformatedData);

        const mapedData = entriesData.map(function(d)
            {
                const label = document.createElement("label");
                label.innerHTML = d[0]
                label.htmlFor = 'text';
                document.getElementById('dataImport').appendChild(label);

                document.getElementById('dataImport').appendChild(document.createElement('br'));


                const input = document.createElement("input");
                input.value = d[1];
                input.type = 'text';
                input.autocomplete = 'off';
                document.getElementById('dataImport').appendChild(input);



                document.getElementById('dataImport').appendChild(document.createElement('br'));

                return d[0],d[1];
                
            })
        
        serverResponse.innerHTML = formatedData;

        
    };
    
    
    
    xhr.send();
    }

else{
    // serverResponse.innerHTML = "";
    // const labels = (document.getElementsByTagName("input"))
    // const labelsArray = [...labels];
    // labelsArray.map(function(d) {
    //     return d.value = "";
    // });


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
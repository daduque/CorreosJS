import { getMails } from './getCorreos.js';


const codeInput = document.getElementById("code");
// console.log(codeInput);


codeInput
    .addEventListener("change", (event) => {
        callData(codeInput.value);
    })

export const callData = (id) => {

    //Clean the body after delete de code to search
    const el = document.getElementById('dataImport');
    el.innerHTML = "";
    if(document.getElementById("successAlert"))
    {
        document.getElementById("successAlert").remove()
    }
    


    // const serverResponse = document.getElementById("serverResponse");

    if(id != "")
    {
        
        const xhr = new XMLHttpRequest();
        const sm = xhr.open("GET", `http://programasacademicos.utp.edu.co/programa-academico/${id}` , true);
        xhr.onload = function() {

            // console.log(this.status, this.readyState, this.getAllResponseHeaders());
          
        const data = JSON.parse(this.response);
        // console.log(data[2][0].fichaTecnica);
        
        //Print on a p tag the json response of the server get
        const formatedData = JSON.stringify(data[2][0].fichaTecnica)
        // serverResponse.innerHTML = formatedData;
        
        //Take the data without format to transform and mapped
        const unformatedData = data[2][0].fichaTecnica;
        const entriesData = Object.entries(unformatedData);
        const mappedData = entriesData.map(function(d)
            {
                //Select the area to import the mapped data
                const dataImportArea = document.getElementById('dataImport');

                //Create each label of the form with as name the key  attribute and append it to the body form
                const label = document.createElement("label");
                label.innerHTML = d[0]
                label.htmlFor = 'text';
                dataImportArea.appendChild(label);
                                
                
                //Create each input of the form with as value the value attribute and append it to the body form
                const input = document.createElement("input");
                input.value = d[1];
                input.type = 'text';
                input.autocomplete = 'off';
                input.setAttribute('class', 'rounded-sm form-control');
                dataImportArea.appendChild(input);

                
                return d[0],d[1];  
            });
        
        //Test printing a alert div when a user is found it
        const alertSuccess = document.createElement("div");
        const selectData = document.getElementById("sectionData")
        alertSuccess.setAttribute('class', 'alert alert-success alert-dismissible fade show');
        alertSuccess.setAttribute('role', 'alert');
        alertSuccess.setAttribute('id', 'successAlert');
        alertSuccess.innerHTML = 'Usuario Encontrado';
        selectData.insertBefore(alertSuccess, selectData.children[1]);
        
        // serverResponse.innerHTML = formatedData;

        
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
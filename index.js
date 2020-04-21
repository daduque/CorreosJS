const codeInput = document.getElementById("code");
const searchDataButton = document.getElementById("searchDataButton");
const cleanFormButton = document.getElementById("cleanFormButton");
const sendRegister = document.getElementById("sendRegister");
const dataForm = document.getElementById("dataForm");
// console.log(codeInput);

//This events are working on manage the form behavior
codeInput
    .addEventListener("keypress", (event) => {
        if (event.key == "Enter")
            searchData();

    })
searchDataButton
    .addEventListener("click", (event) => {
        searchData();

    })
cleanFormButton
    .addEventListener("click", (event) => {
        cleanForm();
        codeInput.focus();

    })
dataForm
    .addEventListener("submit", (event) => {
        event.preventDefault();
        //Here I have to call the function to make de POST request to a server
        persistData();
        console.log(event);
    })

//This function clean all the form
const cleanForm = () =>{
    //Clean the body after delete de code to search
    const el = document.getElementById('dataImport');
    const checkConditions = document.getElementById('acceptConditions');
    const alertMessage = document.getElementById("successAlert");
    el.innerHTML = "";
    checkConditions.checked = false;
    if(alertMessage)
    {
        alertMessage.remove()
    }
}

//condensed function to call data and validate the imput code is not null
const searchData = () =>{
    if(codeInput.value)
    {
        callData(codeInput.value);
        codeInput.focus();
        codeInput.classList.remove("is-invalid");
    }
    else{
        codeInput.classList.add("is-invalid");
        cleanForm();
    }
}
//on this function is going to pass the magic, call de put service to persist the data with the accept on the conditions
const persistData = () => {
    if(dataForm.code.checkValidity() && dataForm.acceptConditions.checkValidity())
    {
        const postData = new XMLHttpRequest();
        const object = {};
        const urlServer = '//hydra.utp.edu.co/formulario/web/app_dev.php/aceptar-contrato';
        const inputList = new FormData(document.forms.dataForm);
        inputList.forEach((value, key) => {object[key] = value});
        const json = JSON.stringify(object);

        // $.ajax({
        //     url: urlServer,
        //     type:"POST",
        //     dataType:"json",
        //     data: json,
        //     success: function( resp ) {
        //     console.log('heartbeat sent....');
        //     },
        //     error: function( req, status, err ) {
        //     console.log( 'Error: ', status, err );
        //     }
        //     });
                
        postData.open('POST', urlServer , true);
        // postData.setRequestHeader('Content-Type', "application/json; charset=UTF-8")
        postData.setRequestHeader('Content-Type', "application/x-www-form-urlencoded")
        postData.onload = function() {
            console.log( postData.status, postData.statusText, postData.responseText);

        };
        postData.send(json);
        // cleanForm();
        // codeInput.focus();
    }
 
}

//function to print an alert if the user exist or if not
const alerMessage = () =>{

    //Test printing a alert div when a user is found it
    const alertSuccess = document.createElement("div");
    const selectData = document.getElementById("sectionData")
    alertSuccess.setAttribute('class', 'alert alert-success alert-dismissible fade show');
    alertSuccess.setAttribute('role', 'alert');
    alertSuccess.setAttribute('id', 'successAlert');
    alertSuccess.innerHTML = 'Usuario Encontrado';
    selectData.insertBefore(alertSuccess, selectData.children[1]);
}

//this function call the get service from de server with the data
export const callData = (id) => {
    cleanForm();
    // const serverResponse = document.getElementById("serverResponse");

    if(id != "")
    {
        
        const xhr = new XMLHttpRequest();
        // xhr.open("GET", `https://programasacademicos.utp.edu.co/programa-academico/${id}` , true);
        xhr.open("GET", `//hydra.utp.edu.co/formulario/web/app_dev.php/estudiante/${id}` , true);
        xhr.onload = function() {

            // console.log(this.status, this.readyState, this.getAllResponseHeaders());
          
        const data = JSON.parse(this.response);
        console.log(data[0]);
        
        //Print on a p tag the json response of the server get
        const formatedData = JSON.stringify(data[0])
        // serverResponse.innerHTML = formatedData;
        
        //Take the data without format to transform and mapped
        const unformatedData = data[0];
        const entriesData = Object.entries(unformatedData);
        const mappedData = entriesData.map(function(d)
            {
                //Select the area to import the mapped data
                const dataImportArea = document.getElementById('dataImport');

                //Create each label of the form with as name the key  attribute and append it to the body form
                const label = document.createElement("label");
                label.innerHTML = d[0]
                label.htmlFor = d[0];
                dataImportArea.appendChild(label);
                                
                
                //Create each input of the form with as value the value attribute and append it to the body form
                const input = document.createElement("input");
                input.value = d[1];
                input.name = d[0];
                if(d[0]=="Acepto")
                    input.disabled = true;
                input.type = 'text';
                input.autocomplete = 'off';
                input.setAttribute('class', 'rounded-sm form-control form-control-sm');
                dataImportArea.appendChild(input);

                
                return d[0],d[1];  
            });
        
        //call function to print success when user found it
        // alerMessage();
        
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

// $(document).ready(function() {
//     setInterval(function()
//     {
//         if(hasBeenSubmitted === false)
//         {
//             $.ajax({
//             url:"hydra.utp.edu.co/derechos-de-peticion/web/app_dev.php/asignarAcceso/consultarAcceso",
//             type:"GET",
//             dataType:"json",
//             data:{
//             'idPQRDP': 262,
//             'usuario': 'jhdajaramillo'
//             },
//             success: function( resp ) {
//             console.log('heartbeat sent....');
//             },
//             error: function( req, status, err ) {
//             console.log( 'Error: ', status, err );
//             }
//             });
//         }
//         else{
//         hasBeenSubmitted = false;
//         };
//     },timeOut);
//     });


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
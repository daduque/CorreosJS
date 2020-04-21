const codeInput = document.getElementById("code");
const searchDataButton = document.getElementById("searchDataButton");
const cleanFormButton = document.getElementById("cleanFormButton");
const sendRegister = document.getElementById("sendRegister");
const dataForm = document.getElementById("dataForm");
const checkConditions = document.getElementById('acceptConditions');
const disableOnFalse = ["Acepto", "Numero Asignado", "Serial Equipo", "Serial Sim", "Validacion", "Cobertura", "Tipo Transporte", "Dias Transporte", "Tipo Dirección", "Nombre Completo"];

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
        persistData();
        // console.log(event);
    })

//This function clean all the form
const cleanForm = () =>{
    //Clean the body after delete de code to search
    const el = document.getElementById('dataImport');
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
    if(dataForm.code.checkValidity() && dataForm.acceptConditions.checked)
    {
        const postData = new XMLHttpRequest();
        const object = {};
        const urlServer = '//hydra.utp.edu.co/formulario/web/app_dev.php/aceptar-contrato';
        const inputList = new FormData(document.forms.dataForm);
        inputList.forEach((value, key) => {object[key] = value});
        const json = JSON.stringify(object);
                
        postData.open('POST', urlServer , true);
        // postData.setRequestHeader('Content-Type', "application/json; charset=UTF-8")
        // postData.setRequestHeader('Content-Type', "application/x-www-form-urlencoded")
        // postData.setRequestHeader('X-Requested-With', 'XMLHttpRequest');        
        postData.onload = function() {
            if(postData.status == 200){
                cleanForm();
                alerMessage();
                setTimeout(function(){
                    cleanForm()
                }, 3000);
                searchDataButton.focus();
            }
            console.log( postData.statusText, postData.responseText);

        };
        postData.send(json);
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
    alertSuccess.innerHTML = 'Usuario Actualizado';
    selectData.insertBefore(alertSuccess, selectData.children[1]);
}

//this function call the get service from de server with the data
const callData = (id) => {
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
        let isDisable = data[0]["Acepto"];
        console.log(isDisable);

        
        //Print on a p tag the json response of the server get
        const formatedData = JSON.stringify(data[0])
        // serverResponse.innerHTML = formatedData;
        
        //Take the data without format to transform and mapped
        const unformatedData = data[0];
        const entriesData = Object.entries(unformatedData);
        entriesData.map(function(d)
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
                input.type = 'text';
                if(isDisable) 
                    input.disabled = true;
                input.autocomplete = 'off';
                input.setAttribute('class', 'rounded-sm form-control form-control-sm');
                dataImportArea.appendChild(input);

                
                return d[0],d[1];  
            });
            //Check if isDable is true or not and take all the input fields on form and look for thoose in array disableOnFalse if match the field is disabled
            //also disable the checkbox
            const fields = document.getElementsByTagName("input");
            if(isDisable)
            {
                checkConditions.disabled = true
            }else{
                checkConditions.disabled = false
                disableOnFalse.map( key =>{
                    if(fields[key])
                        fields[key].disabled = true;
                })
            }
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
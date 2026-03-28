//five buttons for main functioning
let fillbutton=document.querySelector("#fill");
let getbutton=document.querySelector("#get");
let editbutton=document.querySelector("#set");
let deletebutton=document.querySelector("#delete");
let clearbutton=document.querySelector("#clr");

//first div with form details
let headeridtag=document.querySelector("#idtag");
let inputboxmodify=document.querySelector("#inputid");
let topnametag=document.querySelector("#nametag");
let selectentrydiv=document.querySelector("#entrydiv");
let showname=document.querySelector("#inputname");
let showmobile=document.querySelector("#inputmobile");
let showemail=document.querySelector("#inputemail");
let showmessage=document.querySelector("#inputmessage");
let submitbutton=document.querySelector("#smt");
let updatebutton=document.querySelector("#upd");

///result section
let showresult=document.querySelector("#resulttable");

//delete box for deleting data
let deleteinput=document.querySelector("#deleteindex");
let divdelete=document.querySelector("#deletebox");
let confirmdeletebutton=document.querySelector("#cfmdel");
let closedeletediv=document.querySelector("#closedeletebox");


//api calling functions--------------------------------------------------------------------

//add function

async function add() {
    let data={
        name:showname.value,
        mobile:showmobile.value,
        email:showemail.value,
        message:showmessage.value

    }
    submitbutton.innerHTML="wait..";
    let response=await fetch("https://end-to-end-form-filling-with-database-kne8.onrender.com/apicall/post",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data)

    });
    
    submitbutton.innerHTML="DONE";
    
    setTimeout(()=>{
        normalleft();
        submitbutton.innerHTML="SUBMIT";
    },2000)
    
}



////delete function

async function deleteapi(){
    confirmdeletebutton.innerHTML="wait..";
    let num=deleteinput.value;
    let deleteresponse=await fetch(`https://end-to-end-form-filling-with-database-kne8.onrender.com/apicall/delete/${num}`,{
        method:"DELETE"
    });
    confirmdeletebutton.innerHTML="DONE";
    setTimeout(()=>{confirmdeletebutton.innerHTML="CONFIRM DELETE"},3000);
}

///// update set function

async function updateindb(){
    let indextoupdate=inputboxmodify.value;
    let modifieddata={
        "name":showname.value,
        "mobile":showmobile.value,
        "email":showemail.value,
        "message":showmessage.value
    }
    updatebutton.innerHTML="wait..";
    let resultforupdate=await fetch(`https://end-to-end-form-filling-with-database-kne8.onrender.com/apicall/put/${indextoupdate}`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(modifieddata)
    });
    updatebutton.innerHTML="updated successfully";
    inputboxmodify.value="";
    showname.value="";
    showmobile.value="";
    showemail.value="";
    showmessage.value="";
    updatebutton.innerHTML="UPDATE DETAILS";
}

////get function
async function callit() {
    getbutton.innerHTML="wait..";
    let response=await fetch("https://end-to-end-form-filling-with-database-kne8.onrender.com/apicall/get");
    let give= await response.json();
    showresult.innerHTML = `
    <tr>
    <th>ID</th>
    <th>NAME</th>
    <th>MOBILE</th>
    <th>EMAIL</th>
    <th>MESSAGE</th>
    </tr>
    `;
    getbutton.innerHTML="GET";
    for(let i=0;i<give.length;i++){
        let newrow=document.createElement("tr");
        let dataone=document.createElement("td");
        let datatwo=document.createElement("td");
        let datathree=document.createElement("td");
        let datafour=document.createElement("td");
        let datafive=document.createElement("td");
        dataone.innerHTML=give[i].id;
        datatwo.innerHTML=give[i].name;
        datathree.innerHTML=give[i].mobile;
        datafour.innerHTML=give[i].email;
        datafive.innerHTML=give[i].message;
        newrow.appendChild(dataone);
        newrow.appendChild(datatwo);
        newrow.appendChild(datathree);
        newrow.appendChild(datafour);
        newrow.appendChild(datafive);
        showresult.appendChild(newrow);
    }
} 

//////normal function----------------------------------------------------------------

//to make form fill in normal position
function normalleft(){
    showname.value="";
    showmobile.value="";
    showemail.value="";
    showmessage.value="";
    updatebutton.style.visibility ="hidden";
    headeridtag.style.visibility="hidden";
    submitbutton.style.visibility="visible";
}

//////onclick modify this functions sets the page entry page to modify in db
function modify(){
    updatebutton.style.visibility ="visible";
    headeridtag.style.visibility="visible";
    submitbutton.style.visibility="hidden";
    return;
}

////for closing the deletebox
function closedeletebox(){
    divdelete.style.visibility="hidden";
}

////for making deletebox appear in page
function remove(){
    divdelete.style.visibility="visible";
    return;
}

///this functions bring back all the form to its normal postion for filling and clearing all results
function clearall(){
    normalleft();
    divdelete.style.visibility="hidden";
    showresult.innerHTML = `<tr>
    <th>ID</th>
    <th>NAME</th>
    <th>MOBILE</th>
    <th>EMAIL</th>
    <th>MESSAGE</th>
    </tr>`;
    return;
}



////adding of the event listeners
submitbutton.addEventListener("click",add);
getbutton.addEventListener("click",callit);
clearbutton.addEventListener("click",clearall);
editbutton.addEventListener("click",modify);
deletebutton.addEventListener("click",remove);
confirmdeletebutton.addEventListener("click",deleteapi);
closedeletediv.addEventListener("click",closedeletebox);
updatebutton.addEventListener("click",updateindb);
fillbutton.addEventListener("click",normalleft);


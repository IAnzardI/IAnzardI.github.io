// Muhammad Anwar/100759431
// INFT-2202-02 Web Development Client Side Script
// Sergio Santilli
// Durham College
// February 17, 2024

"use strict";

// IIFE = Immediately Invoked Functional Expression
(function (core){

    function CheckLogin(){
        if(sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fa fa-sign-out-alt"> Logout</i></a>`)

        }

        $("#logout").on("click", function (){
            sessionStorage.clear();
            location.href = "login.html";

        });
    }

    function LoadHeader(html_data) {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
        CheckLogin();
    }

    function AjaxRequest(method, url, callback) {
        // Step 1: Instantiate new XHR object
        let XHR = new XMLHttpRequest();

        // Step 2: Open XHR request
        XHR.open(method, url);

        // Step 4: Add even listener for the readystatechange event
            // The readystatechange event is triggered when the state of a document being fetched changes
        XHR.addEventListener("readystatechange", () => {
            if(XHR.readyState === 4  && XHR.status === 200) {
                if(typeof callback == "function"){
                    callback(XHR.responseText);
                }else {
                    console.error("ERROR: callback not a function");
                }
            }

        });
        // Step 3: Send XHR Request
        XHR.send();

    }

    function ContactFormValidation() {
        // fullName
        new ValidateField("#fullName", /^([A-Z][a-z]{1,3}\\.?\\s)?([A-Z][a-z]+)+([\\s,-]([A-z][a-z]+))*$/, "Please Enter a Valid Full Name");

        //contactNumber
        new ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please Enter a Valid Contact Number");

        //emailAddress
        new ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please Enter a Email Address");
    }

    /**
     * validate form field
     * @param {string} input_field_id
     * @param {RegExp} regular_expression
     * @param {string} error_message
     * @constructor
     **/

    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                // full name does not pass pattern matching
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                // full name is successful
                messageArea.removeAttr("class").hide();
            }
        });
    }

    /**
     *
     * @param {string} fullName
     * @param {int} contactNumber
     * @param {string} emailAddress
     * @constructor
     */
    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize()){
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

        $("#AboutUsBtn").on("click", function () {
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my first paragraph</p>`)

        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);
    }

    function DisplayProductPage(){
        console.log("Called DisplayProductPage()");
    }

    function DisplayAboutPage(){
        console.log("Called DisplayAboutPage()");
    }

    function DisplayServicePage(){
        console.log("Called DisplayServicePage()");
    }
    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);

            let index = 1;
            for(const key of keys) {
                let contact = new core.Contact();
                let contactData = localStorage.getItem(key);

                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                            <td>${contact.fullName}</td>
                            <td>${contact.contactNumber}</td>
                            <td>${contact.emailAddress}</td>
                            <td class="text-center">
                                <button value="${key}" class="btn btn-primary btn-sm edit">
                                    <i class="fas fa-edit fa-sm"> Edit</i>
                                </button>                            
                            </td>
                            <td>
                                <button value="${key}" class="btn btn-danger btn-sm delete">
                                    <i class="fas fa-edit fa-sm"> Delete</i>
                                </button> 
                            </td>
                          </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }

        $("#addButton").on("click", function () {
           location.href = `edit.html#add`;
        });


        $("button.delete").on("click", function() {
           if(confirm("Please confirm contact deletion?")){
               localStorage.removeItem($(this).val())
           }
           location.href = "contact-list.html";
        });


        $("button.edit").on("click", function () {
            location.href = "edit.html#add" + $(this).val();
        });


    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()....");

        ContactFormValidation();

        let page = location.hash.substring(1);

        switch(page){
            case "add":

                $("main>h1").text("Add Contact");
                $("#addButton").html(`<i class="fas fa-plus-circle fa-sm" /> Add`);

                $("#editButton").on("click",  function () {
                    new AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });

                $("#cancelButton").on("click", function ()  {
                    location.href = "contact-list.html";
                });

                break;
            default: {

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page))

                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);


                $(`#editButton`).on("click",  function () {
                    event.preventDefault();
                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());
                    location.href = "contact-list.html";

                });

                $(`#cancelButton`).on("click",  function () {
                    location.href = "contact-list.html";
                });
            }
                break;
        }
    }
    function DisplayContactPage(){
        console.log("Called DisplayContactPage()");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton");
        let subscribeButton = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function (){
            if(subscribeButton.checked){
                let contact = new Contact(fullname.value, contactNumber.value, emailAddress.value);
                if(contact.serialize()){
                    let key = contact.fullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function (){

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function (data){

                for(const user of data.users){
                    // Our request successful
                    console.log(data.user);
                    if(username.value === user.Username && password.value === user.Password){

                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if(success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "contact-list.html";
                } else{
                    $("#user").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("ERROR: Invalid Credentials").show();
                }

                $("#cancelButton").on("click",function (){
                   document.forms[0].reset();
                   location.href = "index.html";
                });
            });
        });




    }

    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage()");
    }

    function Start(){
        console.log("App Started");

        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title){
            case "INFT 2202 - 13964":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductPage();
                break;
            case "Service":
                DisplayServicePage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit List":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }
    }

    window.addEventListener("load", Start);

})(core || (core ={}));

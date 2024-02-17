"use strict";

(function (core) {

    class Contact {
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.FullName = fullName;
            this.ContactNumber = contactNumber;
            this.EmailAddress = emailAddress;
        }

        get fullName() {
            return this.FullName;
        }

        set fullName(value) {
            this.FullName = value;
        }

        get contactNumber() {
            return this.ContactNumber;
        }

        set contactNumber(value) {
            this.ContactNumber = value;
        }

        get emailAddress() {
            return this.EmailAddress;
        }

        set emailAddress(value) {
            this.EmailAddress = value;
        }

        toString() {
            return `fullName ${this.fullName}\n,
            contactNumber ${this.contactNumber}\n, EmailAddress ${this.emailAddress}`;
        }


        /**
         serialize for writing to localStorage
         **/
        serialize() {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.fullName}, ${this.contactNumber}, ${this.emailAddress}`;
            }
            console.error("One or more of the contact properties are missing or invalid");
            return null;
        }

        /**
         Deserialized means to read data from localStorage
         **/
        deserialize(data) {
            let propertyArray = data.split(" , ");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;

})(core || (core ={}));
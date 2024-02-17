"use strict";

(function (core) {

    class Contact {
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.fullName = fullName;
            this.contactNumber = contactNumber;
            this.emailAddress = emailAddress;
        }

        get fullName() {
            return this._fullName;
        }

        set fullName(value) {
            this._fullName = value;
        }

        get contactNumber() {
            return this._contactNumber;
        }

        set contactNumber(value) {
            this._contactNumber = value;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        toString() {
            return `fullName ${this._fullName}\n
            contactNumber ${this._contactNumber}\n EmailAddress ${this._emailAddress}`;
        }


        /**
         serialize for writing to localStorage
         **/
        serialize() {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the contact properties are missing or invalid");
            return null;
        }

        /**
         Deserialized means to read data from localStorage
         **/
        deserialize(data) {
            // Bruce Wayne, 555-5555, Bruce@Batman.com
            let propertyArray = data.split(".");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;

})(core || (core ={}));
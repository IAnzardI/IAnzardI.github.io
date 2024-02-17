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
            if (this.fullName !== "" && this.contactNumber !== "" && this.emailAddress !== "") {
                return `${this._fullName}.${this._contactNumber}.${this._emailAddress}`;
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
            this.fullName = propertyArray[0];
            this.contactNumber = propertyArray[1];
            this.emailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;

})(core || (core ={}));
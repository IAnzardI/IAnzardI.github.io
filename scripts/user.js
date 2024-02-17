"use strict";

(function (core) {

     class User {
         constructor(displayName = "", emailAddress = "", username = "", password = "") {
             this.DisplayName = displayName;
             this.EmailAddress = emailAddress;
             this.Username = username;
             this.Password = password;

         }
         get password() {
             return this._password;
         }

         set password(value) {
             this._password = value;
         }
         get username() {
             return this.Username;
         }

         set username(value) {
             this.Username = value;
         }
         get emailAddress() {
             return this.EmailAddress;
         }

         set emailAddress(value) {
             this.EmailAddress = value;
         }
         get displayName() {
             return this.DisplayName;
         }

         set displayName(value) {
             this.DisplayName = value;
         }


         toString(){
             return `Display Name: ${this.DisplayName}\nEmail Address: ${this.EmailAddress}\nUsername: ${this.Username}`;
         }

         toJSON() {
             return {
                 "DisplayName" : this.DisplayName,
                 "EmailAddress" : this.EmailAddress,
                 "Username" : this.Username,
                 "Password" : this.Password
             }
         }

         fromJSON(data){
             this.DisplayName = data.DisplayName;
             this.EmailAddress = data.EmailAddress;
             this.Username = data.Username;
             this.Password = data.Password;
         }


         serialize(){
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "'"){
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}`;
            }
            console.error("Failed to serialize, one or more user attributes were missing");
             return null;
         }

         deserialize(data){
            let propertyArray = data.split(".");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
         }

         } // end of user class
      core.User = User;
})(core || (core = {}) );
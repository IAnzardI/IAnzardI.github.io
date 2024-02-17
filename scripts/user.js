"use strict";

(function (core) {

     class User {
         get password() {
             return this._password;
         }

         set password(value) {
             this._password = value;
         }
         get username() {
             return this._username;
         }

         set username(value) {
             this._username = value;
         }
         get emailAddress() {
             return this._emailAddress;
         }

         set emailAddress(value) {
             this._emailAddress = value;
         }
         get displayName() {
             return this._displayName;
         }

         set displayName(value) {
             this._displayName = value;
         }
         constructor(displayName = "", emailAddress = "", username = "", password = "") {
             this._displayName = displayName;
             this._emailAddress = emailAddress;
             this.username = username;
             this.password = password;

         }


         toString(){
             return `Display Name: ${this._displayName}\nEmail Address: ${this._emailAddress}\nUsername: ${this.username}`;
         }

         toJSON() {
             return {
                 DisplayName : this._displayName,
                 EmailAddress : this._emailAddress,
                 Username : this._username,
                 Password : this._password
             }
         }

         fromJSON(data){
         this._displayName = data.DisplayName;
         this._emailAddress = data.EmailAddress;
         this._username = data.Username;
         this._password = data.password;
         }


         serialize(){
            if(this._displayName !== "" && this._emailAddress !== "" && this._username !== "'"){
                return `${this._displayName}, ${this._emailAddress}, ${this._username}`;
            }
            console.error("Failed to serialize, one or more user attributes were missing");
             return null;
         }

         deserialize(data){
            let propertyArray = data.split(".");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
         }

         } // end of user class
      core.User = User;
})(core || (core = {}) );
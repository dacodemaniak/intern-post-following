export class StagiaireModel {

    private _id: number = 0;
    private _lastname: string = '';
    private _firstname: string = '';
    private _gender: string = ''; 
    private _birthdate?: Date | undefined = undefined;
    private _phoneNumber: string = '';
    private _email: string = ''; 

    get id() {
      return this._id
    }
    
    set id(val: number) {
      this._id = val
    }
    
    get lastname() {
      return this._lastname
    }
    
    set lastname(val: string) {
      this._lastname = val
    }
    
    get firstname() {
      return this._firstname
    }
    
    set firstname(val: string) {
      this._firstname = val
    }
    
    get gender() {
      return this._gender
    }
    
    set gender(val: string) {
      this._gender = val
    }
    
    get birthdate(): Date | undefined {
      return this._birthdate
    }
    
    set birthdate(val: Date | undefined) {
      this._birthdate = val
    }
    
    get phoneNumber() {
      return this._phoneNumber
    }
    
    set phoneNumber(val: string) {
      this._phoneNumber = val
    }
    
    get email() {
      return this._email
    }
    
    set email(val: string) {
      this._email = val
    }

}

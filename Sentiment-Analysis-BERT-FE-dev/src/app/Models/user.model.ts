export class User{
    private id:string = "";
    private fist_name:string = "";
    private last_name:string = "";
    private email:string = "";
    private token:string = "";
    setvalues(id:string, first_name:string, last_name:string, email:string, token:string){
        this.id = id;
        this.fist_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.token = token;
    }
    constructor(){

    }
    getToken(){
        return this.token;
    }
    getFullName():string{
        return this.fist_name +" "+this.last_name
    }
    getdetails(){
        return {
            "first_name" : this.fist_name,
            "last_name" : this.last_name,
            "email" : this.email
        };
    }
}
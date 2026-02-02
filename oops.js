// const user   = {
//     fname:"alex",
//     email:"abc@gmail.com"
// }


// // class 

// class User {
//     constructor(fname , email){
//          this.fname = fname;
//          this.email = email;
//     }

// }

// class Team  extends User {
//     constructor(role , fname , email){
//         super(fname, email)
//         this.role = role;
//     }
// }
// const userone = new User("JOhn" , "john@gmail.com");
// const team1 =  new Team("web" ,  "aly" , "admin@gmail.com");
// console.log(team1)
// console.log(team1)
// console.log(userone);



class Bank  {
    constructor(bankName , address , branchcode){
        this.bankName = bankName ;
        this.address = address;
        this.branchcode = branchcode;
    }
}


class User extends Bank{
    constructor(userName , email , balance , accType ,  bankName , address , branchcode){
        super(bankName , address , branchcode)
        this.userName = userName
        this.email = email;
        this.balance = balance;
        this.accType = accType;
    }
}


const accout1 =  new User("JOhn",  "john@gmail.com" ,  10000000 , "saving" , "Al Habib" , "Zulfiqarabad" , 1001);
console.log(accout1)








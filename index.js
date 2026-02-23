// // /products?price[gt]=32&brand=apple&rating[gte]=4.5
// const queryStr = {price:32 , brand:"apple" , rating:4.5};   //this.queryStr = req.query
// const newObj= {};

// for(let key in queryStr){
//     // newObj[key] = queryStr[key]
//     console.log(queryStr[key])
// }

const value  =  "price[gt:32]"
console.log(value.split('['))
// /users/:id
//  /users?search=1223&&filter=active&&s
// query  = User.find()
//querystr =  req.query() => obj{search:1223 , filter:active} }
// 
//products?price[lt]=10
// [{},{},{}];
// Products.find({price:{$lte:32}})

class ApiFeatures {
    constructor(query, queryStr, allowedFields = []) {
        this.query = query;
        this.queryStr = queryStr;
        this.allowedFields = allowedFields;
    }
 //  let a= abc  => split(a , "b") => ["a" , "c"]
    //  filtering 
    filter() {
        const queryObj = {};
        for (let key in this.queryStr) {
            // Extract base field name (e.g., "price" from "price[lt]")
            const baseField = key.split('[')[0];  //["price" ,"lt]"]
            console.log(baseField , "BBBBBBBBBBBBBBBB")  
            if (this.allowedFields.includes(baseField)) {
                // Extract operator if present (e.g., "lt" from "price[lt]")
                const operatorMatch = key.match(/\[(gt|gte|lt|lte)\]/); // this line return [ '[lt]', 'lt', index: 5, input: 'price[lt]', groups: undefined ] OOOOOOOOOOOOOOO
                console.log(operatorMatch , "OOOOOOOOOOOOOOO")
                if (operatorMatch) {
                    // Has operator: price[lt]=10 -> price: {$lt: "10"}
                    const operator = `$${operatorMatch[1]}`;  // lt -> $lt
                    if (!queryObj[baseField]) {
                        queryObj[baseField] = {};
                    }
                    queryObj[baseField][operator] = Number(this.queryStr[key]); //{price:{$lt:10}} 
                } else {
                    // No operator: category=Sports
                    queryObj[baseField] = this.queryStr[key]; //products?{categorie:sports}
                    
                }
            }
        }
        
        console.log(queryObj , "PPPPPPP")



        console.log(queryObj) //{price:{$lt:10}}
        this.query = this.query.find(queryObj)
        return this;
    }


//   sorting  
    //    ?sort=price,-category,-rating
    // products.find().sort("price -category rating")
    sort(){
        const allowSoretedFields = ['price', 'category', 'rating'];
        if(this.queryStr.sort){
            const sortFileds = this.queryStr.sort.split(',') // ["price","-category","-rating"]
            const safeFields = sortFileds.filter(field =>  allowSoretedFields.includes(field.replace("-" , "")) );
            const sortedQuery = safeFields.join(" ");
            this.query = this.query.sort(sortedQuery);
            
        }


        return this;
    }


    // s
     search(){
        // regex
        //  adidas , 
        // /products?search=ad&&field=title/////////////////////
        if(this.queryStr.search){
            const searchField = this.queryStr.field ; 
            const searchValue = this.queryStr.search;

              if(!searchField || !searchField==="all"){
                this.query = this.query.find({$text:{$search:searchValue}});
              }else{

                this.query = this.query.find({[searchField]:{$regex:searchValue,$options:"i"}});
              }
        }

        return this

     }

   



    //  /products
    //pagination 
    paginate(defaultLimit = 100) {
        const page = parseInt(this.queryStr.page) || 1;
        const limit = parseInt(this.queryStr.limit) || defaultLimit;
        const skip = ([page - 1]) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;  //{}
    }
}


export { ApiFeatures };
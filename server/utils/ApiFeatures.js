// /users/:id
//  /users?search=1223&&filter=active&&s
// query  = User.find()
//querystr =  req.query() => obj{search:1223 , filter:active} }

// [{},{},{}];
// Products.find({price:{$lte:32}})

class ApiFeatures {
    constructor(query, queryStr, allowedFields = []) {
        this.query = query;
        this.queryStr = queryStr;
        this.allowedFields = allowedFields;
    }

    //  filtering 
    filter() {
        const queryObj = {};
        for (let key in this.queryStr) {
            // Extract base field name (e.g., "price" from "price[lt]")
            const baseField = key.split('[')[0];  //["price" ,"[lt]"]
            console.log(baseField , "BBBBBBBBBBBBBBBB")  
            if (this.allowedFields.includes(baseField)) {
                // Extract operator if present (e.g., "lt" from "price[lt]")
                const operatorMatch = key.match(/\[(gt|gte|lt|lte)\]/);
                
                if (operatorMatch) {
                    // Has operator: price[lt]=10 -> price: {$lt: "10"}
                    const operator = `$${operatorMatch[1]}`;
                    if (!queryObj[baseField]) {
                        queryObj[baseField] = {};
                    }
                    queryObj[baseField][operator] = Number(this.queryStr[key]);
                } else {
                    // No operator: category=Sports
                    queryObj[baseField] = this.queryStr[key];
                }
            }
        }
        
        console.log(queryObj , "PPPPPPP")



        console.log(queryObj) //{price:{$lt:10}}
        this.query = this.query.find(queryObj)
        return this;
    }

    //  /products
    //pagination 
    paginate(defaultLimit = 100) {
        const page = parseInt(this.queryStr.page) || 1;
        const limit = parseInt(this.queryStr.limit) || defaultLimit;
        const skip = ([page - 1]) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}


export { ApiFeatures };
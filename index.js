const fields = ["-price" , "category" , "-rating"];
const allowFields = ["price" , "category" , "rating"];

const safeFields = fields.filter((field)=>{
    return allowFields.includes(field.replace("-" , ""))   // -price   => "price"  =>["price" , "category" , "rating"] = truue
})

// ["-price" , "category" , "-rating"].join(" ") => String "-price category -rating"   
// join

console.log(safeFields.join(" "));


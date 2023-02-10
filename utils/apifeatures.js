class ApiFeatures{
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }

search() {
    const keyword = this.querystr.keyword?{
        name:{
            $regex:this.querystr.keyword,
            $options:"i"
        }
    }:{};
    
    this.query = this.query.find({...keyword})
    return this;
}
filter(){
    const querycopy ={...this.querystr}
    
    // Removing Fields
const removefileds =["keyword","page","limits"]
removefileds.forEach((key)=> delete querycopy[key])
// Filter price

let querystr =JSON.stringify(querycopy)
querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
this.query = this.query.find(JSON.parse(querystr))
console.log(querystr);
return this;
}
pagination(resultperpage){
const showpage = Number(this.querystr.page)||1;
const skip = resultperpage*(showpage-1);
this.query =this.query.limit(resultperpage).skip(skip)
return this;
}
}
module.exports=ApiFeatures

class APIFilters {
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    }

    search(){
        const keyword = this.queryString.keyword ? {
            name:{
                $regex: this.queryString.keyword,
                $options: "i"
            }
        } 
        : {}

        this.query = this.query.find({...keyword})
        return this
    }

    filters() {
        const queryCopy = { ...this.queryString };
    
        // Fields to remove
        const fieldsToRemove = ["keyword"];
        fieldsToRemove.forEach((el) => delete queryCopy[el]);
    
        // Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
      }
}

export default APIFilters
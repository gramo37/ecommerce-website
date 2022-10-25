class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Searches for product by the keyword entered
    search() {
        const keyword = this.queryStr.keyword ? {      // If this.queryStr.keyword exists then keyword = { name:{ $regex: this.queryStr.keyword, $options: "i" } }
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};
        
        this.query = this.query.find({ ...keyword })    // Why find() is repeated ?  find() method can be repeated if needed

        return this;
    }

    searchCollection() {
        const keyword = this.queryStr.collectionName ? {      // If this.queryStr.keyword exists then keyword = { name:{ $regex: this.queryStr.keyword, $options: "i" } }
            collectionName: {
                $regex: this.queryStr.collectionName,
                $options: "i"
            }
        } : {};
        
        this.query = this.query.find({ ...keyword })    // Why find() is repeated ?  find() method can be repeated if needed
        return this;
    }

    // This function removes queries like "keyword", "limit" and "page" from queryStr and finds using the rest of the queryStr
    filter() {                                         
        const queryCopy = {...this.queryStr}
        console.log(queryCopy)
        // Removing some fields for category
        const removeFields = ["keyword", "limit", "page"]    
        removeFields.forEach(key=>delete queryCopy[key])   // Key will take these values ("keyword", "limit", "page") one by one and coressponding objects will be deleted
        // Filter for price and rating
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)   // Replace all gt, lt, lte, gte from above variable (queryStr), so that we can use it in find() method of mongodb
        // this.query = this.query.find(queryStr)
        console.log(queryStr)
        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }

    pagination() {
        const currentPage = Number(this.queryStr.page) || 1;
        const resultPerPage = Number(this.queryStr.productsPerPage) || 4;
        const skip = resultPerPage * (currentPage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip);  // Show "resultPerPage" number of products on 1 page and skip to the next products according to the page number
        return this;
    }

}

module.exports = ApiFeatures
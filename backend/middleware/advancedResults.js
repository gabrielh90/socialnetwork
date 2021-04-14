
const asyncHandler = require('./async');

const advancedResults = (model, populate, localQuery) => async (req, res, next) => {
    let query;

    // Copy req.query
    const reqQuery = {...req.query};
      // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Finding resource
    query = model.find();

    // Select fields
    if(reqQuery.select) {
        const fields = reqQuery.select.split(',').join(' ');
        query = query.select(fields);
    }
    if(localQuery.select) {
        const select = localQuery.select;
        const fields = select.split(',').join(' ');
        query = query.select(fields);
    }

    //Pagination
    const page = parseInt(reqQuery.page, 10) || 1;
    const limit = parseInt(reqQuery.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    if(populate) {
        query = query.populate(populate);
    }

    // Execute query
    const results = await query;

    // Pagination results
    const pagination = {};

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.advancedResults = {
        success: true,
        pagination,
        data: results
    }

    next();
}
const formatResult = () => asyncHandler(async (req, res, next) => {
    
    //Pagination
    const page = parseInt(reqQuery.page, 10) || 1;
    const limit = parseInt(reqQuery.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    const query = req.query.skip(startIndex).limit(limit);
    
    // Execute query
    const results = await query;

    // Pagination results
    const pagination = {};

    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        };
    }

    res.advancedResults = {
        success: true,
        pagination,
        data: results
    }
})
module.exports = {advancedResults, formatResult};
function validateQuery(req, ...queryParams) {
    const query = req.query;
    for (const param of queryParams) {
        if (!query[param]) {
            return false;
        }
    }
    return true;
}


module.exports = validateQuery;
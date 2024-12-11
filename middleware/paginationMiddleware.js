const paginationMiddleware = () => {
    return async (req, res, next) => {
        req.pagination = {
            limit: parseInt(req.query.limit) || 10,
            cursor: req.query.cursor || null,
            sort: req.query.sort || 'createdAt',
            order: req.query.order?.toLowerCase() === 'asc' ? 1 : -1,
            filter: req.query.filter || null
        };

        
        res.paginate = (documents, total = null) => {
            const hasMore = documents.length > req.pagination.limit;
            const results = hasMore ? documents.slice(0, -1) : documents;
            
            return {
                data: results,
                pagination: {
                    nextCursor: hasMore ? results[results.length - 1]._id : null,
                    hasMore,
                    total,
                    limit: req.pagination.limit,
                    sort: req.pagination.sort,
                    order: req.pagination.order === 1 ? 'asc' : 'desc'
                }
            };
        };

        next();
    };
};

module.exports = paginationMiddleware;
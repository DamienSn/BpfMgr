/**
 * Pagination
 */
class Pagination {

    /**
     * Pagination
     * @param {number} limit Limite
     */
    constructor (limit) {
        this.limit = limit;
        this.offset =limit;
    }

    /**
     * Page -> Go to page
     * @param {number} page Page to go
     * @returns Offset for SQL query
     */
    page (page) {
        return this.offset * (page - 1);
    }

}

module.exports = Pagination;
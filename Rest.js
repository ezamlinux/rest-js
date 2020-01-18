export default class Rest {
    /**
     *
     * @param {Object} options
     */
    constructor (options) {
        this.endpoint = options.url;
    }

    /**
     *
     * @param {Object} headers
     */
    header (headers) {
        headers = headers || {};
        return Object.assign(headers, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text-plain, */*',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
    }

    /**
     *
     * @param {Integer} id
     */
    url (id) {
        if (id) {
            return this.endpoint + '/' + parseInt(id);
        }

        return this.endpoint;
    }

    /**
     *
     * @param {Object} options
     */
    options (options) {
        if (options) {
            return this.endpoint
                + '?'
                + Object.keys(options).map(key => key + '=' + options[key]).join('&');
        }

        return this.endpoint;
    }

    /**
     *
     * @param {Object} params
     */
    async search (params) {
        return fetch(this.options(params), this.header())
            .then(response => response.json());
    }
    /**
     *
     * @param {Integer} id
     */
    async one (id) {
        return fetch(this.url(id), this.header())
            .then(response => response.json());
    }

    /**
     *
     * @param {Object} params
     */
    async create (params) {
        let data = {
            method: 'POST',
            body: JSON.stringify(params)
        };

        return fetch(this.url(), this.header(data))
            .then(response => response.json());
    }

    /**
     *
     * @param {Integer} id
     * @param {Object} params
     */
    async update (id, params) {
        let data = {
            method: 'PUT',
            body: JSON.stringify(params)
        };

        return fetch(this.url(id), this.header(data))
            .then(response => response.json());
    }

    /**
     *
     * @param {Integer} id
     */
    async delete (id) {
        let data = {
            method: 'DELETE'
        };

        return fetch(this.url(id), this.header(data))
            .then(response => response.json());
    }
}

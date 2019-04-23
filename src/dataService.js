function getPage(page) {
    console.log(page)
    console.log(process.env.API_URL + "page/" + page)
    return fetch(process.env.API_URL + "page/" + page)
        .then(results => {
            return results.json()
        })
        .then(data => {
            return JSON.parse(data)
        })
        .catch(e => console.log(page + " could not be fetched: " + e))

}

module.exports = { getPage }

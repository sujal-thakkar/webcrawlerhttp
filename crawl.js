const { JSDOM } = require('jsdom')
function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    linkElements = dom.window.document.querySelectorAll('a')
    for (linkelement of linkElements) {
        if (linkelement.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkelement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`invalid relative URL: ${error.message}`);
            }
        }
        else {
            //absolute
            try {
                const urlObj = new URL(linkelement.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`invalid absolute URL: ${error.message}`);
            }
        }
    }
    return urls
}
function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    else return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
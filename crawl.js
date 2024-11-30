const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
    console.log(`actively crawling ${currentURL}`);

    try {
        const response = await fetch(currentURL)
        if(response.status > 399) {
            console.log(`error in fetch with status code: ${response.status}, on page: ${currentURL}`);
            return
        }

        const contentType = response.headers.get("content-type")
        if(!contentType.includes('text/html')) {
            console.log(`non HTML response, content type: ${contentType}, on page: ${currentURL}`);
            return
        }
        console.log(await response.text());
    } catch (error) {
        console.log(`error in fetch: ${error.message} on page: ${currentURL}`);
    }
}

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
    getURLsFromHTML,
    crawlPage
}
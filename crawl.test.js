const{normalizeURL, getURLsFromHTML} = require('./crawl.js')
const{test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', ()=>{
    const input = 'https://BLOG.BOOT.DEV/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', ()=>{
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absoluteURLS', ()=>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href='http://blog.boot.dev/path/'>
                    Boot.Dev Blog Site
                </a>
            </body>
        </html>
    `
    const inputBaseURL = 'http://blog.boot.dev/path/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['http://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relativeURLS', ()=>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href='/path/'>
                    Boot.Dev Blog Site
                </a>
            </body>
        </html>
    `
    const inputBaseURL = 'http://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['http://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML bothURLS', ()=>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href='http://blog.boot.dev/path1/'>
                    Boot.Dev Blog Site path 1
                </a>
                <a href='/path2/'>
                    Boot.Dev Blog Site path 2
                </a>
            </body>
        </html>
    `
    const inputBaseURL = 'http://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['http://blog.boot.dev/path1/', 'http://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalidURL', ()=>{
    const inputHTMLBody = `
        <html>
            <body>
                <a href='invalid'>
                    invalid URL
                </a>
            </body>
        </html>
    `
    const inputBaseURL = 'http://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})
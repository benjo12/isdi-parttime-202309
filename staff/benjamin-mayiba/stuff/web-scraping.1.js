
const xhr = new XMLHttpRequest

// response

xhr.onload = function () {
    //console.log(xhr.response)

    const parser = new DOMParser
    const doc = parser.parseFromString(xhr.response, 'text/html')

    const titles = doc.querySelectorAll('h3.LC20lb')

    const results = []

    titles.forEach(title => {
        const result = {
            title: title.innerText,
            url: title.parentElement.href
        }

        results.push(result)
    })

    console.log(results)
}

// request

xhr.open('GET', 'https://www.google.com/search?q=hola')
xhr.send()
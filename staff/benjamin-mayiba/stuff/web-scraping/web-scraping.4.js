function googl(what, callback) {
    const xhr = new XMLHttpRequest

    // response

    xhr.onload = function () {
        //console.log(xhr.response)

        if (xhr.status === 200) {
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

            callback(null, results)
        } else if (xhr.status >= 400 && xhr.status < 500) {
            callback(new Error('client error'))
        } else if (xhr.status >= 500) {
            callback(new Error('server error'))
        }
    }

    xhr.onerror = function () {
        callback(new Error('connection error'))
    }

    // request

    xhr.open('GET', 'https://www.google.com/search?q=' + what)
    xhr.send()
}

// demos

const before = Date.now()

googl('pepito grillo', (error, results) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('pepitos search', Date.now() - before)

    results.forEach(result => console.log(result))
})

googl('campanilla hada', (error, results) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('campanillas search', Date.now() - before)

    document.body.innerHTML = ''

    results.forEach(result => {
        const h2 = document.createElement('h2')
        h2.innerText = result.title

        document.body.appendChild(h2)
    })
})

console.log('continue doing other good sh*t...')
function googl(what) {
    return new Promise((resolve, reject) => {
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

                resolve(results)
            } else if (xhr.status >= 400 && xhr.status < 500) {
                reject(new Error('client error'))
            } else if (xhr.status >= 500) {
                reject(new Error('server error'))
            }
        }

        xhr.onerror = function () {
            reject(new Error('connection error'))
        }

        // request

        xhr.open('GET', 'https://www.google.com/search?q=' + what)
        xhr.send()
    })
}

// demos

const before = Date.now()

googl('pepito grillo')
    .then(results => {
        console.log('pepitos search', Date.now() - before)

        results.forEach(result => console.log(result))

        return googl('campanilla hada')
    })
    .then(results => {
        console.log('campanillas search', Date.now() - before)

        document.body.innerHTML = ''

        results.forEach(result => {
            const h2 = document.createElement('h2')
            h2.innerText = result.title

            document.body.appendChild(h2)
        })

        return googl('hormiga atomica')
    })
    .then(results => {
        console.warn('hormigas search', Date.now() - before)

        results.forEach(result => console.warn(result))
    })
    .catch(error => {
        console.error(error)
    })

console.log('continue doing other good sh*t...')
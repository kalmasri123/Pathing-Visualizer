



let matrix = [
    ['b', 'o', 'o', 'o'],
    ['o', 'c', 'c', 'o'],
    ['o', 'o', 'o', 'o'],

    ['o', 'c', 'c', 'd'],

]
function clearEmptyArrays(arr) {
    return arr.filter(el => el.length > 0)

}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// async function sleep(fn, ...args) {
//     await timeout(3000);
//     return fn(...args);
// }

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
function evaluateFound(result) {
    // console.log(result)
    // console.log((result.length == 2 && typeof result[0] == "number" && typeof result[1] == "number"))
    return (result.length == 2 && typeof result[0] == "number" && typeof result[1] == "number")

}
function getShortestPath(arr) {
    let routes = []
    let visited = []

    function traverse(arr, routes, i, j, previousI, previousJ, level = 0) {
        if (level == 15) {
            level;
        }

        if (!arr[i] || !arr[i][j] || arr[i][j].classList.contains('closed') || (arr[i][j].classList.contains('beginning') && level > 0) || visited.find(el => arrayEquals(el, [i, j]))) return null;


        if (arr[i][j].classList.contains('destination')) return [i, j];
        visited.push([i, j])
        let emptyArr = []
        let currentElement = arr[i][j]
        let result;
        let found = false;
        //i+1
        if (!(i + 1 == previousI && j == previousJ)) {
            timeout(200).then(() => {
                result = traverse(arr, routes, i + 1, j, i, j, level + 1)

                if (Array.isArray(result) && !found) {
                    currentElement.classList.add('traversed')
                    found = evaluateFound(result)
                    emptyArr.push(result)

                }
            })
        }

        if (!(i == previousI && j + 1 == previousJ)) {
            timeout(200).then(() => {

                result = traverse(arr, routes, i, j + 1, i, j, level + 1)

                if (Array.isArray(result) && !found) {
                    currentElement.classList.add('traversed')
                    found = evaluateFound(result)
                    emptyArr.push(result)

                }
            })
        }

        if (!(i - 1 == previousI && j == previousJ)) {
            timeout(200).then(() => {

                result = traverse(arr, routes, i - 1, j, i, j, level + 1)

                if (Array.isArray(result) && !found) {
                    currentElement.classList.add('traversed')
                    found = evaluateFound(result)

                    emptyArr.push(result)

                }
            })
        }

        if (!(i == previousI && j - 1 == previousJ)) {
            timeout(200).then(() => {

                result = traverse(arr, routes, i, j - 1, i, j, level + 1)

                if (Array.isArray(result) && !found) {
                    currentElement.classList.add('traversed')
                    found = evaluateFound(result)

                    emptyArr.push(result)

                }
            })
        }

        // emptyArr.unshift([i,j])

        return clearEmptyArrays([[i, j], ...emptyArr])
    }
    let result = traverse(arr, routes, 0, 0, 0, 0)
    console.log(JSON.stringify(result))
}
document.addEventListener('DOMContentLoaded', () => {
    let elements = Array.from(document.querySelector('#boxes').querySelectorAll('tr')).map(el => Array.from(el.querySelectorAll('td')))
    getShortestPath(elements, 0, 0)
    console.log(elements)
})
// console.log(getShortestPath(matrix, 0, 0))

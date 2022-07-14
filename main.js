let few = 300
const many = 300000

const intervalId = setInterval(() => {
    few--

    let greekCityState = 'Sparta'
    const isItOrIsItNot = !!few ? 'is' : 'is not'
    const greekCityStateDemonstratedClearly = greekCityState.toUpperCase()
    const assertiveClaim = `This ${isItOrIsItNot} ${greekCityStateDemonstratedClearly}`

    console.info(assertiveClaim)
    console.warn(few)

    if (few === 0) { greekCityState = null }

    if (!greekCityState) { clearInterval(intervalId) }

}, few / many)

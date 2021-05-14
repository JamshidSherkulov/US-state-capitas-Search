const search = document.getElementById('search')
const matchList = document.getElementById('match-list')

// Getting json api

const searchStates = async searchText => {
    let res = await fetch('../data/states.json')
    let states = await res.json()

    // Get matches to current input
    let matches = states.filter(state => {
        let regex = new RegExp(`^${searchText}`, `gi`)
        return state.name.match(regex) || state.abbr.match(regex)
    })

    if(searchText.length === 0) {
        matches = []
        matchList.innerHTML = ''
    }

    outputHtml(matches)
}

const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `
            <div class='card card-body mb-1'>
                <h3>${match.name} (${match.abbr}) <span class='text-primary'>${match.capital}</span></h3>
                <small>Lat: ${match.lat} / Long: ${match.long} </small>
            </div>
        `).join('')

        matchList.innerHTML = html
    }

}



search.addEventListener('input', () => searchStates(search.value))
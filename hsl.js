let daySeconds = () => {
	var dt = new Date();
	return dt.getSeconds() + (60 * (dt.getMinutes() + (60 * dt.getHours())));
}

async function initTable(id){

	let response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/graphql'
		},
		body: url(id)
	})
	
	await response.json().then(res => {
		
		let stops = res.data.stop.stoptimesWithoutPatterns
		let timetable = document.querySelector('.timetable')
		let nameCard = document.createElement('li')
		nameCard.className = 'list-group-item'
		nameCard.innerHTML = `<span>${res.data.stop.name}</span>`

		timetable.appendChild(nameCard)

		for(let i = 0; i < stops.length; i++){
			let stop = stops[i]
			let timeUntil = Math.round((stop.realtimeArrival-daySeconds())/60)
			let busCard = document.createElement('li')
			
			busCard.className = 'list-group-item'
			busCard.innerHTML = `<span>${stop.trip.route.shortName}</span><span class="badge bg-secondary float-end">${timeUntil} min</span>`
			timetable.appendChild(busCard)
		}
		document.querySelector(".card").style.opacity = "1"
	})

}
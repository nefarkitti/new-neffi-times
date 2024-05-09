const newspage = document.getElementById("newspage")

newspage.innerHTML = ``

/*
<h1 class="headline">joe biden expldoes today because of explosions</h1>
            <div class="newsimg">
                <img src="https://media.newyorker.com/photos/5d7b86a597788f00095a8245/master/w_2560%2Cc_limit/Cassidy-BidenThirdDebate.jpg">
                <span class="author">The New Neffi Times</span>
            </div>
            <span class="content">hello guys</span>
*/

let data

fetch('/data.json').then(function(response) {
    return response.json();
}).then(function(dat) {
    data = dat

    function getTimeString(timestamp) {
        let now = new Date()
        let stamp = Date.parse(timestamp)
        let diff = Date.parse(now) - timestamp

        console.log(stamp)
        console.log(diff)

        const seconds = Math.ceil(diff / 1000)
        const minutes = Math.ceil(seconds / 60)
        const hours = Math.ceil(minutes / 60)
        const days = Math.ceil(hours / 24)
        const weeks = Math.ceil(days / 7)
        const months = Math.ceil(weeks / 4)
        const years = Math.ceil(months / 12)

        let result = `${seconds}s`

        if (seconds <= 1) {
            result = `Just now`
        }
        if (seconds >= 60) {
            result = `${minutes} minutes`
        }
        if (minutes >= 60) {
            result = `${hours} hours`
        }
        if (hours >= 24) {
            result = `${days} days`
        }
        if (days >= 7) {
            result = `${weeks} weeks`
        }
        if (weeks >= 4) {
            result = `${months} months`
        }
        if (months >= 12) {
            result = `${years} years`
        }
        return result
    }

    function load() {
        const getSave = localStorage.getItem("save");
        try {
            if (getSave != null) {
                data = JSON.parse(getSave)
            }
            console.log("data loaded successfully")

        } catch {
            console.log("data didn't load properly, throw error and show error overlay.")
            // document.explode()
        }
    }
    function save() {
        data = data
        localStorage.setItem("save", JSON.stringify(data))
    }

    load()
    save()
});

let windowIndex = window.location.search
const urlParams = new URLSearchParams(windowIndex);

if (Number(urlParams.get("article")) >= 0 ) {
    newspage.innerHTML = `
        <h1 class="headline">joe biden expldoes today because of explosions</h1>
            <div class="newsimg">
                <img src="https://media.newyorker.com/photos/5d7b86a597788f00095a8245/master/w_2560%2Cc_limit/Cassidy-BidenThirdDebate.jpg">
                <span class="author">The New Neffi Times</span>
            </div>
            <span class="content">hello guys</span>
    `
} else {
    newspage.innerHTML = `
    <h1>Could not find what you were looking for.</h1>
    `
}
const page = document.getElementById("homepage")

document.getElementById("date").innerText = new Date().toDateString()

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

            // load top story
            console.log(data)
            let topStory = data.articles[0]
            page.innerHTML = ``

            let readingTime = topStory.contents.length

            page.innerHTML += `
            <div class="story" onclick="window.location.href='/news.html?article=${topStory.id}'">
                <div class="storyContainer">
                    <div class="left">
                        <span class="breaking"><i class="fa-solid fa-circle"></i> LATEST NEWS</span>
                        <span class="title">${topStory.title}</span>
                        <div class="tags" id="top-tags"></div>
                        <span class="desc">${topStory.shortened}</span>
                        <span class="extra">${readingTime} SECOND READ</span>
                        <span class="extra">${getTimeString(topStory.timestamp)} ago</span>
                    </div>
                    <div class="between"></div>
                    <div class="right">
                        <img src="${topStory.image}">
                        <span class="author">${topStory.imageCredit}</span>
                    </div>
                </div>
            </div>
            `
            let tags = document.getElementById("top-tags")
            topStory.tags.forEach(element => {
                const span = document.createElement("span")
                span.classList.add("tag")
                span.innerHTML = element
                tags.appendChild(span)
            });

            let lastSection
            for (let i = 1; i < data.articles.length;i++) {

                if (i % 2 === 1) {
                    page.innerHTML += `<hr>`
                    page.innerHTML += `
                    <div class="doublestory" id="section-${i}"></div>
                    `

                    lastSection = `section-${i}`
                    console.log("create section")
                }
                console.log("create story")
                let section = document.getElementById(lastSection)

                let story = data.articles[i]
    
                let readingTime = story.contents.length
    
                section.innerHTML += `
                <div class="story" onclick="window.location.href='/news.html?article=${story.id}'">
                    <div class="storyContainer">
                        <div class="left">
                            <span class="title">${story.title}</span>
                            <div class="tags" id="tags-${i}"></div>
                            <span class="desc">${story.shortened}</span>
                            <span class="extra">${readingTime} SECOND READ</span>
                            <span class="extra">${getTimeString(topStory.timestamp)} ago</span>
                        </div>
                        <div class="between"></div>
                        <div class="right">
                            <img src="${story.image}">
                            <span class="author">${story.imageCredit}</span>
                        </div>
                    </div>
                </div>
                `
                let tags = document.getElementById(`tags-${i}`)
                story.tags.forEach(element => {
                    const span = document.createElement("span")
                    span.classList.add("tag")
                    span.innerHTML = element
                    tags.appendChild(span)
                });       

            }

            page.innerHTML += `
            <button>SEE MORE</button>
            `


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

function resetData() {
    fetch('/data.json').then(function(response) {
        return response.json()
    }).then(function(data) {
        localStorage.setItem("save", JSON.stringify(data))
        window.location.href = "/"
    })
}
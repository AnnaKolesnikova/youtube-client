tplawesome = (template, data) => {
    res = template;
    for (var i = 0; i < data.length; i++) {
        res = res.toString().replace(/\{\{(.*?)\}\}/g, (match, j) => {
            return data[i][j];
        })
    }
    return res;
}

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector(".search-form").addEventListener("submit", (e) => {
        e.preventDefault();
        let request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent(document.getElementById("search").value.replace(/%20/g, "+")),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
        });
        request.execute((response) => {
            let results = response.result;
            document.getElementById("results").innerHTML;

            results.items.forEach((item, index) => {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', './item.html', false);
                xhr.send();
                if (xhr.status != 200) {
                    alert(xhr.status + ': ' + xhr.statusText);
                } else {
                    data = xhr.responseText;
                }
                let resultDiv = tplawesome(data, [{
                    "title": item.snippet.title,
                    "videoid": item.id.videoId
                }]);
                document.getElementById("results").innerHTML += resultDiv;
            });
        });
    });
});

init = () => {
    gapi.client.setApiKey("AIzaSyAfQCunjJMg8zISS49_OWdMoVLOjS5djl8");
    gapi.client.load("youtube", "v3", () => {
        //smth
    });
};
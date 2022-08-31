document.addEventListener("DOMContentLoaded", function () {
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

    if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (video) {
                if (video.isIntersecting) {
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                        }
                    }

                    video.target.load();
                    video.target.classList.remove("lazy");
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function (lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
});

function updatePageActive() {
    let buttons = document.querySelectorAll(".menu a");
    let pages = document.querySelectorAll(".page");

    let activePageIdx = -1;
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.classList.contains("active")) {
            activePageIdx = i;

            if (!pages[i].classList.contains("active")) {
                pages[i].classList.add("active");
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        }
        else {
            if (pages[i].classList.contains("active")) {
                pages[i].classList.remove("active");
            }
        }
    }
}

let buttons = document.querySelectorAll(".menu a");

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const idx = i;
    button.addEventListener("click", function () {
        console.log("click!");

        if (!button.classList.contains("active")) {
            button.classList.add("active");

            for (let i = 0; i < buttons.length; i++) {
                const button = buttons[i];
                if (i != idx && button.classList.contains("active")) {
                    button.classList.remove("active");
                }
            }
            updatePageActive();
        }
    });
}
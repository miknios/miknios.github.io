// Pages
// The site has two pages, "works" and "info", and the address says which one to show: /#works, /#info, or the id
// of a project such as /#uragun (opens "works" scrolled to that project). With no address, "info" is shown.

const pages = document.querySelectorAll(".page");
const menuLinks = document.querySelectorAll(".menu nav a");

function showPageFromAddress() {
    if (pages.length === 0) {
        return; // pages without the menu's pages, e.g. "page not found"
    }

    const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
    const page = (target && target.closest(".page")) || document.getElementById("info");

    pages.forEach((p) => p.classList.toggle("active", p === page));
    menuLinks.forEach((link) => {
        const isCurrent = link.hash === "#" + page.id;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    if (target && target !== page) {
        target.scrollIntoView();
    } else {
        window.scrollTo(0, 0);
    }
}

// Projects scrolled to by their address stop just below the sticky header, whose height changes with screen size
const header = document.querySelector("header");
function updateScrollPadding() {
    document.documentElement.style.scrollPaddingTop = header.getBoundingClientRect().height + "px";
}
updateScrollPadding();
new ResizeObserver(updateScrollPadding).observe(header);

window.addEventListener("hashchange", showPageFromAddress);
showPageFromAddress();


// Videos
// Each video downloads once it's close to being on screen, and plays only while it's visible. With "reduce motion"
// turned on in the system settings, videos don't play by themselves and show playback controls instead.

const videos = document.querySelectorAll("video[data-poster]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function loadVideo(video) {
    if (video.dataset.loaded) {
        return;
    }
    video.dataset.loaded = "true";
    video.poster = video.dataset.poster;
    video.querySelectorAll("source").forEach((source) => source.src = source.dataset.src);
    video.controls = reduceMotion;
    video.load();
}

function playVideo(video) {
    if (!reduceMotion) {
        video.play().catch(() => {}); // e.g. blocked in power saving mode, the poster stays visible
    }
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadVideo(entry.target);
                playVideo(entry.target);
            } else if (entry.target.dataset.loaded) {
                entry.target.pause();
            }
        });
    }, { rootMargin: "300px 0px" });

    videos.forEach((video) => observer.observe(video));
} else {
    videos.forEach((video) => {
        loadVideo(video);
        playVideo(video);
    });
}

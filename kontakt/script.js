const popUpBtn = document.querySelectorAll(".js-loCmsPopUpBtn");

const togglePopUp = ({btn}) => {
            const popupId = btn.getAttribute("aria-controls");
            const popUp = document.getElementById(popupId);
            const isOpen = popUp.classList.contains("open");

            popUp.classList.toggle("open");
            btn.setAttribute("aria-expanded", !isOpen);
            popUp.setAttribute("aria-hidden", isOpen);
}

const openPopUp = () => {
    popUpBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            togglePopUp({btn: btn})
        })
    })
};

openPopUp();

const popUpCloseBtn = document.querySelectorAll(".js-loCmsPopUpCloseBtn");

const closePopUp = () => {
    popUpCloseBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const popupId = btn.getAttribute("aria-controls");
            const popUp = document.getElementById(popupId);

            const isOpen = popUp.classList.contains("open");

            popUp.classList.toggle("open");
            // btn.classList.toggle("open");

            btn.setAttribute("aria-expanded", !isOpen);
            popUp.setAttribute("aria-hidden", isOpen);
        })
    })
};

closePopUp();

const loCmsLoadBunnyPlayerApi = () => {
    if (window.playerjs) {
        return Promise.resolve();
    }

    if (window.loCmsBunnyPlayerApiLoading) {
        return window.loCmsBunnyPlayerApiLoading;
    }

    window.loCmsBunnyPlayerApiLoading = new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src = "https://assets.mediadelivery.net/playerjs/playerjs-latest.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    return window.loCmsBunnyPlayerApiLoading;
};

const initLoCmsBunnyPlayers = () => {
    const bunnyPlayers = document.querySelectorAll("[data-bunny-player]");

    if (!bunnyPlayers.length) {
        return;
    }

    loCmsLoadBunnyPlayerApi().then(() => {
        bunnyPlayers.forEach(player => {
            const iframe = player.querySelector("iframe");
            const poster = player.querySelector(".lo-cms-bunnyPlayer__poster");

            if (!iframe || !poster || player.dataset.bunnyPlayerReady === "true") {
                return;
            }

            const bunnyPlayer = new playerjs.Player(iframe);
            let playRequested = false;

            player.dataset.bunnyPlayerReady = "true";

            bunnyPlayer.on("ready", () => {
                if (playRequested) {
                    bunnyPlayer.play();
                }
            });

            bunnyPlayer.on("play", () => {
                player.classList.add("is-playing");
            });

            poster.addEventListener("click", () => {
                playRequested = true;
                bunnyPlayer.play();
            });
        });
    });
};

initLoCmsBunnyPlayers();

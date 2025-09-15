const popUpBtn = document.querySelectorAll(".js-loCmsPopUpBtn");

// const togglePopUp = () => {}

const openPopUp = () => {
    popUpBtn.forEach(btn => {
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
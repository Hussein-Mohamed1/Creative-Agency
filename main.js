let background = document.querySelector('.background');
let numofphotos = 1;
function changeBackground() {
    background.style.backgroundImage = `url("images/${numofphotos}.jpg")`;
    numofphotos++;
    if (numofphotos >= 11)
        numofphotos = 1;
};
window.onload = function () {
    let yesbtn = document.querySelectorAll(".btn-r")[0];
    if (yesbtn.classList.contains('active')) {
        intervalBackground = setInterval(changeBackground, 3000);
    } else {
        background.style.backgroundImage = localStorage.getItem('background');
    }
};
// turn on / off random background
//control bullets buttons
document.onclick = function (e) {
    if (e.target.classList.contains('btn')) {
        if (e.target.classList.contains('non-active')) {
            e.target.classList.remove('non-active');
            e.target.classList.add('active');
            if (e.target.previousElementSibling.classList.contains('active')) {
                e.target.previousElementSibling.classList.remove('active');
                e.target.previousElementSibling.classList.add('non-active');
                if (e.target.parentElement.classList.contains('random')) {
                    clearInterval(intervalBackground);
                    localStorage.setItem('background', background.style.backgroundImage);
                    localStorage.setItem('random-yes', 'non-active');
                    localStorage.setItem('random-no', 'active');
                }
            } else {
                e.target.nextElementSibling.classList.remove('active');
                e.target.nextElementSibling.classList.add('non-active');
                if (e.target.parentElement.classList.contains('random')) {
                    intervalBackground = setInterval(changeBackground, 3000);
                    localStorage.setItem('random-yes', 'active');
                    localStorage.setItem('random-no', 'non-active');
                }
            }

        }
    }
}

// color seleced
let colors = document.querySelector(".colors-list");
colors.onclick = function (e) {
    if (e.target.tagName === 'LI') {
        let ele = document.querySelector(".selected");
        ele.classList.remove('selected');
        e.target.classList.add('selected');
        localStorage.setItem('color', getComputedStyle(e.target).backgroundColor);
        document.documentElement.style.setProperty('--main-color', getComputedStyle(e.target).backgroundColor);
    }
}
if (!localStorage.getItem('color'))
    localStorage.setItem('color', "rgb(255, 153, 0)");
document.documentElement.style.setProperty('--main-color', localStorage.getItem('color'));
document.getElementsByClassName(localStorage.getItem('color'))[0].classList.add("selected");
// switch of random background
let btnR = document.querySelectorAll('.btn-r');
for (let btn = 0; btn < btnR.length; btn++) {
    if (btnR[btn].classList.contains('yes')) {
        if (!localStorage.getItem("random-yes") || localStorage.getItem("random-yes") == "active") {
            btnR[btn].classList.add('active');
            btnR[btn].classList.remove('non-active');
        } else {
            btnR[btn].classList.add('non-active');
            btnR[btn].classList.remove('active');
        }
    } else {
        if (!localStorage.getItem("random-no") || localStorage.getItem("random-no") == "non-active") {
            btnR[btn].classList.add('non-active');
            btnR[btn].classList.remove('active');
        } else {
            btnR[btn].classList.add('active');
            btnR[btn].classList.remove('non-active');
        }
    }
}

// reset page
let reset = document.querySelector(".reset-btn");
reset.onclick = () => {
    localStorage.clear();
    localStorage.setItem('color', "rgb(255, 153, 0)");
    let btnyes = document.querySelectorAll(".yes");
    for (let btn = 0; btn < btnyes.length; btn++) {
        btnyes[btn].classList.remove('non-active');
        btnyes[btn].classList.add('active');
        intervalBackground = setInterval(changeBackground, 3000);
    }
    let btnno = document.querySelectorAll(".no");
    for (let btn = 0; btn < btnno.length; btn++) {
        btnno[btn].classList.remove('active');
        btnno[btn].classList.add('non-active');
    }
    location.reload();
};
// setting switch
let toggle = document.querySelector(".toggle");
let settings = document.querySelector(".settings");
toggle.onclick = () => {
    if (getComputedStyle(toggle).left === "0px") {
        toggle.style.left = "193px";
        settings.style.left = "0";
        toggle.children[0].classList.add('fa-spin');
    } else {
        toggle.style.left = "0px";
        settings.style.left = "-200px";
        toggle.children[0].classList.remove('fa-spin');
    }
}


// progress bar of skills 
let ourSkills = document.querySelector(".skills");
window.onscroll = () => {
    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;
    // Window ScrollTop
    let windowScrollTop = this.scrollY;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight / 3 - windowHeight) && windowScrollTop < (skillsOffsetTop + skillsOuterHeight / 3 - windowHeight) + 1.7 * skillsOuterHeight) {
        document.querySelectorAll(".skills .skill-range span").forEach((span) => {
            span.style.width = span.getAttribute("data-progress");
        })
    } else {
        document.querySelectorAll(".skills .skill-range span").forEach((span) => {
            span.style.width = "0%";
        })
    }
}

// click on pic gallery to show picture

let pics = document.querySelectorAll(".gallery .gallery-pic img");
for (let i = 0; i < pics.length; i++) {
    pics[i].addEventListener("click", (e) => {
        let mypopup = document.querySelector(".popup-box");
        let header = document.querySelector(".pic-head");
        let text = document.createTextNode(pics[i].alt);
        header.appendChild(text);
        let img = pics[i].cloneNode(true);
        mypopup.appendChild(img);
        let mypopupOverlay = document.querySelector(".popup-overlay");
        mypopupOverlay.style.display = "block";
        mypopup.style.display = "block";
    })
}
// click on close button to close picture gallery
let myclose = document.querySelector(".close-pic");
myclose.addEventListener('click', () => {
    let mypopup = document.querySelector(".popup-box");
    let mypopupOverlay = document.querySelector(".popup-overlay");
    let header = document.querySelector(".pic-head");
    header.textContent = "";
    mypopup.lastChild.remove();
    mypopup.style.display = "none";
    mypopupOverlay.style.display = "none";
})

// click esc to close toggle or pic
document.addEventListener('keydown', function (event) {
    // Check if the key pressed is the Esc key
    if (event.key === 'Escape' || event.key === 'Esc') {
        toggle.style.left = "0px";
        settings.style.left = "-200px";
        toggle.children[0].classList.remove('fa-spin');
        let mypopup = document.querySelector(".popup-box");
        let mypopupOverlay = document.querySelector(".popup-overlay");
        let header = document.querySelector(".pic-head");
        header.textContent = "";
        if (mypopup.lastChild.tagName === "IMG")
            mypopup.lastChild.remove();
        mypopup.style.display = "none";
        mypopupOverlay.style.display = "none";
    }
});

// control showen bullets with buttons
let bulletsBtn = document.querySelectorAll(".btn-b");
let bullets = document.querySelector(".bullets-list");
bulletsBtn.forEach((e) => {
    e.onclick = () => {
        if(e.classList.contains("yes")) {
            localStorage.setItem("bullets" , "yes");
            bullets.style.display = "block";
        } else {
            localStorage.setItem("bullets" , "no");
            bullets.style.display = "none";
        }
    }
});
let bulletsState = localStorage.getItem("bullets");
if(bulletsState) {
    if(bulletsState === "yes" ) {
        bulletsBtn[0].classList.add("active");
        bulletsBtn[0].classList.remove("non-active");
        bulletsBtn[1].classList.remove("active");
        bulletsBtn[1].classList.add("non-active");
    } else {
        bulletsBtn[0].classList.remove("active");
        bulletsBtn[0].classList.add("non-active");
        bulletsBtn[1].classList.add("active");
        bulletsBtn[1].classList.remove("non-active");
        bullets.style.display = "none";
    }
}

// menu 
let menu = document.querySelector(".toggle-menu");
let menuitems = document.querySelector(".nav");
let stillopen = false;
menu.onclick = () => {
    if(menuitems.classList.contains("open")){
        menuitems.classList.remove("open");
        menu.classList.remove("open");
        menuitems.style.display = "none";
        stillopen = false;        
    } else {
        menuitems.classList.add("open");
        menu.classList.add("open");
        menuitems.style.display = "block";
        stillopen = true;
    }
}
window.addEventListener("resize" , () => {
    if(window.innerWidth > 991) {
        if(menuitems.classList.contains("open")) {
            menuitems.classList.remove("open");
        }
        menuitems.style.display = "block";
    } else {
        menuitems.classList.add("open");
        if(stillopen) {
            menuitems.style.display = "block";
            menu.classList.add("open");
        }
        else {
            menuitems.style.display = "none";
            menu.classList.remove("open");
        }
    }
})
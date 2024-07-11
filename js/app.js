(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", (function() {
        function animateSolution(containerSelector, itemSelector, initialDelay, itemDelay, threshold) {
            const items = document.querySelectorAll(itemSelector);
            const showItems = () => {
                items.forEach(((item, index) => {
                    setTimeout((() => {
                        item.classList.add("visible");
                    }), index * itemDelay);
                }));
            };
            const observer = new IntersectionObserver((entries => {
                entries.forEach((entry => {
                    if (entry.isIntersecting) {
                        setTimeout(showItems, initialDelay);
                        observer.disconnect();
                    }
                }));
            }), {
                threshold
            });
            const container = document.querySelector(containerSelector);
            observer.observe(container);
        }
        function animateServiceItems() {
            const items = document.querySelectorAll(".servise-session__item");
            const decorImg = document.querySelector(".servise-session__decor-img");
            if (items.length > 0 && decorImg) {
                items.forEach(((item, index) => {
                    const img = item.querySelector(".servise-session__img");
                    const block = item.querySelector(".servise-session__block");
                    setTimeout((() => {
                        img.classList.add("show");
                    }), 300 * index);
                    setTimeout((() => {
                        block.classList.add("show");
                    }), 300 * index + 300);
                }));
                setTimeout((() => {
                    decorImg.classList.add("show");
                }), 300 * items.length + 200);
            }
        }
        const serviceObserver = new IntersectionObserver((entries => {
            entries.forEach((entry => {
                if (entry.isIntersecting) {
                    setTimeout((() => {
                        animateServiceItems();
                    }), 100);
                    serviceObserver.disconnect();
                }
            }));
        }), {
            threshold: .1
        });
        const serviceContainer = document.querySelector(".session__servise");
        animateSolution(".session__solution", ".solution__item", 500, 200, .1);
        setTimeout((() => {
            serviceObserver.observe(serviceContainer);
        }), 500 + 300 * document.querySelectorAll(".solution__item").length + 200);
    }));
    const animItems = document.querySelectorAll("._anim-items");
    if (animItems.length > 0) {
        window.addEventListener("scroll", animOnScroll);
        let animInterval = 300;
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 200;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) window.innerHeight, window.innerHeight;
                if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
                    if (!animItem.classList.contains("_active")) setTimeout((() => {
                        animItem.classList.add("_active");
                    }), index * animInterval);
                } else if (!animItem.classList.contains("_anim-no-hide")) animItem.classList.remove("_active");
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        animOnScroll();
    }
    const swiper = document.querySelector(".swiper");
    if (swiper) {
        function showMore() {
            const btnReadMore = document.querySelector(".plane__btn");
            const planeItems = document.querySelector(".plane__bottom-items");
            btnReadMore.addEventListener("click", (() => {
                planeItems.classList.toggle("active");
            }));
        }
        function showFairway1() {
            window.addEventListener("scroll", (() => {
                const fairwayBlock = document.querySelector(".fairway__row");
                const fairwayBlockBack = document.querySelector(".fairway__row-back");
                const animItemHeight = fairwayBlock.offsetHeight;
                const animItemOffset = offset(fairwayBlock).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) fairwayBlockBack.style.animation = "fairway 2.2s forwards";
            }));
        }
        function mentors() {
            window.addEventListener("scroll", (() => {
                const mentorsBlock = document.querySelector(".mentors__line");
                const mentorsBg = document.querySelector(".mentors__line-bg-2");
                const animItemHeight = mentorsBlock.offsetHeight;
                const animItemOffset = offset(mentorsBlock).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) mentorsBg.classList.add("active");
            }));
        }
        function choice() {
            window.addEventListener("scroll", (() => {
                const choiceBlock = document.querySelector(".choice__items");
                const block1 = document.querySelector(".ci-1");
                const block2 = document.querySelector(".ci-2");
                const block3 = document.querySelector(".ci-3");
                const animItemHeight = choiceBlock.offsetHeight;
                const animItemOffset = offset(choiceBlock).top;
                const animStart = 4;
                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) {
                    block1.style.animation = "ci-1 0.5s forwards";
                    block2.style.animation = "ci-2 0.5s forwards";
                    block2.style.animationDelay = "0.5s";
                    block3.style.animation = "ci-3 0.5s forwards";
                    block3.style.animationDelay = "1s";
                }
            }));
        }
        function cutText() {
            let texts = document.querySelectorAll(".swiper-item__text");
            texts.forEach((text => {
                text.textContent.length > 709 ? text.textContent = text.textContent.slice(0, 709) + "..." : text.textContent = text.textContent;
            }));
        }
        function isMozilla() {
            const userAgent = navigator.userAgent.toLowerCase();
            const mozila = /firefox/.test(userAgent);
            const link = document.querySelector(".fairway__link");
            if (mozila) link.style.marginTop = "-7px";
        }
        function scrollUp2() {
            const scrollUp = document.querySelector(".scrollUp");
            window.addEventListener("scroll", (() => {
                if (scrollY > 499) scrollUp.classList.add("active"); else scrollUp.classList.remove("active");
            }));
            scrollUp.addEventListener("click", (() => {
                $("html, body").animate({
                    scrollTop: $("#top").offset().top
                }, "slow");
            }));
        }
        new Swiper(".swiper", {
            speed: 400,
            spaceBetween: 50,
            slidesPerView: 1,
            allowTouchMove: false,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
        function scrollToMentor() {
            const mentorIgor = document.getElementById("mentors-igor");
            mentorIgor.addEventListener("click", (() => {
                localStorage.setItem("mentor", "igor");
            }));
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop,
                left: rect.left + scrollLeft
            };
        }
        showMore();
        showFairway1();
        mentors();
        choice();
        cutText();
        isMozilla();
        scrollUp2();
        scrollToMentor();
    }
    function formValidation() {
        const validation = new JustValidate(".modal-request__form");
        const inputMask = new Inputmask("+7 (999) 999-99-99");
        const telSelector = document.querySelector(".modal-request__phone");
        inputMask.mask(telSelector);
        validation.addField(".modal-request__name", [ {
            rule: "minLength",
            value: 2
        }, {
            rule: "maxLength",
            value: 50
        }, {
            rule: "required",
            value: true,
            errorMessage: "Введите имя"
        } ]).addField(".modal-request__phone", [ {
            rule: "required",
            value: true,
            errorMessage: "Введите телефон"
        } ]).onSuccess((event => {
            let formData = new FormData(event.target);
            let xhr = new XMLHttpRequest;
            console.log(...formData);
            xhr.onreadystatechange = function() {
                if (4 === xhr.readyState) if (200 === xhr.status) console.log("отправлено");
            };
            $.fancybox.close("fancybox-content");
            $.fancybox.open({
                src: "#modal-thanks",
                type: "inline"
            });
            xhr.open("POST", "mail.php", true);
            xhr.send(formData);
            event.target.reset();
        }));
    }
    function btnValidation() {
        const btn = document.querySelector(".modal-request__btn");
        const inputName = document.querySelector(".modal-request__name");
        const inputPhone = document.querySelector(".modal-request__phone");
        inputName.addEventListener("input", (e => {
            checkLength();
        }));
        inputPhone.addEventListener("input", (e => {
            checkLength();
        }));
        function checkLength() {
            if (inputName.value.length > 1 && inputPhone.value.length > 1) btn.classList.add("active"); else btn.classList.remove("active");
        }
    }
    function checkStorage() {
        const mentorsPage = document.querySelector(".body-mentors");
        const igor = localStorage.getItem("mentor");
        if (mentorsPage && igor) {
            $(document).ready((function() {
                $("html, body").animate({
                    scrollTop: $("#igor").offset().top - 160
                }, "slow");
            }));
            localStorage.clear();
        }
    }
    formValidation();
    btnValidation();
    checkStorage();
    function scrollUp2() {
        const scrollUp = document.querySelector(".scrollUp");
        window.addEventListener("scroll", (() => {
            if (scrollY > 499) scrollUp.classList.add("active"); else scrollUp.classList.remove("active");
        }));
        scrollUp.addEventListener("click", (() => {
            $("html, body").animate({
                scrollTop: $("#top").offset().top
            }, "slow");
        }));
    }
    scrollUp2();
})();
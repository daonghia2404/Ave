window.onload = () => {
    const navigation = {
        init: function () {
            this.openCloseMenu();
            this.openCloseSubMenu();
            this.fixedMenu();
        },
        //Mở đóng Menu
        openCloseMenu: function () {
            const btn = document.querySelector('.nav__button');
            const menu = document.querySelector('.nav__menu');

            btn.addEventListener('click', () => {
                menu.classList.toggle('active')
            })
        },
        //Mở đóng Sub Menu
        openCloseSubMenu: function () {
            const btnSubMenu = document.querySelectorAll('.menu__link');

            btnSubMenu.forEach(btn => btn.addEventListener('click', (e) => {
                const menu = document.querySelectorAll('.js--subMenu');
                menu.forEach(item => item.classList.remove('active'));

                const self = e.target.parentNode;   //tìm phần tử cha của phần tử được click
                const selfMenu = self.querySelector('.js--subMenu');

                selfMenu.classList.add('active');
            }))
        },
        //Đóng băng Menu
        fixedMenu: function () {
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('.nav');

                if (window.scrollY >= 100) {
                    nav.classList.add('active');
                } else {
                    nav.classList.remove('active');
                }
            })
        }
    }
    navigation.init();

    const banner = {
        init: function () {
            this.effect();
        },

        //Animation Text
        effect: function () {
            const item = document.querySelectorAll('.wrap span');
            let count = 0;

            function auto() {
                count++;
                count = count % item.length;
                item.forEach(i => i.classList.remove('active'));

                item[count].classList.add('active');
            }
            setInterval(auto, 3000);
        }
    }
    banner.init();

    const collection = {
        init: function () {
            this.hover();
            this.slide();
        },
        //Hiệu ứng di chuột vào Collection 
        hover: function () {
            var link = document.querySelectorAll(".collection__item");

            aniLink = function (e) {
                const thisLink = this;  //lấy phần tử hiện tại
                var x = e.offsetX;      //lấy toạ độ X của phần tử
                var y = e.offsetY;      //lấy toạ độ Y của phần tử

                var width = this.offsetWidth;   //lấy chiều rộng của phần tử
                var height = this.offsetHeight; //lấy chiều cao của phần tử


                //Set tốc độ
                move = 15;
                xMove = x / width * (move * 1) - move;
                yMove = y / height * (move * 1) - move;

                thisLink.style.transform = "translate(" + xMove + "px, " + yMove + "px)";

                if (e.type === "mouseleave") {
                    thisLink.style.transform = "";
                }
            }

            link.forEach(a => a.addEventListener("mousemove", aniLink));
            link.forEach(a => a.addEventListener("mouseleave", aniLink));
        },
        //Slider Collection
        slide: function () {
            const slideButton = document.querySelectorAll('.slide__button');
            const slide = document.querySelector('.slide__items');
            const item = document.querySelectorAll('.slide__item');

            const size = item[0].offsetWidth;   //lấy chiều rộng của 1 phần tử

            slideButton.forEach(btn => btn.addEventListener('click', (e) => {
                const self = e.target;
                slideButton.forEach(item => item.classList.remove('active'));

                self.classList.add('active');

                let index = self.dataset.count;
                slide.style.transform = `translateX(${-size * index}px)`;
            }))
        }
    }
    collection.init();

    const coWork = {
        init: function () {
            this.slide('.coWork');
        },
        slide: function (e) {
            const grabSlide = document.querySelector(e);
            const wrap = grabSlide.querySelector('#wrap');
            const items = document.querySelectorAll('.coWork__item');

            let isDown = false;
            let startX;
            let scrollLeft;
            let size = items[0].offsetWidth;

            function slideItem(){
                index = Math.round(wrap.scrollLeft / size);
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = size * index;
            }

            //add event grab wrap
            wrap.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - wrap.offsetLeft; //this value will take x at first
                scrollLeft = wrap.scrollLeft; //this value will take scroll left at first
                wrap.style.scrollBehavior = 'unset';
            })
            wrap.addEventListener('mouseleave', () => {
                isDown = false;
                slideItem();
            })
            wrap.addEventListener('mouseup', () => {
                isDown = false;
                slideItem();
            })
            wrap.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                //transfrom slide by grab and move left right
                const x = e.pageX - wrap.offsetLeft;
                const walk = x - startX;
                wrap.scrollLeft = scrollLeft - walk;
            })
        }
    }
    coWork.init();

    const footer = {
        init: function () {
            this.slide();
        },
        slide: function () {
            const slider = document.querySelector(".slider__items");
            const item = document.querySelectorAll(".slider__item");
            const next = document.getElementById("next");
            const prev = document.getElementById("prev");

            let count = 0;
            let size = item[0].offsetWidth + 1;

            slider.style.transform = `translateX(${-size * count}px)`;

            next.addEventListener('click', () => {
                if (count >= item.length - 1) return;
                slider.style.transition = 'all 0.5s ease-in-out';
                count++;
                slider.style.transform = `translateX(${-size * count}px)`;
            });

            prev.addEventListener('click', () => {
                if (count <= 0) return;
                slider.style.transition = 'all 0.5s ease-in-out';
                count--;
                slider.style.transform = `translateX(${-size * count}px)`;
            });
        }
    }
    footer.init();
}
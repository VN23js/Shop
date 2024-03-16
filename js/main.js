$(function () {});

function addClass() {
  const element = document.getElementById("material");
  element.classList.toggle("active233");
}
//function clickButton() {
//   document.getElementById("myButton1").click();
//}

//setInterval(clickButton, 10000); /// slider Timer

function addClass2() {
  document.getElementById("collapseExample1").classList.remove("show"),
    document.getElementById("collapseExample2").classList.remove("show");
  document.getElementById("collapseExample3").classList.remove("show"); ///remove elements
  document.getElementById("collapseExample4").classList.remove("show");
}

function addClass3() {
  document.getElementById("collapseExample").classList.remove("show");
  document.getElementById("collapseExample2").classList.remove("show");
  document.getElementById("collapseExample3").classList.remove("show");
  document.getElementById("collapseExample4").classList.remove("show");
}

function addClass4() {
  document.getElementById("collapseExample").classList.remove("show");
  document.getElementById("collapseExample1").classList.remove("show");
  document.getElementById("collapseExample3").classList.remove("show");
  document.getElementById("collapseExample4").classList.remove("show");
}

function addClass5() {
  document.getElementById("collapseExample").classList.remove("show");
  document.getElementById("collapseExample1").classList.remove("show");
  document.getElementById("collapseExample2").classList.remove("show");
  document.getElementById("collapseExample4").classList.remove("show");
}

function addClass6() {
  document.getElementById("collapseExample").classList.remove("show");
  document.getElementById("collapseExample1").classList.remove("show");
  document.getElementById("collapseExample2").classList.remove("show");
  document.getElementById("collapseExample3").classList.remove("show");
}

window.addEventListener("DOMContentLoaded", () => {
  // TABS

  const setClock = function (selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      interval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(interval);
      }
    }
  };

  setClock(".timer", getNextDay());

  // MODAL

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  // modalCloseBtn = document.querySelector('[data-close]') - удалить

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  // modalCloseBtn.addEventListener('click', closeModal); - удалить

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // CLASS

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 95;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>
			`;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  axios.get("https://3xgc8j0m-3000.euw.devtunnels.ms/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // когда придёт ответ на наше обращение к серверу, мы его обработаем здесь

  // getResource('http://localhost:3000/menu')
  // 	.then(data => {
  // 		data.forEach(({img, altimg, title, descr, price}) => {				//- 1 вариант (с шаблонами)
  // 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  // 		});
  // 	});

  // getResource('http://localhost:3000/menu')
  //         .then(data => createCard(data));

  // function createCard(data) {
  //         data.forEach(({img, altimg, title, descr, price}) => {
  //                 const element = document.createElement('div');				//- 2 вариант (без шаблонов)

  //                 element.classList.add('menu__item');

  //                 element.innerHTML = `
  //                         <img src=${img} alt=${altimg}>
  //                         <h3 class="menu__item-subtitle">${title}</h3>
  //                         <div class="menu__item-descr">${descr}</div>
  //                         <div class="menu__item-divider"></div>
  //                         <div class="menu__item-price">
  //                                 <div class="menu__item-cost">Цена:</div>
  //                                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
  //                         </div>
  //                 `;

  //                 document.querySelector('.menu .container').append(element);
  //         });
  // }

  //

  // fetch('https://jsonplaceholder.typicode.com/posts', { - пример удалить
  //         method: "POST", - пример удалить
  //         body: JSON.stringify({name: 'Alex'}), - пример удалить
  //         headers: { - пример удалить
  //                 'Content-type': 'application/json' - пример удалить
  //         } - пример удалить
  // }) - пример удалить
  //         .then(response => response.json()) - пример удалить
  //         .then(json => console.log(json)); - пример удалить

  // fetch('http://localhost:3000/menu')
  // 	.then(data => data.json())
  // 	.then(res => console.log(res));

  // SLIDER

  // showSlides(slideIndex);

  // if (slides.length < 10) {
  // 	total.textContent = `0${slides.length}`;
  // } else {
  // 	total.textContent = slides.length;
  // }

  // function showSlides(n) {
  // 	if (n > slides.length) {
  // 		slideIndex = 1;
  // 	}

  // 	if (n < 1) {
  // 		slideIndex = slides.length;
  // 	}

  // 	slides.forEach(item => item.style.display = 'none');

  // 	slides[slideIndex - 1].style.display = 'block';

  // 	if (slides.length < 10) {
  // 		current.textContent = `0${slideIndex}`;
  // 	} else {
  // 		current.textContent = slideIndex;
  // 	}
  // }

  // function plusSlides(n) {
  // 	showSlides(slideIndex += n);
  // }

  // prev.addEventListener('click', () => {
  // 	plusSlides(-1);
  // });

  // next.addEventListener('click', () => {
  // 	plusSlides(1);
  // });

  // CALC

  calcTotal();

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });

    // document.querySelector(parentSelector).addEventListener('click', (e) => { - баг удалить
    // 	if (e.target.getAttribute('data-ratio')) { - баг удалить
    // 		ratio = +e.target.getAttribute('data-ratio'); - баг удалить
    // 	} else { - баг удалить
    // 		sex = e.target.getAttribute('id'); - баг удалить
    // 	} - баг удалить

    // 	elements.forEach(elem => { - баг удалить
    // 		elem.classList.remove(activeClass); - баг удалить
    // 	}); - баг удалить

    // 	e.target.classList.add(activeClass); - баг удалить

    // 	calcTotal(); - баг удалить
    // }); - баг удалить
  }

  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
});

////////////////////////////////////////////////////////////////////////
class MenuCard3 {
  constructor(name, text, img, price, parentSelector, ...classes) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.text = text;

    this.classes = classes;
    this.parent = document.querySelector(parentSelector);
  }

  render3() {
    const element = document.createElement("div");
    if (this.classes.length === 0) {
      this.element = "wrapper";
      element.classList.add(this.element);
    } else {
      this.classes.forEach((className) => element.classList.add(className));
    }

    element.innerHTML = `

    <img class="card-img-topnext  style="width: 232px; height: 350px;" "  src=${this.img} alt="Машинка от катышек на одежде электрическая Xiaomi">
            <div class="bottom">
              <div class="left">
                <div class="details">
                  <h4 class="card-title">${this.name}</h4>
                  
                  <p>${this.price} &#8381;</p>
                </div>
                <a href="#" >   <div class="buy"> ЗАКАЗАТЬ  <i class="material-icons"><span class="material-symbols-outlined  white">
                  shopping_cart
                  </span></i></div></a>
              </div>
              
            </div>
         
          <div class="inside">
            <div class="icon"><i class="material-icons"><span class="material-symbols-outlined">
              info
              </span></i></div>
            <div class="contents">
              <p class="card-textnext">
              ${this.text}             </p>
                
            </div>
          </div>
      

      `;
    this.parent.append(element);
  }
}

axios.get("https://lwr1vjxm-3000.euw.devtunnels.ms/table").then((data) => {
  data.data.forEach(({ name, text, img, price }) => {
    const newElement = new MenuCard3(
      name,
      text,
      img,
      price,
      " .item-shop"
    ).render3();
  });
});

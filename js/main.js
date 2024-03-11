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

const forms = document.querySelectorAll("form");

const date = new Date();

const year = date.getFullYear();

const month = (date.getMonth() + 1).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const jsonDate = `${year}-${month}-${day}`;

const message = {
  loading: "img/form/spinner.svg",
  success: "Спасибо! Скоро мы с вами свяжемся",
  failure: "Что-то пошло не так..."
};

forms.forEach((item) => {
  bindPostData(item);
});

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },

    body: data
  });

  return await res.json();
};

function bindPostData(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let statusMessage = document.createElement("img");
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
    if (form.length > 205) {
      // Обрезаем сообщение до 100 символов
      form = form.substring(0, 205);
    }
    // statusMessage.textContent = message.loading; - удалить
    // form.append(statusMessage); - удалить
    form.insertAdjacentElement("afterend", statusMessage);

    // const request = new XMLHttpRequest(); - удалить
    // request.open('POST', 'server.php'); - удалить
    //let a ='эмир'
    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); - удалить
    const formData = new FormData(form);

    formData.append("date", jsonDate); // Добавить дату в FormData

    //  formData.append('RTY', a);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
    // const object = {}; - удалить
    // formData.forEach(function(value, key) { - удалить
    //         object[key] = value; - удалить
    // }); - удалить
    // const json = JSON.stringify(object); - удалить
    // formData - удалить
    // request.send(json); - удалить

    // fetch('server.php', { - удалить
    //         method: "POST", - удалить
    //         headers: { - удалить
    //                 'Content-type': 'application/json; charset=utf-8' - удалить
    //         }, - удалить
    //         // body: formData - удалить
    //         body: JSON.stringify(object) - удалить
    // }) - удалить
    // JSON.stringify(object)
    postData("https://lwr1vjxm-3000.euw.devtunnels.ms/requests", json)
      // .then(data => data.text()) - удалить

      .then((data) => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });

    // request.addEventListener('load', () => { - удалить
    //         if (request.status === 200) { - удалить
    //                 console.log(request.response); - удалить
    //                 showThanksModal(message.success); - удалить
    // statusMessage.textContent = message.success; - удалить
    // setTimeout(() => { - удалить
    // statusMessage.remove(); - удалить
    // }, 2000); - удалить
    //                 form.reset(); - удалить
    //         } else { - удалить
    //                 showThanksModal(message.failure); - удалить
    //         } - удалить
    // }); - удалить
  });
}

class MenuCard2 {
  constructor(name, text, date, parentSelector, ...classes) {
    this.name = name;
    this.text = text;
    this.date = date;
    this.classes = classes;
    this.parent = document.querySelector(parentSelector);
  }

  render2() {
    const element = document.createElement("div");
    if (this.classes.length === 0) {
      this.element = "card_box";
      element.classList.add(this.element);
    } else {
      this.classes.forEach((className) => element.classList.add(className));
    }

    element.innerHTML = `

    <div class="comment mt-4 text-justify float-left">
    <img src="/app/images/icons8-пользователь-100.png" alt="" class="rounded-circle" width="40" height="40">
    <h4>${this.name}</h4>
    <p>${this.date}</p>
    <br>
    <p>${this.text}</p>
</div>



      

      `;
    this.parent.append(element);
  }
}

document.querySelector('input[type="text"]').maxLength = 205;
axios.get("https://lwr1vjxm-3000.euw.devtunnels.ms/requests").then((data) => {
  data.data.forEach(({ name, text, date }) => {
    const newElement = new MenuCard2(name, text, date, " .slider").render2();

    // Инициализировать слайдер с новым элементом
    $(".slider").slick("refresh");

    // Инициализировать слайдер с новым элементом
  });
});

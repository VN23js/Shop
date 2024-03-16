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
    <img src="./images/icons8-пользователь-100.png" alt="" class="rounded-circle" width="40" height="40">
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

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

axios.get("https://lwr1vjxm-3000.euw.devtunnels.ms/table").then((data) => {
  data.data.forEach(({ name, text, date }) => {
    const newElement = new MenuCard2(name, text, date, " .slider").render2();
  });
});

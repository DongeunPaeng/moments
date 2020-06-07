const Tags = (element) => {
  let DOMParent = element;
  let DOMList;
  let DOMInput;
  let dataAttribute;
  let arrayOfList;

  const DOMCreate = () => {
    let ul = document.createElement("ul");
    let input = document.createElement("input");

    DOMParent.appendChild(ul);
    DOMParent.appendChild(input);

    DOMList = DOMParent.firstElementChild;
    DOMInput = DOMParent.lastElementChild;
  };

  const onDelete = (id) => {
    arrayOfList = arrayOfList.filter((currentValue, index) => {
      if (index == id) {
        return false;
      }
      return currentValue;
    });
    DOMRender();
  };

  const DOMRender = () => {
    DOMList.innerHTML = "";
    arrayOfList.forEach((currentValue, index) => {
      let li = document.createElement("li");
      li.innerHTML = `${currentValue} <input type='hidden' name='tags[]' value=${currentValue}><a><button>&times;</button></a>`;
      li.querySelector("a").addEventListener("click", (e) => {
        if (e.offsetX === 0 && e.offsetY === 0) {
          e.preventDefault();
          return false;
        } else {
          onDelete(index);
          let liDelete = e.target.parentNode.parentNode;
          liDelete.remove();
        }
      });
      DOMList.appendChild(li);
      setAttribute();
    });
  };

  const onKeyUp = () => {
    DOMInput.addEventListener("keyup", (e) => {
      let text = e.target.value.trim();
      if (text.includes(",") || e.keyCode === 32) {
        e.preventDefault();
        if (text.search(" ") !== -1) {
          alert("An empty space not allowed. Please use _ instead.");
        } else if (arrayOfList.indexOf(text) !== -1) {
          alert("Can't use duplicate tags");
        } else {
          if (text.replace(",", "") != "") {
            arrayOfList.push(text.replace(",", ""));
            e.target.value = "";
          }
        }
      }
      DOMRender();
    });
  };

  const getAttribute = () => {
    dataAttribute = DOMParent.getAttribute("value");
    dataAttribute = dataAttribute.split(",");
    arrayOfList = dataAttribute.map((currentValue) => {
      return currentValue.trim();
    });
  };

  const setAttribute = () => {
    DOMParent.setAttribute("value", arrayOfList.toString());
  };

  getAttribute();
  DOMCreate();
  DOMRender();
  onKeyUp();
};

(() => {
  let DOMSimpleTags = document.querySelectorAll(".simple-tags");
  DOMSimpleTags = Array.from(DOMSimpleTags);
  DOMSimpleTags.forEach((currentValue) => {
    new Tags(currentValue);
  });
})();

// last part needs refactoring

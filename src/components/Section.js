import { elements } from "../utils/constants";

export class Section {
    constructor({ elements, renderer }, selector) {
      this._container = document.querySelector(selector);

      this._renderer = renderer
      this._elements = elements;
    }
  
    renderItems(elements) {
        elements.forEach(element => {
          this._renderer(element);
        }); 
    }
    addItem(element) {
      this._container.prepend(element.getNode());
    }

    addItemPrepend(element) {
      this._container.prepend(element.getNode())
    }
  
    addItemAppend(element) {
      this._container.append(element)
    }
  }
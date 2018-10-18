import Component from "../../component.js";

export default class ChoiceList extends Component {

  constructor({element, choiceList, onValueChanged}) {
    super({element});

    if (this._element.tagName !== 'SELECT') {
      throw new Error("ChoiceList component requires Select element");
    }

    this._choiceList = choiceList;
    this._onValueChanged = onValueChanged;

    this._render();

    this._element.addEventListener('change', (event) => {
      this._onValueChanged(event.target.value, event.target);
    });
  }

  _render() {
    this._element.innerHTML = `
        ${Object.keys(this._choiceList).map(key => {
           return `<option value="${key}">${this._choiceList[key]}</option>`;
        }).join('')};
    `;
  }

}
import Component from "../../component.js";
import Wrappers from "../utils/wrappers.js";

export default class Search extends Component {

  constructor({element, onInputComplete}) {
    super({element});

    this._onInputComplete = Wrappers.debounce(onInputComplete, 300);

    if (this._element.tagName !== 'INPUT') {
      throw new Error("Search component requires Input element");
    }

    this._element.addEventListener('keyup', (event) => {
      this._handleInputChange(event.target.value, event.target);
    })
  }

  _handleInputChange(query) {
    this._onInputComplete(query);
  }

}
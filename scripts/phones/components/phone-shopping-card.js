import Component from "../../component.js";
import PhoneService from "../services/phone-service.js";

export default class PhoneShoppingCard extends Component {
  constructor({element}) {
    super({element});

    this._phones = new Map();

    this._render();

    this._initRemoveHandler();

  }

  _render() {
    this._element.innerHTML = `
            <p>Shopping Cart <b>(${this._phones.size} in card)</b>
              <a href="#" data-element="remove-all-phones-link">Remove All</a>
            </p>
            <ul>
              ${ Array.from(this._phones.values()).map(phone => {
                return `<li data-element="phone" data-phone-id="${phone.id}">${phone.name}<span data-element="phone-remove" class="shopping-card__remove glyphicon glyphicon-remove"></li>`
              }).join('')}
            </ul>
            <p>${this._phones.length === 0 ? 'Card is empty' : ''}</p>
    `;
  }

  _initRemoveHandler() {
    this._element.addEventListener('click', (event) => {
      let phoneRemoveElement = event.target.closest(
          '[data-element="phone-remove"]');

      if (!phoneRemoveElement) {
        return;
      }

      let phoneId = phoneRemoveElement.closest('[data-element="phone"]').dataset.phoneId;
      this._remove(phoneId);
    });

    this._element.addEventListener('click', (event) => {

      let removeAllPhonesElement = event.target.closest('[data-element="remove-all-phones-link"]');

      if (!removeAllPhonesElement) {
        return;
      }

        this._phones.forEach((value, key) => {
        this._phones.delete(key);
        this._dispatchEvent('shoppingCardPhoneRemoved', key);
      });

      this._render();
    });
  }

  addPhone(phoneId) {
    let phone = PhoneService.getPhone(phoneId);

    this._phones.set(phoneId, phone);
    this._dispatchEvent('shoppingCardPhoneAdded', phoneId);
    this._render();
  }

  _remove(phoneId) {
    this._phones.delete(phoneId);
    console.log(this._phones);
    this._render();
    this._dispatchEvent('shoppingCardPhoneRemoved', phoneId);
  }

  _dispatchEvent(eventName, phoneId) {
    this._element.dispatchEvent(
        new CustomEvent(eventName, {
          detail: {phoneId: phoneId},
          bubbles: true
        })
    );
  }
}
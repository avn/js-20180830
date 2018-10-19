import Component from '../../component.js'
import Collections from "../../common/utils/collections.js";
import Wrappers from "../../common/utils/wrappers.js";
const CLASS_HIDDEN = 'js-hidden';


export default class PhoneCatalog extends Component {
  constructor({element, phones, onShowPhoneDetailsClick, onAddPhoneToShoppingCardClick}) {
    super({element});
    this._phones = phones;
    this._onShowPhoneDetailsClick = onShowPhoneDetailsClick;
    this._onAddPhoneToShoppingCardClick = onAddPhoneToShoppingCardClick;
    this._getComparator = Wrappers.cacheble(Collections.createComparator);

    this._render();

    this._emptyMessageElement = this._element.querySelector(
        '[data-element="empty-message"]');

    this._element.addEventListener('click', (event) => {
      this._onPhoneClick(event);
    });

    document.addEventListener('shoppingCardPhoneAdded', (event) => {
      this._disableAddPhoneToShoppingCardButton(event.detail.phoneId);
    });

    document.addEventListener('shoppingCardPhoneRemoved', (event) => {
      this._enableAddPhoneToShoppingCardButton(event.detail.phoneId);
    });
  }

  _onPhoneClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!phoneElement) {
      return;
    }

    this._handleShowPhoneDetailsClick(event, phoneElement);
    this._addPhoneToShoppingCardClick(event, phoneElement);
  }

  _handleShowPhoneDetailsClick(event, phoneElement) {
    let phoneDetailsLinkElement = event.target.closest('[data-element="phone-details-link"]');
    if (phoneDetailsLinkElement) {
      event.preventDefault();
      this._onShowPhoneDetailsClick(phoneElement.dataset.phoneId);
    }
  }

  _addPhoneToShoppingCardClick(event, phoneElement) {
    let phoneAddButtonElement = event.target.closest('[data-element="phone-add-to-shopping-card-button"]');
    if (phoneAddButtonElement) {
      this._onAddPhoneToShoppingCardClick(phoneElement.dataset.phoneId);
    }
  }

  _disableAddPhoneToShoppingCardButton(phoneId) {
    console.log('disable:' +phoneId);
    this._element.querySelector(`[data-phone-id="${phoneId}"] [data-element="phone-add-to-shopping-card-button"]`).classList.toggle(CLASS_HIDDEN, true);
  }


  _enableAddPhoneToShoppingCardButton(phoneId) {
    console.log('enable:' +phoneId);
    this._element.querySelector(`[data-phone-id="${phoneId}"] [data-element="phone-add-to-shopping-card-button"]`).classList.toggle(CLASS_HIDDEN, false);
  }

  filter(query, serverSide) {
    query = query.toLowerCase();

    if (serverSide) {
      this._doFilterOnServerSide(query);
    } else {
      this._doFilterOnClientSide(query);
    }
  }

  _doFilterOnClientSide(query) {
    let hiddenPhonesCount = 0;
    this._phones.forEach(phone => {
      let isToHide = !phone.name.toLowerCase().includes(query);

      if (isToHide) {
        hiddenPhonesCount++;
      }

      this._element.querySelector(`[data-phone-id="${phone.id}"]`)
      .classList
      .toggle(CLASS_HIDDEN, isToHide);

    });

    this._emptyMessageElement.classList.toggle(CLASS_HIDDEN,
        hiddenPhonesCount !== this._phones.length);
  }

  _doFilterOnServerSide(query) {
    //TODO: send query to server
  }

  sort(fieldName, serverSide) {
    if (serverSide) {
      this._doSortOnServerSide(fieldName);
    } else {
      this._doSortOnClientSide(fieldName);
    }
  }

  _doSortOnClientSide(fieldName) {

    let ul = this._element.firstElementChild;

    this._phones
    .sort(this._getComparator(fieldName))
    .forEach((phone) => {
      ul.appendChild(this._element.querySelector(`[data-phone-id="${phone.id}"]`));
    });
  }

  _doSortOnServerSide(fieldName) {
    //TODO: send sorting query to server
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
          <li
            class="thumbnail"
            data-element="phone"
            data-phone-id="${ phone.id }"
          >
            <a href="#!/phones/${ phone.id }" class="thumb" data-element="phone-details-link">
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div data-element="phone-add-to-shopping-card-button" class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
                Add
              </a>
            </div>
  
            <a href="#!/phones/${ phone.id }" data-element="phone-details-link">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        `).join('') }
      </ul>
      <p data-element="empty-message" class="${CLASS_HIDDEN}">Phones not found</p>
    `;
  }
}

import Component from '../../component.js'

const CLASS_HIDDEN = 'js-hidden';

export default class PhoneCatalog extends Component {
  constructor({element, phones, onPhoneSelected}) {
    super({element});

    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;

    this._render();

    this._element.addEventListener('click', (event) => {
      this._onPhoneClick(event);
    });

    this._emptyMessageElement = this._element.querySelector('[data-element="empty-message"]');
  }

  _onPhoneClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!phoneElement) {
      return;
    }

    this._onPhoneSelected(phoneElement.dataset.phoneId)
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

    this._emptyMessageElement.classList.toggle(CLASS_HIDDEN, hiddenPhonesCount !== this._phones.length);
  }

  _doFilterOnServerSide(query) {
    //TODO: send query to server
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
            <a href="#!/phones/${ phone.id }" class="thumb">
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success">
                Add
              </a>
            </div>
  
            <a href="#!/phones/${ phone.id }">${ phone.name }</a>
            <p>${ phone.snippet }</p>
          </li>
        `).join('') }
      </ul>
      <p data-element="empty-message" class="${CLASS_HIDDEN}">Phones not found</p>
    `;
  }
}

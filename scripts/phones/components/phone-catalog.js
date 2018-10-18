import Component from '../../component.js'

export default class PhoneCatalog extends Component {
  constructor({ element, phones, onPhoneSelected }) {
    super({ element });

    this._phones = phones;
    this._onPhoneSelected = onPhoneSelected;

    this._render();

    this._element.addEventListener('click', (event) => {
      this._onPhoneClick(event);
    });
  }

  _onPhoneClick (event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    if (!phoneElement) {
      return;
    }

    this._onPhoneSelected(phoneElement.dataset.phoneId)
  }

  filter(query) {
    query = query.toLowerCase();
    this._phones.forEach(phone => {

      this._element.querySelector(`[data-phone-id="${phone.id}"]`).classList.toggle('js-hidden',  !phone.name.toLowerCase().includes(query));

    });
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
    `;
  }
}

import api from './converterApi.js';

const setError = (string) => {
    $('#error-box').html(`<h2>${string}</h2>`);
};

const resetError = () => {
    $('#error-box').html('');
};

const updateTextbox = (to, from, base_amount, target_amount) => {
    $('#text-box').html(`<h2>${base_amount} ${from}, is ${target_amount.toFixed(2)} ${to}</h2>`)
};

const renderForm = () => {
    let optionArray = ['USD', 'JPY', 'BGN', 'CZK', 'DKK', 'GBP', 'HUF', 'PLN', 'RON', 'SEK', 'CHF', 'ISK', 'NOK', 'HRK', 'RUB', 'TRY', 'AUD', 'BRL', 'CAD', 'CNY', 'HKD', 'IDR', 'ILS', 'INR', 'KRW', 'MXN', 'MYR', 'NZD', 'PHP', 'SGD', 'THB', 'ZAR'];
    let selectOptions = optionArray.map(currency => {
        return `<option value=${currency}>${currency}</option>`;
    });

    $('#currency-form').html(`
            <label for="from">Convert from: </label>
            <select name="from" id="from">
                ${selectOptions}
            </select>

            <label for="to">Convert to: </label>
            <select name="to" id="to">
                ${selectOptions}
            </select>

            <label for="amount">Amount: </label>
            <input type="number" id="amount" step="0.01">
            
            <button type="button" id="swap">Swap</button>
            <button type="submit">Submit</button>
        `);
};


const listen = () => {
    formSwapListener();
    formSubmitListener();
};

const formSwapListener = () => {
    $('#currency-form').on('click', '#swap', e => {
        let form = e.delegateTarget;

        let from = form.from.value;
        form.from.value = form.to.value;
        form.to.value = from;
    });
};

const formSubmitListener = () => {
    $('#currency-form').on('submit', e => {
        e.preventDefault();
        let to = e.target.to.value;
        let from = e.target.from.value;
        let amount = parseFloat(e.target.amount.value);

        if (amount > 0) {
            api.submit(to, from, amount)
                .then((data) => {
                    updateTextbox(to, from, amount, data.target_amount);
                    resetError();
                })
        } else {
            setError('The amount must be greater than 0.');
        }
    });
};


export default {
    renderForm,
    listen
};
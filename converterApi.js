
const submit = (to, from, amount) => {
    let bodyJson = {
        base_currency: from,
        base_amount: amount,
        target_currency: to
    };

    return fetch('https://aedan-currency-converter.herokuapp.com/convert', {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(bodyJson)
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            return data;
        });
};


export default {
    submit,
};
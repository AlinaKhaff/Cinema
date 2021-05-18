const name1Field = document.querySelector('#block08-form   input[name="name1"]').parentNode;
const email1Field = document.querySelector('#block08-form   input[name="email1"]').parentNode;
const selectPlace = document.getElementById('place-numbers')
const reviewField = document.querySelector('#block08-form   input[name="review"]').parentNode;
const form = document.getElementById('feedback-form');

const ERROR_CLASS_NAME = 'st-input1_error';
const FOCUCED_CLASS_NAME = 'st-input1_focused';
const SELECT_SELECTED = 'input-select-selected';

function initalizeField(field) {
    const input = field.getElementsByTagName('input')[0];
    const fieldError = field.querySelector('.st-input1__error-msg');

  reset();
  

    function clearError() {
        field.classList.remove(FOCUCED_CLASS_NAME);
        fieldError.innerText = '';
    }


    input.addEventListener('focus', function () {
        field.classList.add(FOCUCED_CLASS_NAME);
    })

    input.addEventListener('blur', () => {
        if (!input.value) {
            field.classList.remove(FOCUCED_CLASS_NAME);
        }
    })
    input.addEventListener('input', ()=> {
        clearError();
    })

    function reset () {
        input.value = '';
        field.classList.remove(ERROR_CLASS_NAME);
        clearError();
    }

    return {
        addError(errorText) {
            field.classList.add(ERROR_CLASS_NAME);
            fieldError.innerText = errorText;
        },
        getValue() {
            return input.value
        },
        focus() {
            input.focus()
        },
        reset:reset

    }
}
    initalizeField(name1Field);
    initalizeField(email1Field);
    initalizeField(reviewField);


    selectPlace.addEventListener('change', () => {
        selectPlace.classList.add('input-select-selected');
    })


    function handleSubmit(event) {
        const name1Value = name1FieldUtils.getValue();
        const email1Value = email1Fieldutils.getValue();
        const reviewValue = reviewFieldutils.getValue();
        


        if (!name1Value) {
            name1FieldUtils.addError('Необходимо указать имя');
            return;

        }
        if (!email1Value) {
            email1FieldUtils.addError('Необходимо указать email');
            return;

        }
    
        if (selectPlace.value === 'none') {
            selectPlace.classList.add('ERROR_CLASS_NAME');
            return;

        }
        if (!reviewValue) {
            reviewFieldUtils.addError('Необходимо указать email');
            return;

        }
        event.preventDefault();


        const data = {
            name: name1Value,
            email: email1Value,
            prize: selectPlace.value
        };

        const url = new URL('http://inno-ijl.ru/multystub/stc-21-03/feedback');
        url.search = new URLSearchParams(data).toString();

        fetch(url.toString())
        .then(data=> data.json())
        .then((data)=> {
           
            name1FieldUtils.reset();
            email1FieldUtils.reset();
            reviewFieldUtils.reset();

        });

    }

    form.addEventListener('submit', handleSubmit);
  
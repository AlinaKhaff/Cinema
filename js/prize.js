const openBtn = document.getElementById('btn-prize-open');
const popup = document.querySelector('#prize-popup');
const closeBtn = document.querySelector('#prize-popup__close');
const nameField = document.querySelector('#prize-popup input[name="name"]').parentNode;
const emailField = document.querySelector('#prize-popup input[name="email"]').parentNode;
const selectPrize = document.getElementById('chooze-prize')
const form = document.getElementById('prize-form');


function popupTooggle() {
    popup.classList.toggle('hidden');
}

const ERROR_CLASS_NAME = 'st-input1_error';
const FOCUCED_CLASS_NAME = 'st-input1_focused';
const SELECT_SELECTED = 'input-select-selected';

function initalizeField(field) {
    const input = field.getElementsByTagName('input')[0];
    const fieldError = field.querySelector('.st-input1__error-msg');

    reset();

    input.value = '';
    field.classList.remove(ERROR_CLASS_NAME);
    field.classList.remove(FOCUCED_CLASS_NAME);
    fieldError.innerText = '';


    // input.onfocus = function () {
    //     field.classList.add(FOCUCED_CLASS_NAME);
    // }

    // input.onblur = () => {
    //     if (!input.value) {
    //         field.classList.remove(FOCUCED_CLASS_NAME);
    //     }
    // }

    // return {
    //     getValue() {
    //         return input.value
    //     }
    // }

    function clearError() {
        field.classList.remove(ERROR_CLASS_NAME);
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
    input.addEventListener('input', () => {
        clearError();
    })

    function reset() {
        input.value = '';
        field.classList.remove(ERROR_CLASS_NAME);
        field.classList.remove(FOCUCED_CLASS_NAME);
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
        reset: reset

    }
}


const nameFieldUtils = initalizeField(nameField);
const emailFieldUtils = initalizeField(emailField);


openBtn.addEventListener('click', () => {
    popupTooggle();
    nameFieldUtils.focus();
});
selectPrize.addEventListener('change', () => {
    selectPrize.classList.add('input-select-selected');
})
closeBtn.onclick = popupTooggle;

function handleSubmit(event) {
    event.preventDefault();
    const nameValue = nameFieldUtils.getValue();
    const emailValue = emailFieldUtils.getValue();


    if (!nameValue) {
        nameFieldUtils.addError('Необходимо указать имя');
        return;

    }
    if (!emailValue) {        
        emailFieldUtils.addError('Необходимо указать email');
        return;
    } else {
       
        if(emailValue.indexOf('@') === -1 &&  emailValue.indexOf('.') === -1) {
            emailFieldUtils.addError('Невалидный  email');
            return;
        }
    }
    if (selectPrize.value === 'none') {
        selectPrize.classList.add(ERROR_CLASS_NAME);
        return;
    } 
    const data = {
        name: nameValue,
        email: emailValue,
        prize: selectPrize.value
    };

    const url = new URL('http://inno-ijl.ru/multystub/stc-21-03/feedback');
    url.search = new URLSearchParams(data).toString();

    fetch(url.toString())
        .then(data => data.json())
        .then((data) => {
            popupTooggle();
            nameFieldUtils.reset();
            emailFieldUtils.reset();
            selectPrize.value = 'none';
            selectPrize.classList.remove(SELECT_SELECTED);
        });

}

form.addEventListener('submit', handleSubmit);
const name1Field = document.querySelector('#block08-form input[name="name"]').parentNode;
const email1Field = document.querySelector('#block08-form input[name="email"]').parentNode;
const selectPlace = document.getElementById('place-numbers');
const reviewField = document.querySelector('#block08-form textArea[name="review"]').parentNode;
const form1 = document.getElementById('feedback-form');
const ERROR_CLASS_NAME1 = 'st-input1_error';
const FOCUCED_CLASS_NAME1 = 'st-input1_focused';
const SELECT_SELECTED1 = 'input-select-selected';

function initalizeField(field) {
  const input1 = field.getElementsByTagName('input')[0] ? field.getElementsByTagName('input')[0] : field.getElementsByTagName('textArea')[0];
  const fieldError1 = field.querySelector('.st-input1__error-msg');
  reset();
  input1.value = '';
  field.classList.remove(ERROR_CLASS_NAME1);
  field.classList.remove(FOCUCED_CLASS_NAME1);
  fieldError1.innerText = '';

  function clearError() {
    field.classList.remove(ERROR_CLASS_NAME1);
    fieldError1.innerText = '';
  }

  input1.addEventListener('focus', function () {
    field.classList.add(FOCUCED_CLASS_NAME1);
  });
  input1.addEventListener('blur', () => {
    if (!input1.value) {
      field.classList.remove(FOCUCED_CLASS_NAME1);
    }
  });
  input1.addEventListener('input', () => {
    clearError();
  });

  function reset() {
    input1.value = '';
    field.classList.remove(ERROR_CLASS_NAME1);
    field.classList.remove(FOCUCED_CLASS_NAME1);
    clearError();
  }

  return {
    addError(errorText) {
      field.classList.add(ERROR_CLASS_NAME1);
      fieldError1.innerText = errorText;
    },

    getValue() {
      return input1.value;
    },

    focus() {
      input1.focus();
    },

    reset: reset
  };
}

const name1FieldUtils = initalizeField(name1Field);
const email1FieldUtils = initalizeField(email1Field);
const reviewFieldUtils = initalizeField(reviewField);
selectPlace.addEventListener('change', () => {
  selectPlace.classList.add('input-select-selected');
});

function handleSubmit(event) {
  event.preventDefault();
  const name1Value = name1FieldUtils.getValue();
  const email1Value = email1FieldUtils.getValue();
  const reviewValue = reviewFieldUtils.getValue();

  if (!name1Value) {
    name1FieldUtils.addError('Необходимо указать имя');
    return;
  }

  if (!email1Value) {
    email1FieldUtils.addError('Необходимо указать email');
    return;
  } else {
    if (email1Value.indexOf('@') === -1 && email1Value.indexOf('.') === -1) {
      email1FieldUtils.addError('Невалидный  email');
      return;
    }
  }

  if (selectPlace.value === 'none') {
    selectPlace.classList.add(ERROR_CLASS_NAME1);
    return;
  }

  if (!reviewValue) {
    reviewFieldUtils.addError('Необходимо добавить отзыв');
    return;
  } // const data = {
  //     name: name1Value,
  //     email: email1Value,
  //     select: selectPlace.value
  // };


  const data = new FormData(document.getElementById('feedback-form'));
  $.ajax({
    url: 'http://study.xeol.ru/api/new_order',
    type: 'post',
    data: data,
    dataType: 'json',
    success: function (msg) {
      $('.success-result').html(msg.success);
      $.fancybox.open({
        src: '.modal-success',
        type: 'inline'
      });
      name1FieldUtils.reset();
      email1FieldUtils.reset();
      reviewFieldUtils.reset();
      selectPlace.value = 'none';
      selectPlace.classList.remove(SELECT_SELECTED);
    },
    error: function (msg) {
      $('.ajax-loader').hide();
      showErrors(msg);
      name1FieldUtils.reset();
      email1FieldUtils.reset();
      reviewFieldUtils.reset();
      selectPlace.value = 'none';
      selectPlace.classList.remove(SELECT_SELECTED);
    },
    cache: false,
    contentType: false,
    processData: false
  });

  function showErrors(msg) {
    $('#feedback-form input, #feedback-form select').each(function () {
      for (let i in msg.responseJSON.errors) {
        if (i == $(this).attr('name')) {
          let parent = $(this).closest('.st-input1');
          if (!parent.lenght) parent = $(this).closest('.input-wrap');
          if (!parent.lenght) parent = $(this).closest('.st-checkbox');
          parent.addClass('st-input1_error');

          for (let j in msg.responseJSON.errors[i]) {
            parent.append('<p class="st-input_error-msg">' + msg.responseJSON.errors[i][j] + '</p>');
          }
        }
      }
    });
  } // const url = new URL('http://inno-ijl.ru/multystub/stc-21-03/feedback');
  // url.search = new URLSearchParams(data).toString();
  // fetch(url.toString())
  //     .then(data => data.json())
  //     .then((data) => {
  //         name1FieldUtils.reset();
  //         email1FieldUtils.reset();
  //         reviewFieldUtils.reset();
  //         selectPlace.value = 'none';
  //         selectPlace.classList.remove(SELECT_SELECTED);
  //     });

}

form1.addEventListener('submit', handleSubmit);
//# sourceMappingURL=feedback.js.map
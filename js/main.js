
 
  
// const toTopElement = document.querySelector ('.to_top');

// toTopElement.addEventListener('click', function () {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     })
// })

$('.to_top:first').click(function () {
    $('html').animate({ scrollTop: 0 }, 3000);
});

// $('.block01__lang-dropdown:first').slideUp(0)

let lngOpened = false;
$('.dropdown-trigger').on('click', function() {
    console.log('click');
    $('.dropdown-list:first').slideToggle();
    lngOpened = !lngOpened;
    $(this).find('svg').css({
        transform: `rotate(${lngOpened ? 180 : 0 }deg)`,
        'transform-origin': '50% 50%'
    })
})
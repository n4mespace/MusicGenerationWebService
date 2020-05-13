'use_strict';


window.onload = (() => {
    const topArea = document.getElementById('top');
    // const menu = document.getElementById('menu_btn');

    topArea.addEventListener('mouseenter', (event) => {  
        event.target.click(); 
    })
    topArea.addEventListener('mouseover', (event) => {
        event.target.click();
    })

    musicGenres = document.querySelectorAll('.btn-secondary');

    // musicGenres.forEach((elem) => {
    //   elem.addEventListener('mousedown', animation.userStart.bind(animation), false);
    // }); 
})();
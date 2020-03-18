function fitElementToParent(el, padding) {
    let timeout = null;
    function resize() {
        if (timeout) clearTimeout(timeout);
        anime.set(el, {scale: 1});
        const pad = padding || 0; 
        const parentEl = el.parentNode;
        const elOffsetWidth = el.offsetWidth - pad;
        const parentOffsetWidth = parentEl.offsetWidth;
        const ratio = parentOffsetWidth / elOffsetWidth;
        timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}
  
window.onload = (function() {
    const sphereEl = document.querySelector('.sphere-animation');
    const spherePathEls = sphereEl.querySelectorAll('.sphere path');
    const pathLength = spherePathEls.length;
    let hasStarted = false;
    let aimations = [];
    const topArea = document.getElementById('top');
    const menu = document.getElementById('menu_btn');

    fitElementToParent(sphereEl);
  
    let breathAnimation = anime({
        begin: function() {
            for (let i = 0; i < pathLength; i++) {
                aimations.push(anime({
                    targets: spherePathEls[i],
                    stroke: {
                        value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'], 
                        duration: 500
                    },
                    translateX: [2, -4],
                    translateY: [2, -4],
                    easing: 'easeOutQuad',
                    autoplay: false
                }));
            }
        },
        update: function(ins) {
            aimations.forEach(function(animation, i) {
                const percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
                animation.seek(animation.duration * percent);
            });
        },
        duration: Infinity,
        autoplay: false
    });
  
    const introAnimation = anime.timeline({
        autoplay: false
    }).add({
        targets: spherePathEls,
        strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 3900,
            easing: 'easeOutQuad',
            delay: anime.stagger(190, {direction: 'reverse'})
        },
        duration: 2000,
        delay: anime.stagger(60, {direction: 'reverse'}),
        easing: 'linear'
        }, 0);

    const shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
      }, 0);
  
    function randomValues() {
        anime({
            targets: sphereEl,
            easing: 'easeInOutQuad',
            duration: 250,
            scale: [
                {value: 0.9, easing: 'easeOutSine', duration: 2000},
                {value: 1.3, easing: 'easeInOutQuad', duration: 2600}
              ],
            complete: randomValues
        });
      }

    function init() {
        introAnimation.play();
        breathAnimation.play();
        shadowAnimation.play();
        randomValues();

        topArea.onmouseover = () => {  
            menu.click(); 
        }
        topArea.onmouseleave = () => { 
            menu.click();
        }  
    }
    init();  
})();
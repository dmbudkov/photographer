function desktop() {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if ((navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i))
        && width <= 768) {
        document.querySelector('#app-holder').classList.add('mobile');
        window.localStorage.setItem('isDesktopView', false);
    } else {
        window.localStorage.setItem('isDesktopView', true);
    }
}
desktop();



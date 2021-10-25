document.addEventListener('DOMContentLoaded', function(){
    let timedOutErrorElem = document.querySelector('.error');
    if (timedOutErrorElem.innerHTML !== ''){
        setTimeout(function(){
            timedOutErrorElem.innerHTML = '';
        }, 3000);
    };
});
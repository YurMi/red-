//======================  Menu_burger  ================================================
const meny__burger = document.querySelector('.meny__burger');
const menu = document.querySelector('.menu');
if (meny__burger) {
    meny__burger.addEventListener("click", function (e) {
        document.body.classList.toggle('lock');
        meny__burger.classList.toggle('active');
        menu.classList.toggle('active');
    })
}
//=========================== Send Form ======================================================================================================================================
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);

        //Если поля заполнены, отправляем форму
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.massege);
                form.Preview.innertHTML = '';
                form.resent();
                form.classList.remove('_sending');
            } else {
                alert('Error');
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля :)')
        }
    }

    function formValidate(form) {
        let error = 0;
        let formRed = document.querySelectorAll('._req');

        for (let i = 0; i < formRed.length; i++) {
            const input = formRed[i];
            formRemoveError(input);
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value == '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    //Функция теста Имэйла
    function emailTest(input) {
        return !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(input.value);
    }

})


//======================== Прокрутка до Секции =========================================================================================================================================
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLinks => {
        menuLinks.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

            window.scrollTo({
                top: gotoBlockValue + (-12),
                behavior: 'smooth',
            });
            e.preventDefault();
        }
    }
}
fetch('input.txt')
    .then(r => r.text())
    .then(t => document.querySelector('textarea').value = t)


const formToggle = (e) => {
    const form = e.target.parentNode.nextElementSibling;
    e.target.classList.toggle("active");
    if (form.style.display === 'none') {
        form.style.display = 'block'

    } else {
        form.style.display = 'none';
    }
}

document.querySelector('section a').addEventListener('click', formToggle, true)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('nav ul li a');
const ul = document.querySelector('ul');

hamburger.addEventListener('click',()=>{
    ul.classList.toggle('ham_active');

    let ham_child = hamburger.firstElementChild;
    if(ul.classList.contains('ham_active')){
        ham_child.classList.replace('fa-bars','fa-xmark');
    }
    else{
        ham_child.classList.replace('fa-xmark','fa-bars');
    }
})

// Active link logic
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
}); 

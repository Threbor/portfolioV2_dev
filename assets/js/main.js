/*===== MENU SHOW ====*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 100,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{});
sr.reveal('.about_shadow, .about__subtitle, .about__text, .about_shadow, .contact_text',{delay: 400});
sr.reveal('.home__img',{delay: 600});
sr.reveal('.home__social-icon, .bx-rocket, .project__social-icon',{ interval: 200});
sr.reveal('.work__card, .contact__input, .contact__form label, .button',{interval: 200});
sr.reveal('.skills__data',{interval: 100});

// projects
sr.reveal('.banner__text, .section-title, .project__container, #youtube_icon',{ interval: 200});

// contact form

const contactForm = document.getElementById('contact-form');
// const senderNames = document.getElementById('sender-names').value
const contactGreetings = document.getElementById('contact-geetings');
const contactMessage = document.getElementById('contact-message');
const popupMessage = document.getElementById('popup-message');
const submitButton = document.getElementById('submit-button');


window.onload = function() {
  contactForm.addEventListener('submit', function(event) {
      submitButton.classList.add('disabled')
      event.preventDefault();
      const senderNames = document.getElementById('sender-names').value
      // generate a five digit number for the contact_number variable
      this.contact_number.value = Math.random() * 100000 | 0;
      // these IDs from the previous steps
      emailjs.sendForm('service_y894zb9', 'template_f6xsmu7', this, 'tCrSFgEm6pbHr-AOm')
          .then(function() {
              console.log('SUCCESS!');
              contactGreetings.textContent = `Bienvenue ${senderNames}!`;
              contactMessage.textContent = `✅ Votre message a bien été envoyé! Je vous répondrai dès que possible.`;

              // permet l'animation du popup
              popupMessage.classList.add('show_popup');
              setTimeout(function(){
                popupMessage.classList.remove('show_popup');
              }, 5000);

              // réinitialise le formulaire
              setTimeout(() => {
                contactForm.reset();
              }, 5000);

          }, function(error) {
            // message d'erreur en cas d'échec de emailJS
              console.log('FAILED...', error);
              contactGreetings.textContent = `Bonjour ${senderNames}. Il y a eu une erreur lors de l'envoi!`;
              contactMessage.textContent = "Je vous prie de bien vouloir essayer ultérieurmeent.";
          });

      setTimeout(() => {
        submitButton.classList.remove('disabled');
      }, 6200);
  });
}

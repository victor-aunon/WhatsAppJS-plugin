import data from './contactData.js';

// Selectors
const whatsappContainer = document.querySelector('#whatsapp-contact'),
    contactButton = document.querySelector('#contact-button'),
    whatsappIcon = document.querySelector('#whatsapp-icon'),
    whatsappButtonImg = document.querySelector('#button-img'),
    timetableTitleText = document.querySelector('#timetable-title'),
    timetableText = document.querySelector('#timetable'),
    message = document.querySelector('#message'),
    messageExpanded = document.querySelector('#message-expanded'),
    contactButtonContainer = document.querySelector('#contact-container'),
    contactSubtitle = document.querySelector('.contact-subtitle');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (whatsappContainer.classList.contains('inactive')) {
            whatsappContainer.classList.remove('inactive');
            whatsappContainer.classList.add('active');
            contactButton.lastChild.textContent = `${data.name}`;
            setWhatsAppCall(`${data.phone}`);
        }
    }, 10);
});

function setWhatsAppCall(phone) {
    if (navigator.userAgent.toLowerCase().includes('win')) {
        contactButton.href = 'whatsapp://send/?phone=' + phone;
    } else if (navigator.userAgent.toLowerCase().includes('android')) {
        contactButton.href = 'https://wa.me/' + phone;
    } else {
        contactButton.href = 'https://wa.me/' + phone;
    }
}

message.addEventListener('click', event => {
    event.preventDefault();

    if (message.classList.contains('active')) {
        // Hide message
        message.classList.remove('active');
        message.classList.add('inactive');
        // Show messageExpanded
        messageExpanded.classList.remove('inactive');
        messageExpanded.classList.add('active');
        // Change background to green and white
        whatsappContainer.classList.add('expanded');
        // Show contact button during the working time
        contactButtonContainer.classList.remove('inactive');
        contactButtonContainer.classList.add('active');
        manageTimetable();
        // Change whatsapp icon image
        whatsappButtonImg.src = '../img/close.png';
        whatsappButtonImg.classList.add('expanded');
    }
});

function manageTimetable() {
    const now = new Date();
    const day = now.getUTCDay();
    const hour = now.getUTCHours();

    if (!data.daysOpen.includes(day)) {
        // Hide contact instructions
        contactSubtitle.classList.remove('active');
        contactSubtitle.classList.add('inactive');
        // Hide contact button
        contactButton.classList.remove('active');
        contactButton.classList.add('inactive');
        // Show timetable
        timetableTitleText.classList.remove('inactive');
        timetableTitleText.classList.add('active');
        timetableTitleText.textContent =
            'Lo sentimos, hoy no estamos disponibles';
        timetableText.classList.remove('inactive');
        timetableText.classList.add('active');
        timetableText.innerHTML = `Inténtalo de <strong>${data.timeOpenTextDays}</strong></br>de <strong>${data.timeOpenTextHours}</strong> horas`;
    } else {
        if (!data.timeOpenUTC.includes(hour)) {
            // Hide contact instructions
            contactSubtitle.classList.remove('active');
            contactSubtitle.classList.add('inactive');
            // Hide contact button
            contactButton.classList.remove('active');
            contactButton.classList.add('inactive');
            // Show timetable
            timetableTitleText.classList.remove('inactive');
            timetableTitleText.classList.add('active');
            timetableTitleText.textContent = 'En breve estamos disponibles';
            timetableText.classList.remove('inactive');
            timetableText.classList.add('active');
            timetableText.innerHTML = `Inténtalo de <strong>${data.timeOpenTextHours}</strong> horas`;
        }
    }
}

whatsappIcon.addEventListener('click', event => {
    event.preventDefault();

    if (message.classList.contains('inactive')) {
        // Change whatsapp icon image
        whatsappButtonImg.src = '../img/whatsapp.png';
        whatsappButtonImg.classList.remove('expanded');
        // Hide contact container
        contactButtonContainer.classList.remove('active');
        contactButtonContainer.classList.add('inactive');
        // Change background to white
        whatsappContainer.classList.remove('expanded');
        // Hide messageExpanded
        messageExpanded.classList.remove('active');
        messageExpanded.classList.add('inactive');
        // Show message
        message.classList.remove('inactive');
        message.classList.add('active');
    }
});

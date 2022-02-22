import data from './wapContactData.js';

// Selectors
const wapSmallBtn = document.querySelector('#wap-mini-button'),
    wapToggleBtn = document.querySelector('#wap-toggle-button'),
    wapBox = document.querySelector('#wap-box'),
    wapTitleText = document.querySelector('#wap-title'),
    wapSubtitleText = document.querySelector('#wap-subtitle'),
    wapContact = document.querySelector('#wap-contact-data'),
    wapContactBtn = document.querySelector('#wap-contact-button'),
    wapTimetableTitle = document.querySelector('#wap-timetable-title'),
    wapTimetableSubtitle = document.querySelector('#wap-timetable-subtitle');

// Event listeners

// Show main box when small button is clicked
wapSmallBtn.addEventListener('click', () => {
    if (wapSmallBtn.classList.contains('wap-active')) {
        // Hide small button
        wapSmallBtn.classList.remove('wap-active');
        wapSmallBtn.classList.add('wap-inactive');
        // Show main box
        wapBox.classList.remove('wap-inactive');
        wapBox.classList.add('wap-active');
        // Set custom messages
        wapTitleText.textContent = data.titleText;
        wapSubtitleText.textContent = data.subtitleText;
    }
});

// Hide main box when close button is clicked
wapToggleBtn.addEventListener('click', () => {
    // Hide main box
    wapBox.classList.remove('wap-active');
    wapBox.classList.add('wap-inactive');
    // Show small button
    wapSmallBtn.classList.remove('wap-inactive');
    wapSmallBtn.classList.add('wap-active');

    if (wapBox.classList.contains('wap-expanded')) {
        wapBox.classList.remove('wap-expanded');
        wapContact.classList.remove('wap-visible');
        wapContact.classList.add('wap-hidden');
    }

    // Collapse contact data panel
    wapContact.style.maxHeight = 0;
    // Set contact instructions visible again
    wapSubtitleText.style.display = 'block';
});

// Show contact info
wapSubtitleText.addEventListener('click', () => {
    wapBox.classList.add('wap-expanded');
    // Change box bar texts
    switchBoxBarContent();
    // Set Contact data
    wapContactBtn.innerHTML = `
        <img src="img/wap_whatsapp.png" alt="WhatsApp icon"> ${data.name}
    `
    setWhatsAppCall(data.phone);
    // Display contact info according to day and hour
    manageTimetable();
    // Show contact data panel
    wapContact.classList.remove('wap-hidden');
    wapContact.style.maxHeight = wapContact.scrollHeight + 7 + 'px';
});

// Functions
function setWhatsAppCall(phone) {
    if (navigator.userAgent.toLowerCase().includes('win')) {
        wapContactBtn.href = 'whatsapp://send/?phone=' + phone;
    } else if (navigator.userAgent.toLowerCase().includes('android')) {
        wapContactBtn.href = 'https://wa.me/' + phone;
    } else {
        wapContactBtn.href = 'https://wa.me/' + phone;
    }
}

function switchBoxBarContent() {
    if (wapBox.classList.contains('wap-expanded')) {
        wapTitleText.textContent = data.titleTextOnExpanded;
        wapSubtitleText.textContent = data.subtitleTextOnExpanded;
    }
}

function manageTimetable() {
    const now = new Date();
    const day = now.getUTCDay();
    const hour = now.getUTCHours();

    if (!data.daysOpen.includes(day)) {
        // Hide contact instructions
        wapSubtitleText.style.display = 'none';
        // Hide contact button
        wapContactBtn.style.display = 'none';
        // Show timetable
        wapTimetableTitle.textContent = data.messageNotAvailable;
        wapTimetableTitle.style.display = 'block';
        wapTimetableSubtitle.innerHTML = `Inténtalo de <strong>${data.timeOpenTextDays}</strong></br>de <strong>${data.timeOpenTextHours}</strong> horas`;
        wapTimetableSubtitle.style.display = 'block';
    } else {
        if (!data.timeOpenUTC.includes(hour)) {
            // Hide contact instructions
            wapSubtitleText.style.display = 'none';
            // Hide contact button
            wapContactBtn.style.display = 'none';
            // Show timetable
            wapTimetableTitle.textContent = data.messageSoonAvailable;
            wapTimetableTitle.style.display = 'block';
            wapTimetableSubtitle.innerHTML = `Inténtalo de <strong>${data.timeOpenTextHours}</strong> horas`;
            wapTimetableSubtitle.style.display = 'block';
        }
    }
}

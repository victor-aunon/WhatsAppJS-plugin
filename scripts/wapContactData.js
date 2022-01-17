const data = {
    name: 'My name',
    phone: 'My phone preceded by the country phone code',
    titleText: '¿Quieres hacerme una pregunta?',
    subtitleText: 'Haz clic aquí para hablar conmigo por Whatsapp',
    titleTextOnExpanded: 'Pregúntame cualquier duda',
    subtitleTextOnExpanded:
        'Haz clic abajo para abrir WhatsApp y hablar conmigo directamente',
    messageNotAvailable: 'Lo siento, hoy no estoy disponible',
    messageSoonAvailable: 'En breve estaré disponible',
    // 0 is Sunday, 1 is Monday...
    daysOpen: [...Array(7).keys()],
    // Each hour includes from 0 to 59 minutes. UTC time
    timeOpenUTC: [...Array(24).keys()],
    timeOpenTextDays: 'Todos los días',
    timeOpenTextHours: 'A cualquier hora',
};

export default data;

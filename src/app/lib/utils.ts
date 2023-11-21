const DATE_FORMAT = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Monterrey',
});

export function formatDate(date: Date): string {
    return DATE_FORMAT.format(new Date(date));
}
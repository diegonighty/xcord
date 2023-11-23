const DATE_FORMAT = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Monterrey',
});

export function formatDate(date: Date | undefined): string {
    if (!date) return DATE_FORMAT.format(new Date());

    return DATE_FORMAT.format(new Date(date));
}
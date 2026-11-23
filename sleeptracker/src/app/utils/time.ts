
// date formated as year-month-datetime
export function toLocalISO(d: Date): string{
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
}   

export function sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}


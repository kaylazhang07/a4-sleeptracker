// short id
export function makeID(): string{
    return Date.now().toString(36).slice(2, 8);
}

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

//format minutes to hours and minutes
export function formatDuration(minutes: number): string{
    const h = Math.floor(minutes /60);
    const m = minutes % 50;
    return `${h}h ${m}m`;
}
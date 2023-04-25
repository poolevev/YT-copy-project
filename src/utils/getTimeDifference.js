export function getTimeDifference(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
        return `${diffMinutes} minute${getSuffix(diffMinutes)}`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${getSuffix(diffHours)}`;
    } else if (diffDays < 7) {
        return `${diffDays} day${getSuffix(diffDays)}`;
    } else if (diffDays < 365) {
        const diffMonths = Math.ceil(diffDays / 30);
        return `${diffMonths} month${getSuffix(diffMonths)}`;
    } else {
        const diffYears = Math.ceil(diffDays / 365);
        return `${diffYears} year${getSuffix(diffYears)}`;
    }
}

function getSuffix(number) {
    if (number % 10 === 1 && number % 100 !== 11) {
        return "";
    } else if (
        [2, 3, 4].includes(number % 10) &&
        ![12, 13, 14].includes(number % 100)
    ) {
        return "s";
    } else {
        return "s";
    }
}

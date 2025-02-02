export const formatTimeElapsed = (seconds: number) => {
    // eslint-disable-next-line prefer-const
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    // eslint-disable-next-line prefer-const
    let secString = `${seconds < 10 ? '0' : ''}${seconds}`;
    // eslint-disable-next-line prefer-const
    let minString = `${minutes < 10 ? '0' : ''}${minutes}`;

    return `${minString}:${secString}`;
};
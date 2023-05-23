export const formatTime = function (current: number) {
    if (!current) return "00:00";

    let h: number | string = Math.floor(current / 3600);
    let m: number | string = Math.floor((current - h * 3600) / 60);
    let s: number | string = Math.floor(current % 60);

    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    return h + ":" + m + ":" + s;
};

export const formatDate = (date: number) => {
    return new Date(date).toDateString() + " : " + formatTime(date);
};

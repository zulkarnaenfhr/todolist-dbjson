const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
};
export const getDateFormat = (originalDate) => {
    let date = new Date(originalDate);
    let day = date.getDate();
    let year = date.getFullYear();
    const monthName = months[date.getMonth()];
    const tanggal = `${day} / ${monthName} / ${year}`;
    return tanggal;
};

export const getDefaultDate = (originalDate) => {
    let date = new Date(originalDate);
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let year = date.getFullYear();

    const tanggalDefault = `${year}-${month}-${day}`;
    return tanggalDefault;
};

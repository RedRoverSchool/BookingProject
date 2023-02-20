export const sortDesc = (array) => array.sort((a, b) => +b.replace(/[^\d+]/g, '') - (+a.replace(/[^\d+]/g, '')));

export const sortAsc = (array) => array.sort((a, b) => +a.replace(/[^\d+]/g, '') - (+b.replace(/[^\d+]/g, '')));
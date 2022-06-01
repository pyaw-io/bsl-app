export const recordsPerPage = 8

export const random_rgb = () => {
    const o = Math.round, r = Math.random, s = 255;

    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

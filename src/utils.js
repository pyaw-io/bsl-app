export const recordsPerPage = 8

export const random_rgb = () => {
    const o = Math.round, r = Math.random, s = 255;

    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

export const getSavedReadings = (object,feild) => {
    let output = []
    for (let i = 0; i < object.length; i++){

        output.push(object[i][feild])
    }
  

        return {[feild]: output.flat()}


}

export const remainingTime =(expirationTime) => {

    const currentTime = new Date().getTime
    const adjExpirationtime = new Date(expirationTime)
    const remainingTime = adjExpirationtime - currentTime
    return remainingTime

}

export const initialtargets ={
    Before_Breakfast: 0,
    After_Breakfast: 0,
    After_Lunch: 0,
    After_Supper: 0}
    

// const readings = [
//   {
//     date: '2022-04-15',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },

//   {
//     date: '2022-04-16',
//     Before_breakfast: 9,
//     After_Breakfast: 5,
//     After_Lunch: 5,
//     After_Dinner: 9,
//   },
//   {
//     date: '2022-04-17',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-18',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-19',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 6,
//   },
//   {
//     date: '2022-04-20',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-21',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-22',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-23',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-24',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-25',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-26',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-27',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5,
//   },
//   {
//     date: '2022-04-28',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-29',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-30',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5.9,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-04-31',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-05-01',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 5,
//     After_Dinner: 5.9,
//   },
//   {
//     date: '2022-05-02',
//     Before_breakfast: 5.9,
//     After_Breakfast: 5.9,
//     After_Lunch: 9.9,
//     After_Dinner: 5.9,
//   },
// ];

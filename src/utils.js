export const getWindowSize = async () => {
    const {innerWidth, _} = window;
    return innerWidth;
  }


export const recordsPerPage = getWindowSize() > 600? 8 : 6

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
    


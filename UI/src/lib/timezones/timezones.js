import Timezones from './timezones.json'
// import Capital from './capital.json'

export default class timezones{
    getTimezonesName(){
        return Timezones
    }
    // getCapital(){
    //     return Capital
    // }
    // mapCapital(city){
    //     let code = ''
    //     Capital.map((data,key)=>{
    //         if(data.name==city){
    //             code = data.code
    //             return
    //         }
    //     })
    //     return code
    // }
}
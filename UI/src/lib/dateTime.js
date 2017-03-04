const month = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export default class DateTime{
    getDateTime(){
        return this.getDate()+' '+this.getTime()
    }
    getFullDateTime(){
        return this.getDate()+' '+this.getFullTime()
    }
    getDateTimeForRequest(date=(new Date())){
        let dateNumber = (date.getDate()<10) ? '0'+date.getDate() : date.getDate()
        let monthNumber = (date.getMonth()<10) ? '0'+date.getMonth() : date.getMonth()
        let dateTime = date.getFullYear()+'-'+monthNumber+'-'+dateNumber
        return dateTime+''+this.getFullTime()
    }
    getDate(date=(new Date())){
        return date.getDate()+'-'+month[date.getMonth()]+'-'+date.getFullYear()
    }
    getTime(date=(new Date())){
        let dateHourse = (date.getHours()<10) ? '0'+date.getHours() : date.getHours()
        let dateMinnutes = (date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes()
        return dateHourse+':'+dateMinnutes
    }
    getFullTime(date=(new Date())){
        let dateHourse = (date.getHours()<10) ? '0'+date.getHours() : date.getHours()
        let dateMinnutes = (date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes()
        let seconds = (date.getSeconds()<10) ? '0'+date.getSeconds() : date.getSeconds()
        return dateHourse+':'+dateMinnutes+':'+seconds
    }
    getNextDateTimeStamp(now=(new Date())){
        let date = new Date(now.getTime()+(24 * 60 * 60 * 1000))
        return date
    }
    getPreviousDateTimeStamp(now=(new Date())){
        let date = new Date(now.getTime()-(24 * 60 * 60 * 1000))
        return date
    }
    getNowTimeStamp(){
        let date = new Date()
        return date.getTime()
    }
    convertDateToTimeStamp(dateTime){
        let date = new Date(dateTime)
        return date.getTime()
    }
}
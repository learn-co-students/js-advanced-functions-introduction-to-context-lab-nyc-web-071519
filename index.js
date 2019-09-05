// Your code here
let createEmployeeRecord = function(whateverName){
        return {
            firstName: whateverName[0],
            familyName: whateverName[1],
            title: whateverName[2],
            payPerHour: whateverName[3],
        
        
            timeInEvents: [],
            timeOutEvents: []
        }
}

let createEmployees = function(employeeWhateverName){
    return employeeWhateverName.map(function(whatever){
        return createEmployeeRecord(whatever)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee

}

let createTimeOutEvent = function(employee, dateStamp){

    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}


let hoursWorkedOnDate = function(employee, soughtDate){

    let inEvent = employee.timeInEvents.find(function(event){
        return event.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(event){
        return event.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour ) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){


    let trueWage =  hoursWorkedOnDate(employee, dateSought) * employee.payPerHour

    return parseFloat(trueWage.toString())
}


let allWagesFor = function(employee){
    let trueDates = employee.timeInEvents.map(function(event){
        return event.date
    })

    let owedPayCheck = trueDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return owedPayCheck
}

let calculatePayroll = function (arrayOfEmployeeRecs){
    return arrayOfEmployeeRecs.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}

let createEmployeeRecords = function(source){
    return source.map(function(row){
        return createEmployeeRecord(row)
    })
}

let findEmployeebyFirstName = function(sourceArray, firstName){
    return sourceArray.find(function(record){
        return record.firstName === firstName 
    })
}
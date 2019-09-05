// Your code here
function createEmployeeRecord(data){
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployees(data){
    return data.map(emp => createEmployeeRecord(emp))
}

function createTimeInEvent(emp, date){
    let timeInEvents = {type: "TimeIn"};
    const dateAndTime = date.split(" ")
    timeInEvents.hour = parseInt(dateAndTime[1])
    timeInEvents.date = dateAndTime[0]
    emp.timeInEvents.push(timeInEvents)
    return emp
}

function createTimeOutEvent(emp, date){
    let timeOutEvents = {type: "TimeOut"};
    const dateAndTime = date.split(" ")
    timeOutEvents.hour = parseInt(dateAndTime[1])
    timeOutEvents.date = dateAndTime[0]
    emp.timeOutEvents.push(timeOutEvents)
    return emp
}

function hoursWorkedOnDate(emp, date){
    const timeIn = emp.timeInEvents.find(event => event.date === date).hour
    const timeOut = emp.timeOutEvents.find(event => event.date === date).hour
    return (timeOut-timeIn)/100;
}

function wagesEarnedOnDate(emp, date){
    return emp.payPerHour * hoursWorkedOnDate(emp, date)
}

function allWagesFor(emp){
    const allWages = emp.timeOutEvents.map(event => wagesEarnedOnDate(emp, event.date))
    // return wagesEarnedOnDate(emp, dates[1])
    // const dates = emp.timeInEvents.map(event => event.date)
    return allWages.reduce(function(total,cv){
        total = parseInt(total) + parseInt(cv)
        return total
    }, 0)
}

function createEmployeeRecords(arr){
    return arr.map(emp => createEmployeeRecord(emp))
}

function calculatePayroll(employees){
    const allWages = employees.map(emp => allWagesFor(emp))
    return allWages.reduce(function(total,cv){
        total = parseInt(total) + parseInt(cv)
        return total
    }, 0)
}

function findEmployeebyFirstName(srcArray, firstName){
    return srcArray.find(emp => emp.firstName === firstName)
}
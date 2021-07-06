function createEmployeeRecord(data){
    return { 
        firstName: data[0],
        familyName:data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
function createEmployees(data){
    let recordArray = []
    data.forEach(function(dataIndex){
        recordArray.push(createEmployeeRecord(dataIndex))
    })
    return recordArray
}
function createTimeInEvent(employee, dateStamp){
    let object = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ").pop()),
        date: dateStamp.split(" ").shift()
    }
    employee.timeInEvents.push(object)
    return employee
}
function createTimeOutEvent(employee, dateStamp){
    let object = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ").pop()),
        date: dateStamp.split(" ").shift()
    }
    employee.timeOutEvents.push(object)
    return employee
}
function hoursWorkedOnDate(employee, dateStamp){
    let timeInObjectForThatDay = employee.timeInEvents.find(
        function(timeIn){
            return timeIn.date === dateStamp.split(" ").shift()
        });
    let timeOutObjectForThatDay = employee.timeOutEvents.find(
        function(timeIn){
            return timeIn.date === dateStamp.split(" ").shift()
        });

    let hoursWorked = timeOutObjectForThatDay.hour - timeInObjectForThatDay.hour
    return hoursWorked/100
}
function wagesEarnedOnDate(employee, dateStamp){
    let hoursWorked =  hoursWorkedOnDate(employee, dateStamp)
    return hoursWorked * employee.payPerHour
}
function allWagesFor(employee){
    let dateStampList = []
    employee.timeInEvents.forEach(function(timeIn){
        dateStampList.push(timeIn.date)
    })

    let total = 0
    dateStampList.forEach(function(date){
        total += wagesEarnedOnDate(employee, date)
    })
    return total
}
function calculatePayroll(employees){
    let totalPay = 0
    employees.forEach(function(employee){
        totalPay += allWagesFor(employee)
    })
    return totalPay
}
function createEmployeeRecords(employees){
    let employeeArray = []
    employees.forEach(function(employee){
        employeeArray.push(createEmployeeRecord(employee))
    }) 
    return employeeArray
}
function findEmployeebyFirstName(employeeArray, name){
    return employeeArray.find(function(employee){return employee.firstName === name})
}



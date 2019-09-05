function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployees(mainArray) {
  return mainArray.map(array => {
    return createEmployeeRecord(array);
  });
}

let createTimeInEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });

  return employee;
};

let createTimeOutEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });

  return employee;
};

function hoursWorkedOnDate(employee, dateFormat) {
  let iE = employee.timeInEvents.find(function(arg) {
    return arg.date === dateFormat;
  });
  let oE = employee.timeOutEvents.find(function(arg) {
    return arg.date === dateFormat;
  });
  return (oE.hour - iE.hour) / 100;
}

function wagesEarnedOnDate(employeeObject, dateFormat) {
  let wage =
    hoursWorkedOnDate(employeeObject, dateFormat) * employeeObject.payPerHour;
  return parseFloat(wage.toString());
}

function allWagesFor(employeeObject) {
  let dates = employeeObject.timeInEvents.map(function(arg) {
    return arg.date;
  });

  let pay = dates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employeeObject, d);
  }, 0);
  return pay;
}

function calculatePayroll(array) {
  return array.reduce(function(memo, record) {
    return memo + allWagesFor(record);
  }, 0);
}

function createEmployeeRecords(arg) {
  return arg.map(function(row) {
    return createEmployeeRecord(row);
  });
}

function findEmployeebyFirstName(array, firstName) {
  return array.find(arrayElement => arrayElement.firstName === firstName);
}

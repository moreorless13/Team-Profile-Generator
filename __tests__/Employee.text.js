const Employee = require('../lib/Employee');

describe("Employee", () => {
    describe('Initialization', () => {
        it('should return an object containing the properties "name", "id", and "email" when called with the "new" keyword', () => {
            const employee = new Employee();

            expect("name" in employee).toEqual('name')
        })
    })
})
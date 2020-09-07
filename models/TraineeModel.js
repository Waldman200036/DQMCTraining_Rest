/* jshint  esversion:8 */
class TraineeModel {
    constructor(trainee) {
        this.firstName = trainee.firstName,
            this.lastName = trainee.lastName,
            this.Organization = trainee.Organization,
            this.branch = trainee.branch,
            this.facility = trainee.facility,
            this.email = trainee.email,
            this.phone = trainee.phone,
            this.date = trainee.date,
            this.time = trainee.time
    }
    getUpdate() {
        return {
            $set: {
                firstName: this.firstName,
                lastName: this.lastName,
                Organization: this.Organization,
                branch: this.branch,
                facility: this.facility,
                email: this.email,
                phone: this.phone,
                date: this.date,
                time: this.time
            }
        };
    }
}

module.exports = TraineeModel;

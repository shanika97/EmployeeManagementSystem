import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  EmployeeArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;


  isShowDetailsButtonDisabled: boolean = true;
  name: string = '';
  email: string = '';
  phone: string = '';
  username: string = '';
  password: string = '';
  currentid = '';

  isSaveDisable: boolean = false;
  constructor(private http: HttpClient) {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.http
      .get('http://localhost:8080/api/v1/employee/getAllEmployee')

      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.EmployeeArray = resultData;
      });
  }

  //   save() {
  //     let bodyData = {
  //       name: this.name,
  //       email: this.email,
  //       phone: this.phone,
  //       username: this.username,
  //       password: this.password,
  //     };

  //     this.http
  //       .post('http://localhost:8080/api/v1/employee/save', bodyData, {
  //         responseType: 'text',
  //       })
  //       .subscribe((resultData: any) => {
  //         console.log(resultData);
  //         alert('Employee Registered Successfully');
  //         this.getAllEmployee();
  //         this.name = '';
  //         this.email = '';
  //         this.phone = '';
  //         this.password = '';
  //       });
  //   }

  //   cleardata() {
  //     this.getAllEmployee();
  //     this.name = '';
  //     this.email = '';
  //     this.phone = '';
  //     this.password = '';
  //   }

  register() {
    let bodyData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      username: this.username,
      password: this.password,
    };

    this.http
      .post('http://localhost:8080/api/v1/employee/save', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Registered Successfully');
        this.getAllEmployee();
        this.name = '';
        this.email = '';
        this.phone = '';
        this.password = '';
        this.isShowDetailsButtonDisabled = false;
      });
  }

  cleardata() {
    this.getAllEmployee();
    this.name = '';
    this.email = '';
    this.phone = '';
    this.username = '';
    this.password = '';
    this.isShowDetailsButtonDisabled = true;
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.username = data.username;
    this.password = data.password;
    this.currentid = data.id;
  }

  UpdateRecords() {
    let bodyData = {
      id: this.currentid,
      name: this.name,
      email: this.email,
      phone: this.phone,
      username: this.username,
      password: this.password,
    };

    this.http
      .put('http://localhost:8080/api/v1/employee/update', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Registered Updateddd');
        this.getAllEmployee();
        this.name = '';
        this.email = '';
        this.phone = '';
        this.username = '';
        this.password = '';
      });
  }
  emailErrorMessage: string = '';
  isFormValid(): boolean {
    return (
      this.name !== '' &&
      this.email !== '' &&
      this.phone !== '' &&
      this.username !== '' &&
      this.password !== ''&&
      this.emailErrorMessage ===''
    );
  }
    phoneErrorMessage: string = '';
    isPhoneValid: boolean = true;

    validatePhone() {
      const isValidLength = this.phone.length === 10;
      const containsOnlyDigits = /^\d+$/.test(this.phone);

      this.isPhoneValid = isValidLength && containsOnlyDigits;

      // Set isSaveDisable based on the overall form validity
      this.isSaveDisable = !this.isFormValid();
    }
    isEmailValid: boolean = true;
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.isEmailValid = emailPattern.test(this.email);

      // Set isSaveDisable based on the overall form validity
      this.isSaveDisable = !this.isFormValid();
    }
    isUsernameTaken: boolean = false;

// Add a method to check if the username is taken
validateUsername() {
  this.isUsernameTaken = false; // Reset the flag

  // Check if the username is already taken
  if (this.username) {
    this.http
      .get(`http://localhost:8080/api/v1/employee/isUsernameTaken/${this.username}`)
      .subscribe(
        (resultData: any) => { // Change 'any' to the expected type if necessary
          this.isUsernameTaken = resultData as boolean;

          // Set isSaveDisable based on the overall form validity
          this.isSaveDisable = !this.isFormValid() || this.isUsernameTaken;
        },
        (error) => {
          console.error('Error checking username availability', error);
        }
      );
  }
}

isPasswordValid: boolean = true;
  save() {
  console.log('Form Valid:', this.isFormValid());
  console.log('Phone Valid:', this.isPhoneValid);
  console.log('Email Valid:', this.isEmailValid);
  console.log('Username Taken:', this.isUsernameTaken);

  const isPhoneValid = /^\d{10}$/.test(this.phone);

    if (this.currentid == '') {
      this.register();
    } else {
      if (!isPhoneValid) {
        alert('Please enter a valid 10-digit phone number.');
        this.validatePhone(); // Clear the error message and set isSaveDisable
      } else {
        this.isSaveDisable = true; // Set isSaveDisable to true if the form or username is not valid
      }
      this.UpdateRecords();
    }
  }
  validatePassword() {
    const passwordLength = this.password.length;
    this.isPasswordValid = passwordLength >= 3 && passwordLength <= 8;

    // Set isSaveDisable based on the overall form validity
    this.isSaveDisable = !this.isFormValid() || !this.isPasswordValid;
  }
  setDelete(data: any) {
    this.http
      .delete('http://localhost:8080/api/v1/employee/delete' + '/' + data.id, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee Deletedddd');
        this.getAllEmployee();
        this.name = '';
        this.email = '';
        this.phone = '';
        this.username = '';
        this.password = '';
      });
  }
}

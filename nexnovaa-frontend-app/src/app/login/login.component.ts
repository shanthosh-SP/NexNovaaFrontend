import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly router = inject(Router);
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('User',
      Validators.required),
    password: new FormControl('User@123',
      Validators.required)
  });

  onSubmit(){
    if(this.loginForm.valid){
      this.router.navigate(['/home']);
    }
  }
}

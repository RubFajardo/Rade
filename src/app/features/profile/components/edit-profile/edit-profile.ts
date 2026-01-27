import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

export interface ProfileData {
  avatar: string;
  name: string;
  age: number;
  city: string;
  country: string;
  description: string;
}


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfile implements OnChanges {
  @Input() isOpen = false;
  @Input() profileData: ProfileData | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ProfileData>();

  profileForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      avatar: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profileData'] && this.profileData) {
      this.profileForm.patchValue({
        avatar: this.profileData.avatar || '',
        name: this.profileData.name || '',
        age: this.profileData.age || '',
        city: this.profileData.city || '',
        country: this.profileData.country || '',
        description: this.profileData.description || ''
      });
    }

    if (changes['isOpen'] && this.isOpen) {
      this.isLoading = false;
    }
  }

  onClose(): void {
    this.close.emit();
    if (this.profileData) {
      this.profileForm.patchValue(this.profileData);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const formValue = this.profileForm.value;

      setTimeout(() => {
        this.save.emit(formValue);
        this.isLoading = false;
      }, 500);
    } else {
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
    }
  }

}

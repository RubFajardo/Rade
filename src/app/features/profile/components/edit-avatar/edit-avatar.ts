import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-upload-avatar-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-avatar.html'
})
export class EditAvatar {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<File>();

  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLoading = false;
  errorMessage = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Por favor selecciona un archivo de imagen válido';
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'La imagen no debe superar los 5MB';
        return;
      }

      this.errorMessage = '';
      this.selectedFile = file;

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.isLoading = true;
      this.save.emit(this.selectedFile);
    }
  }

  onClose(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.errorMessage = '';
    this.isLoading = false;
    this.close.emit();
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('avatar-file-input') as HTMLInputElement;
    fileInput?.click();
  }

  removeImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.errorMessage = '';
  }
}

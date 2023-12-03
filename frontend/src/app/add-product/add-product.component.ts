import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  productForm: FormGroup;
  origins: string[] = ['Local', 'Imported'];
  categories: string[] = ['Mobile', 'Food', 'Cloths'];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      shotCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      description: ['', [Validators.minLength(3), Validators.maxLength(250)]],
      image: [null],
      isBestAchieved: [false],
      createdDate: [null, Validators.required],
      origin: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.productForm && this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')!.value);
      formData.append('shotCode', this.productForm.get('shotCode')!.value);
      formData.append('price', this.productForm.get('price')!.value);
      formData.append('quantity', this.productForm.get('quantity')!.value);
      formData.append('description', this.productForm.get('description')!.value);
      formData.append('image', this.productForm.get('image')!.value);
      formData.append('isBestAchieved', this.productForm.get('isBestAchieved')!.value);
      formData.append('createdDate', this.productForm.get('createdDate')!.value);
      formData.append('origin', this.productForm.get('origin')!.value);
      formData.append('category', this.productForm.get('category')!.value);
  
      this.productService.addProduct(formData).subscribe(
        (data) => {
          console.log('Product added successfully:', data);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Form is invalid or not initialized. Please check the fields.');
    }
  }
  
  
  onImageChange(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      if (this.productForm) {
        const imageControl = this.productForm.get('image');
        if (imageControl) {
          imageControl.setValue(file);
        }
      }
    }
  }
  
}

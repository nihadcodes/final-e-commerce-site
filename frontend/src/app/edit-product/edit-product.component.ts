import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  productId!: string; 

  origins: string[] = ['Local', 'Imported'];
  categories: string[] = ['Mobile', 'Food', 'Cloths'];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.loadProductData();
    });
  }

  loadProductData(): void {
    
    this.productService.getProductById(this.productId).subscribe(
      (product) => {
       
        this.productForm.patchValue(product);
      },
      (error) => {
        console.error('Error loading product details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm && this.productForm.valid) {
      const updatedProductData = { ...this.productForm.value }; 
      updatedProductData.isBestAchieved = updatedProductData.isBestAchieved.toString();
      this.productService.updateProduct(this.productId, updatedProductData).subscribe(
        (data) => {
          console.log('Product updated successfully:', data);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      console.error('Form is invalid or not initialized. Please check the fields.');
    }
  }
  
  
}

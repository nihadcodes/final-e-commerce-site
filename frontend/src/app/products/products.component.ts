import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.updateDisplayedColumns();
    this.loadProducts();
  }

  private updateDisplayedColumns(): void {
    if (this.authService.isAdmin()) {
      this.displayedColumns = ['name', 'shotCode', 'price', 'quantity', 'createdDate', 'actions'];
    } else {
      this.displayedColumns = ['name', 'shotCode', 'price', 'quantity', 'createdDate'];
    }
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.dataSource.data = products;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }
  

  editProduct(product: any): void {
    this.router.navigate(['/editProduct', product._id]);
  }

  deleteProduct(product: any): void {
    this.productService.deleteProduct(product._id).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(item => item._id !== product._id);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
  
  updateProduct(id: string, product: any): void {
    this.productService.updateProduct(id, product).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        const index = this.dataSource.data.findIndex(item => item._id === updatedProduct._id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedProduct;
          this.dataSource.data = [...this.dataSource.data];
        }
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
  
  
}

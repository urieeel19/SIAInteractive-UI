import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['productId', 'name', 'description', 'image', 'categories', 'actions'];

  constructor(private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (result) => {
        debugger;
        if (result.isSuccess) {
          this.products = result.data; 
        }
      },
      error: (err) => {
        console.error('Error :', err);
      }
    });
  }
  

  addProduct(): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '700px',     // ancho inicial
      maxWidth: '90vw',   // ancho máximo responsivo
      data: null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }
  
  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '700px',
      maxWidth: '90vw',
      data: product
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProducts();
    });
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `¿Desea eliminar ${product.name}?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.productService.deleteProduct(product.productId).subscribe(() => this.loadProducts());
      }
    });
  }
  getCategoryNames(product: Product): string {
    return product.categories?.map(c => c.name).join(', ') ?? '';
  }
}

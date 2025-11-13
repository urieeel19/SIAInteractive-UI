import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { ProductDto } from '../../dtos/product.dto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    this.form = this.fb.group({
      name: [this.data?.name || '', [Validators.required, Validators.minLength(3)]],
      description: [this.data?.description || ''],
      image: [this.data?.image || ''],
      categoryIds: [[], Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.get().subscribe({
      next: (result) => {this.categories = result.data
        if (this.data?.categories) {          
          const selectedIds = this.data.categories.map((x: any) => x.id);
          this.form.get('categoryIds')?.setValue(selectedIds);
        }
      },
      error: () => this.categories = []
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const dto: ProductDto = {
      productId: this.data?.productId,
      name: this.form.value.name,
      description: this.form.value.description,
      image: this.form.value.image,
      categoryIds: this.form.value.categoryIds
    };

    if (this.data?.productId) {
      this.productService.updateProduct(dto.productId!, dto)
        .subscribe(() => this.dialogRef.close(true));
    } else {debugger;
      this.productService.createProduct(dto)
        .subscribe(() => this.dialogRef.close(true));
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = '';
  }
}

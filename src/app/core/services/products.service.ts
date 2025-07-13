import { inject, Injectable } from "@angular/core";
import { BaseHttpService } from "./base-http.service";
import { Items } from "../../models/Items.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private api = inject(BaseHttpService);
  private endpoint = 'products';

  getAll(): Observable<Items[]> {
    return this.api.get<Items[]>(this.endpoint);
  }

  getById(id: number): Observable<Items> {
    return this.api.getById<Items>(this.endpoint, id);
  }

  
  create(product: Omit<Items, 'id'>): Observable<Items> {
    return this.api.post<Items>(this.endpoint, product);
  }

  update(id: number, product: Partial<Items>): Observable<Items> {
    return this.api.put<Items>(this.endpoint, id, product);
  }

  delete(id: number): Observable<Items> {
    return this.api.delete<Items>(this.endpoint, id);
  }
}

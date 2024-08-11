import { Routes } from '@angular/router';

export const routes: Routes = [
      {
        path: 'list',
        data:{
          title:"Customer List"
        },
        loadComponent: () => import('./customer-list/customer-list.component').then((m) => m.CustomerListComponent)
      },
      {
        path: 'create',
        data:{
          title:"Create Customer"
        },
        loadComponent: () => import('./customer-create/customer-create.component').then((m) => m.CustomerCreateComponent)
      },
      {
        path: 'edit/:id',
        data:{
          title:"Edit Customer"
        },
        loadComponent: () => import('./customer-edit/customer-edit.component').then((m) => m.CustomerEditComponent)
      },
];

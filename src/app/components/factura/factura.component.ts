import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacturaService } from '../../services/factura.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    CardModule,
    TableModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent implements OnInit {

  facturas: any[] = [];
  facturaSeleccionada: any = null;
  nuevoSubtotal: number = 0;
  tipoUsuario: string = 'A';
  cargando: boolean = false;

  tiposUsuario = [
    { label: 'Tipo A (máx +$20,000)', value: 'A' },
    { label: 'Tipo B (máx +$50,000)', value: 'B' }
  ];

  constructor(
    private facturaService: FacturaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas(): void {
    this.facturaService.getFacturas().subscribe({
      next: (data) => this.facturas = data,
      error: () => this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al cargar las facturas'
      })
    });
  }

  seleccionarFactura(factura: any): void {
    this.facturaSeleccionada = factura;
    this.nuevoSubtotal = factura.subtotal;
  }

recalcular(): void {
  this.messageService.clear();

  if (!this.nuevoSubtotal || this.nuevoSubtotal <= 0) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Atención',
      detail: 'Ingresa un subtotal válido'
    });
    return;
  }

  this.cargando = true;

  this.facturaService.recalcular(
    this.facturaSeleccionada.id,
    this.nuevoSubtotal,
    this.tipoUsuario
  ).subscribe({
    next: (data) => {
      this.facturaSeleccionada = data;
      this.cargando = false;
      this.cargarFacturas();
      this.messageService.clear();
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Factura recalculada exitosamente'
      });
    },
    error: (err) => {
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err.error?.error || err.error?.message || 'Error al recalcular'
      });
      this.cargando = false;
    }
  });
}
}
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiButtonModule, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

export interface ConfirmationDialogContext {
  header: string;
  description: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

@Component({
  selector: 'confirmation-dialog',
  standalone: true,
  imports: [
    TuiButtonModule,
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  constructor(
      @Inject(POLYMORPHEUS_CONTEXT)
      private readonly context: TuiDialogContext<boolean, ConfirmationDialogContext>,
  ) {}

  public get header(): string {
    return this.context.data.header;
  }

  public get description(): string {
    return this.context.data.description;
  }

  public get cancelButtonText(): string {
    return this.context.data.cancelButtonText ?? 'Отменить';
  }

  public get confirmButtonText(): string {
    return this.context.data.confirmButtonText ?? 'Продолжить';
  }

  public cancel(): void {
    this.context.completeWith(false);
  }

  public confirm(): void {
    this.context.completeWith(true);
  }
}

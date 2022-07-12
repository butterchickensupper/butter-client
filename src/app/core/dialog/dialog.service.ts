import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErrorDialogComponent } from './error-dialog';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    constructor(public dialog: MatDialog) {}

    public showErrorDialog(message: any) {
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            data: {
                error: 'error message',
            },
        });

        dialogRef.afterClosed().subscribe((res) => {
            console.log('afterClosed', res);
        });
    }
}

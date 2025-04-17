import { Component } from '@angular/core';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatInputModule,MatFormFieldModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  
  private originalPdfBytes: Uint8Array | null = null;
  names: string = ''; // Comma-separated or newline names

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.[0]) return;

    const arrayBuffer = await input.files[0].arrayBuffer();
    this.originalPdfBytes = new Uint8Array(arrayBuffer);
  }

  async generateAndDownloadAll() {
    if (!this.originalPdfBytes) return;

    const zip = new JSZip();
    const fontSize = 8;
    const fontXStart = 110;
    const fontXEnd = 240;
    const fontY = 250;

    const nameList = this.names.split(/\r?\n/).map(n => n.trim()).filter(Boolean);

    for (const name of nameList) {
      const pdfDoc = await PDFDocument.load(this.originalPdfBytes);
      const page = pdfDoc.getPages()[0];
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const textWidth = font.widthOfTextAtSize(name, fontSize);
      const centerX = (fontXStart + fontXEnd) / 2;
      const x = centerX - textWidth / 2;

      page.drawText(name, {
        x,
        y: fontY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      zip.file(`${'Invitation for ' + name}.pdf`, pdfBytes);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'Custom-invitations.zip');
  }
}

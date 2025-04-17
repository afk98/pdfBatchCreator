# PdfEditorApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

# From AFK
Hi, This app can insert bunch of names one by one to a PDF document. You just need to edit the fontXStart, fontXEnd and fontY in the editor.component according to your document. And if you want you can customize the font size or even add colors as for preference.

# Common stuff to install
npm i
npm install pdf-lib jszip file-saver      : sometimes npm i might not install these, so you will need to manually install
npm install --save-dev @types/file-saver   : sometimes npm i might not install these, so you will need to manually install
ng add @angular/material

# Steps to Execute
Launch the Application : npm start
Select a PDF you want to edit
Enter the desired text that you need to enter to your document. If there are multiple texts, enter each text line by line
Then Click on Generate & Download
Then app will finally export a ZIP file with all the PDFs.

'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf/dist/polyfills.es.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface DownloadBookProps {
  bookId: string;
  bookTitle: string;
  bookContent: string;
  coverUrl: string;
}

export function DownloadBook({
  bookId,
  bookTitle,
  bookContent,
  coverUrl,
}: DownloadBookProps) {
  const handleDownload = async () => {
    try {
      // Създаваме zip файл, в който ще добавим всички PDF файлове
      const zip = new JSZip();
      const bookFolder = zip.folder(`${bookTitle}`);
      if (!bookFolder) throw new Error('Не може да се създаде папка в архива');

      // Разделяме съдържанието на параграфи
      const paragraphs = bookContent.split('\n\n');

      // Броят параграфи на страница от основната страница за четене
      const paragraphsPerPage = 10;

      // Изчисляваме общия брой страници според paragraphsPerPage
      const totalPages = Math.ceil(paragraphs.length / paragraphsPerPage);

      console.log(
        `Общо страници: ${totalPages}, общо параграфи: ${paragraphs.length}`
      );

      // Създаваме масив от страници със съответните параграфи
      const pages = [];
      for (let i = 0; i < totalPages; i++) {
        const startIdx = i * paragraphsPerPage;
        const endIdx = Math.min(
          startIdx + paragraphsPerPage,
          paragraphs.length
        );
        pages.push(paragraphs.slice(startIdx, endIdx).join('\n\n'));
      }

      // Първо създаваме PDF с корицата
      const coverPdf = await createCoverPage(bookTitle, coverUrl);
      if (coverPdf) {
        bookFolder.file(`${bookTitle}_корица.pdf`, coverPdf.output('blob'));
      }

      // След това създаваме PDF за всяка страница от съдържанието
      for (let i = 0; i < pages.length; i++) {
        const pageContent = pages[i];
        const pagePdf = await createContentPage(
          bookTitle,
          pageContent,
          i + 1,
          totalPages
        );
        bookFolder.file(
          `${bookTitle}_страница_${i + 1}.pdf`,
          pagePdf.output('blob')
        );
      }

      // Генерираме и изтегляме zip файла
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(
        content,
        `${bookTitle
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '_')
          .toLowerCase()}.zip`
      );
    } catch (error) {
      console.error('Error generating PDFs:', error);
      alert('Възникна грешка при създаване на PDF файловете');
    }
  };

  // Функция за създаване на PDF с корицата
  const createCoverPage = async (
    title: string,
    imageUrl: string
  ): Promise<jsPDF | null> => {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Зареждаме корицата на книгата
      const img = new Image();
      img.crossOrigin = 'Anonymous';

      // Изчакваме зареждането на изображението
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (e) => {
          console.error('Error loading image:', e);
          reject(e);
        };
        img.src = imageUrl;
      });

      // Изчисляваме размерите на корицата, за да се вмести правилно
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (img.height * imgWidth) / img.width;

      // Добавяме корицата
      pdf.addImage(
        img,
        'JPEG',
        0,
        0,
        imgWidth,
        Math.min(imgHeight, pageHeight)
      );

      // Добавяме заглавието в долната част на корицата
      const titleCanvas = document.createElement('canvas');
      const titleCtx = titleCanvas.getContext('2d');
      titleCanvas.width = 600;
      titleCanvas.height = 100;

      if (titleCtx) {
        titleCtx.font = 'bold 30px Arial';
        titleCtx.fillStyle = '#fff';
        titleCtx.fillText(title, 10, 50);

        // Добавяме заглавието като изображение в долната част на корицата
        pdf.addImage(
          titleCanvas.toDataURL('image/png'),
          'PNG',
          20,
          pageHeight - 30,
          160,
          20
        );
      }

      return pdf;
    } catch (error) {
      console.error('Error creating cover page:', error);
      return null;
    }
  };

  // Функция за създаване на PDF с една страница от съдържанието
  const createContentPage = async (
    title: string,
    content: string,
    pageNumber: number,
    totalPages: number
  ): Promise<jsPDF> => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Добавяме заглавието в горната част на страницата
    const headerCanvas = document.createElement('canvas');
    const headerCtx = headerCanvas.getContext('2d');
    headerCanvas.width = 600;
    headerCanvas.height = 50;

    if (headerCtx) {
      headerCtx.font = 'bold 16px Arial';
      headerCtx.fillStyle = '#000';
      headerCtx.fillText(`${title}`, 10, 25);

      // Добавяме хедър
      pdf.addImage(headerCanvas.toDataURL('image/png'), 'PNG', 20, 10, 160, 10);
    }

    // Добавяме съдържанието
    const contentParagraphs = content.split('\n\n');
    let y = 30; // Започваме от позиция след хедъра

    for (const paragraph of contentParagraphs) {
      // Създаваме канвас за параграфа
      const paragraphCanvas = document.createElement('canvas');
      const paragraphCtx = paragraphCanvas.getContext('2d');

      if (paragraphCtx) {
        paragraphCtx.font = '14px Arial';
        paragraphCtx.fillStyle = '#000';

        // Определяме височината според дължината на текста
        const lineHeight = 20;
        const maxCharsPerLine = 80;
        const lines = Math.ceil(paragraph.length / maxCharsPerLine);
        const canvasHeight = (lines + 1) * lineHeight;

        paragraphCanvas.width = 540; // ~160mm при 96dpi
        paragraphCanvas.height = canvasHeight;

        // Разделяме дългия текст на няколко реда
        let currentLine = 0;
        for (let i = 0; i < paragraph.length; i += maxCharsPerLine) {
          const line = paragraph.substring(
            i,
            Math.min(i + maxCharsPerLine, paragraph.length)
          );
          currentLine++;
          paragraphCtx.fillText(line, 0, currentLine * lineHeight);
        }

        // Добавяме параграфа към PDF
        pdf.addImage(
          paragraphCanvas.toDataURL('image/png'),
          'PNG',
          20,
          y,
          170,
          (canvasHeight * 170) / 540
        );
        y += (canvasHeight * 170) / 540 + 10;
      }
    }

    // Добавяме номер на страницата в долната част
    const footerCanvas = document.createElement('canvas');
    const footerCtx = footerCanvas.getContext('2d');
    footerCanvas.width = 200;
    footerCanvas.height = 30;

    if (footerCtx) {
      footerCtx.font = '12px Arial';
      footerCtx.fillStyle = '#000';
      footerCtx.fillText(`Страница ${pageNumber} от ${totalPages}`, 10, 15);

      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(
        footerCanvas.toDataURL('image/png'),
        'PNG',
        pdf.internal.pageSize.getWidth() / 2 - 40,
        pageHeight - 15,
        80,
        8
      );
    }

    return pdf;
  };

  return (
    <Button
      variant='outline'
      className='flex items-center gap-2'
      onClick={handleDownload}
    >
      <Download className='h-4 w-4' />
      Изтегли страниците
    </Button>
  );
}

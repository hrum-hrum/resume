//const { html2pdf } = require('html2pdf.js');

let main = {
  init: function () {
    const self = this;

    self.savePdf();
  },

  EmptyNodesCleaner: function (el) {
    function recursiveCleaner(el) {
      if (el && el.childNodes.length > 0) {
        var childNodes = el.childNodes;
        // for (var i = 0; i < el.childNodes.length; i++) {
        //   recursiveCleaner(el.children[i]);
        // }
        // for (var i = 0; i < el.childNodes.length; i++) {
        //   if (el && el.children[i].innerHTML === '')
        //     el.removeChild(el.children[i]);
        // }
        childNodes.forEach((item) => {
          if (
            item.nodeType === 3 &&
            (item.textContent?.trim() === '' ||
              item.textContent?.trim() === '\n')
          )
            el.removeChild(item);
        });
      }
    }
    recursiveCleaner(el);
    return el;
  },

  savePdf: function () {
    const self = this;
    const saveHtml2PdfBtn = document.querySelector('#html2pdfBtn');

    let element = document.querySelector('main');
    element = self.EmptyNodesCleaner(element);
    if (!element) {
      alert('No element');
      return;
    }

    //alert(element.scrollWidth);

    const opt = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: 'resume_by_html2pdf.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        dpi: 192,
        scale: 1,
        letterRendering: true,
        width: 1120,
        height: 3200,
        putOnlyUsedFonts: true,
        //windowWidth: element.scrollWidth,
        //x: 100,
        y: 825,
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      pagebreak: {
        mode: ['css', 'legacy'],
        after: '.pdfbreak',
        avoid: 'img',
      },
    };

    if (saveHtml2PdfBtn && element)
      saveHtml2PdfBtn.addEventListener('click', (e) => {
        e.preventDefault();
        //alert('ok');
        //html2pdf(document.body);
        //html2pdf(element, opt);

        //this generates correct canvas
        // var canvas1 = html2canvas(element).then((canvas) => {
        //   var div = document.querySelector('.testCanvas');
        //   div.appendChild(canvas);
        //   return canvas;
        // });

        //this generates not correct canvas
        // var worker = html2pdf().set(opt).from(element).toCanvas();
        // worker
        //   .get('canvas')
        //   .then((canvas) => {
        //     //var div = document.querySelector('.testCanvas');
        //     //div.appendChild(canvas);
        //     //!!! canvas1 != canvas
        //   });
        //New Promise-based usage:
        html2pdf().set(opt).from(element).save();
      });
  },
};

document.addEventListener('DOMContentLoaded', function () {
  main.init();
});

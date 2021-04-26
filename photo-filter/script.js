(function() {
  const filters = document.querySelectorAll('input[type="range"]');
  
  /* ADJUSTMENT OF FILTERS FOR IMAGE ============================================================ */

  const updateFilter = (e) => {
    const el = e.currentTarget;
    const suffix = el.dataset.sizing;
    document.documentElement.style.setProperty(`--${el.name}`, el.value + suffix);
    el.nextElementSibling.value = el.value;
  }
 
  filters.forEach(el => el.addEventListener('input', updateFilter));

  /* RESET FILTERS FOR IMAGE ============================================================ */

  const btnReset = document.querySelector('.btn-reset');
  
  btnReset.addEventListener('click', () => {
    filters.forEach(el => {
      const suffix = el.dataset.sizing;
      el.value = el.defaultValue;
      document.documentElement.style.setProperty(`--${el.name}`, el.defaultValue + suffix);
      el.nextElementSibling.value = el.defaultValue;
    }); 
  });

  /* NEXT IMAGE ============================================================ */
  
  const btnNextImg = document.querySelector('.btn-next');
  const image = {
    tag: document.querySelector('img'),
    baseUrl: 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/',
    arr: [
      '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'
    ],
    pointer: 0
  }

  const loadImage = url => {
    const img = new Image();
    img.onload = () => image.tag.src = url;
    img.src = url;
  };

  const getImage = () => {
    const index = image.pointer % image.arr.length;
    const curTime = new Date().getHours();
    let partOfDay = 'morning';

    if (curTime >= 12 && curTime < 18) {
      partOfDay = 'day';
    } else if (curTime >= 18 && curTime < 24) {
      partOfDay = 'evening';
    } else if (curTime >= 0 && curTime < 6) {
      partOfDay = 'night';
    }

    const url = image.baseUrl + partOfDay + '/' + image.arr[index];
    loadImage(url);
    image.tag.setAttribute('crossOrigin', 'anonymous');
    image.pointer++;
  }

  btnNextImg.addEventListener('click', getImage);

  /* UPLOAD IMAGE ============================================================ */

  const btnUploadImg = document.querySelector('.btn-load--input');

  btnUploadImg.addEventListener('change', e => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = () => image.tag.src = reader.result;
    reader.readAsDataURL(file);
  });

  /* DOWNLOAD IMAGE ============================================================ */

  const btnDownloadImg = document.querySelector('.btn-save');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const link = document.createElement('a');

  const drawImage = () => {
    canvas.width = image.tag.naturalWidth;
    canvas.height = image.tag.naturalHeight;

    let filtersStr = '';

    filters.forEach(el => {
      filtersStr += `${ el.name }(${ el.value + el.dataset['sizing'] }) `;
    });

    context.filter = filtersStr;
    context.drawImage(image.tag, 0, 0);
  }

  btnDownloadImg.addEventListener('click', () => {
    drawImage();
    link.download = 'image.jpg';
    link.href = canvas.toDataURL('image/jpeg');
    link.click();
    link.delete;
  });

  /* FULLSCREEN ============================================================ */

  const fullscreen = document.querySelector('.fullscreen');

  fullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
}());
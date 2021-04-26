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

  const reset = document.querySelector('.btn-reset');
  
  reset.addEventListener('click', () => {
    filters.forEach(el => {
      const suffix = el.dataset.sizing;
      el.value = el.defaultValue;
      document.documentElement.style.setProperty(`--${el.name}`, el.defaultValue + suffix);
      el.nextElementSibling.value = el.defaultValue;
    }); 
  });
  
}());
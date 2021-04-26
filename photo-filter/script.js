(function() {
  /* CHANGE FILTER ============================================================ */

  const inputs = document.querySelectorAll('input[type="range"]');

  const handleUpdate = (e) => {
    const el = e.currentTarget;
    const suffix = el.dataset.sizing || '';
    const output = el.value + suffix;
    document.documentElement.style.setProperty(`--${el.name}`, output);
    el.nextElementSibling.value = output;
  }
 
  inputs.forEach(el => el.addEventListener('input', handleUpdate));
}());
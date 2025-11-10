function toggleMenu(){
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  if(!menu) return;
  menu.classList.toggle('open');
  if(icon) icon.classList.toggle('open');
}

// Optional: close menu when clicking outside
document.addEventListener('click', (e)=>{
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  if(!menu) return;
  if(menu.classList.contains('open')){
    if(!menu.contains(e.target) && !(icon && icon.contains(e.target))){
      menu.classList.remove('open');
      if(icon) icon.classList.remove('open');
    }
  }
});

// 响应式导航按钮的交互
const openMainMenu = document.getElementById('openMainMenu');
const closeMainMenu = document.getElementById('closeMainMenu');
const navList = document.getElementById('mobile-menu');

openMainMenu.addEventListener('click', () => {
    navList.classList.toggle('hidden');
});

closeMainMenu.addEventListener('click', () => {
    navList.classList.toggle('hidden');
});
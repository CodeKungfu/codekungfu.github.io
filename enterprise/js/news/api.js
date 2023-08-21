function getNewsList(page=1, pageSize=8, select=0) {
  axios({
    url: 'https://api.lkm8.com/v1/news',
    method: 'get',
    params: {
      page,
      pageSize
    }
  }).then(res => {
    console.log(res.data);
    const news = document.getElementById('news-list');
    // Create the fragment
    const frag = document.createDocumentFragment();
    for (const item of res.data.data.list) {
      const a = document.createElement("a");
      a.className = 'px-2 lg:px-3 xl:px-4';
      a.href = `./news-detail.html?id=${item.id}`;
      const child_img = document.createElement("img");
      child_img.className='w-full h-full';
      child_img.src=item.image;
      const child_div = document.createElement("div");
      child_div.className='relative';
      child_div.appendChild(child_img);
      const child_title = document.createElement("div");
      child_title.className = 'text-black text-xl font-semibold mt-6 md:mt-9 line-clamp-2';
      child_title.innerText=item.title;
      const child_des = document.createElement("div");
      child_des.className='text-black text-sm font-normal mt-6 line-clamp-4';
      child_des.innerText=item.summary;
      a.appendChild(child_div);
      a.appendChild(child_title);
      a.appendChild(child_des);
      frag.appendChild(a);
    }
    news.replaceChildren(frag);
    if (select) {
      history.pushState({
        page,
        pageSize
      }, 'history', location.pathname)
    }
  })
}
function pageSizeChange() {
  const pageSize = document.getElementById('pageSizeSelect');
  const page = new URLSearchParams(window.location.search).get('page')
  console.log(pageSize.value)
  getNewsList(page, pageSize.value, 1)
}
getNewsList()
function getRecommended() {
  axios({
    url: 'https://api.lkm8.com/v1/news?page=1&pageSize=4',
    method: 'get'
  }).then(res => {
    // console.log(res.data)
    const news = document.getElementById('news-recommended')
    // Create the fragment
    const frag = document.createDocumentFragment();
    for (const item of res.data.data.list) {
      const a = document.createElement("a");
      a.className = 'flex-1 w-full px-2';
      a.href = `./news-detail.html?id=${item.id}`;
      const child_img = document.createElement("img");
      child_img.className='left-0 shadow';
      child_img.src=item.image;
      const child_title = document.createElement("div");
      child_title.className = 'left-0 text-white text-xl font-semibold leading-9 line-clamp-2';
      child_title.innerText=item.title
      const child_des = document.createElement("div");
      child_des.className='left-0 text-white text-sm font-normal leading-7 line-clamp-4';
      child_des.innerText=item.des
      a.appendChild(child_img)
      a.appendChild(child_title)
      a.appendChild(child_des)
      frag.appendChild(a)
    }
    news.appendChild(frag)
  })
}
getRecommended()
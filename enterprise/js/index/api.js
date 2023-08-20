function getRecommended() {
  axios({
    url: 'https://www.fastmock.site/mock/899de9c07424960e972a6ae2615eba3f/api/recommended-list',
    method: 'get'
  }).then(res => {
    // console.log(res.data)
    const news = document.getElementById('news-recommended')
    // Create the fragment
    const frag = document.createDocumentFragment();
    for (const item of res.data.data) {
      const a = document.createElement("a");
      a.className = 'flex-1 w-full px-2';
      a.href = `./news-detail.html?id=${item.id}`;
      const child_img = document.createElement("img");
      child_img.className='left-0 shadow';
      child_img.src=item.image;
      const child_title = document.createElement("div");
      child_title.className = 'left-0 text-white text-xl font-semibold leading-9';
      child_title.innerText=item.title
      const child_des = document.createElement("div");
      child_des.className='left-0 text-white text-sm font-normal leading-7';
      child_des.innerText=item.desc
      a.appendChild(child_img)
      a.appendChild(child_title)
      a.appendChild(child_des)
      frag.appendChild(a)
    }
    news.appendChild(frag)
  })
}
getRecommended()
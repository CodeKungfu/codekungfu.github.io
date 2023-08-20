function getNewsList(page=1, page_size=8) {
  axios({
    url: 'https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news',
    method: 'get',
    params: {
      page,
      page_size
    }
  }).then(res => {
    console.log(res.data)
    const news = document.getElementById('news-list')
    // <a class="px-2 lg:px-3 xl:px-4" href="/enterprise-website/newsDetail?id=1">
    //       <div class="relative overflow-hidden">
    //         <img class="preview" src="./images/news/n1.png" alt="" style="filter: blur(10px);">
    //         <img class="absolute top-0 left-0 w-full h-full" src="./images/news/n1.png" alt="">
    //       </div>
    //       <div class="news-title with-2-col text-black text-xl font-semibold mt-6 md:mt-9">022百度AI大会前夕，解读百度大脑的半年“豹变”</div>
    //       <div class="news-content with-4-col text-black text-sm font-normal mt-6">
    //         照以广持上争建只回电那度十再也。维口想矿型区信低常华无当九布往高。见目动界打研开局由今方品转往装。列积消采着行经委张断织争光采参边。设真式音界节它选性理关指期适亲产相。合特非车受没层须得两理许产。</div>
    //     </a>
    // Create the fragment
    const frag = document.createDocumentFragment();
    for (const item of res.data.data) {
      const a = document.createElement("a");
      a.className = 'px-2 lg:px-3 xl:px-4';
      a.href = `./news-detail.html?id=${item.code}`;
      const child_img = document.createElement("img");
      child_img.className='w-full h-full';
      child_img.src=item.img;
      const child_div = document.createElement("div");
      child_div.className='relative'
      child_div.appendChild(child_img)
      const child_title = document.createElement("div");
      child_title.className = 'text-black text-xl font-semibold mt-6 md:mt-9';
      child_title.innerText=item.title
      const child_des = document.createElement("div");
      child_des.className='text-black text-sm font-normal mt-6';
      child_des.innerText=item.keyword
      a.appendChild(child_div)
      a.appendChild(child_title)
      a.appendChild(child_des)
      frag.appendChild(a)
    }
    news.appendChild(frag)
  })
}
getNewsList()
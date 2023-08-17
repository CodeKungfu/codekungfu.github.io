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
    // const news = document.getElementById('news-recommended')
    // // Create the fragment
    // const frag = document.createDocumentFragment();
    // for (const item of res.data.data) {
    //   const div = document.createElement("div");
    //   div.className = 'flex-1 relative';
    //   const child_img = document.createElement("img");
    //   child_img.className='w-[348px] h-[506px] left-0 top-[325px] absolute shadow';
    //   child_img.src=item.image;
    //   const child_title = document.createElement("div");
    //   child_title.className = 'w-[348px] left-0 top-[867px] absolute text-white text-xl font-semibold leading-9';
    //   child_title.innerText=item.title
    //   const child_des = document.createElement("div");
    //   child_des.className='w-[348px] left-0 top-[967px] absolute text-white text-sm font-normal leading-7';
    //   child_des.innerText=item.desc
    //   div.appendChild(child_img)
    //   div.appendChild(child_title)
    //   div.appendChild(child_des)
    //   frag.appendChild(div)
    // }
    // news.appendChild(frag)
  })
}
getNewsList()
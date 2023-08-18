function getRecommended() {
  axios({
    url: 'https://www.fastmock.site/mock/899de9c07424960e972a6ae2615eba3f/api/recommended-list',
    method: 'get'
  }).then(res => {
    // console.log(res.data)
    const news = document.getElementById('news-recommended')
    // Create the fragment
    const frag = document.createDocumentFragment();
    // <a class="flex-1 w-full px-2" href="/enterprise-website/newsDetail?id=1" target="_blank">
		// 		<img class="w-[348px] h-[506px] left-0 shadow" src="./images/index/news2.png">
		// 		<div class="w-[348px] left-0 text-white text-xl font-semibold leading-9">支持触觉反馈，Manus VR推出全新Prime VR手套</div>
		// 		<div class="w-[348px] left-0 text-white text-sm font-normal leading-7">
		// 			第三届国际印刷工业发展论坛（Forum-PI 2013）于2013年5月13日在北京举行，主办方邀请了来自中国、美国、德国、英国、意大利、日本、澳大利亚、俄罗斯、印度、印尼、南非、巴西、
		// 		</div>
		// 	</a>
    for (const item of res.data.data) {
      const a = document.createElement("a");
      a.className = 'flex-1 w-full px-2';
      const child_img = document.createElement("img");
      child_img.className='w-[348px] h-[506px] left-0 shadow';
      child_img.src=item.image;
      const child_title = document.createElement("div");
      child_title.className = 'w-[348px] left-0 text-white text-xl font-semibold leading-9';
      child_title.innerText=item.title
      const child_des = document.createElement("div");
      child_des.className='w-[348px] left-0 text-white text-sm font-normal leading-7';
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
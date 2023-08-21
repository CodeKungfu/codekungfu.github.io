
function getNewsDetail() {
  const id = new URLSearchParams(window.location.search).get('id')
  if (!id){
    return
  }
  axios({
    url: `https://api.lkm8.com/v1/news/${id}`,
    method: 'get'
  }).then(res => {
    console.log(res.data.data);
    const item = res.data.data;
  //   <div id="news-detail" class="w-full px-4 md:px-20 lg:px-32 xl:px-44">
  //   <div class="relative">
  //     <img class="w-full" alt="" src="./images/news-detail/1.png">
  //   </div>
  //   <div class="mt-8 md:mt-14 text-black text-base md:text-base lg:text-xl xl:text-2xl font-normal leading-14 md:leading-7 text-center">把小我融入大我，立志作出我们这一代人的历史贡献</div>
  //   <div class="mt-4 md:mt-8 text-zinc-400 text-base md:text-xl font-normal leading-14 md:leading-7 text-center">2022年05月24日11:35　来源：人民日报</div>
  //   <div class="mt-4 md:mt-8 text-neutral-700 text-sm font-normal leading-14 md:leading-7 indent-8">
  //     2019年1月17日，习近平总书记来到天津南开大学考察调研。在元素有机化学国家重点实验室，总书记勉励师生们把学习奋斗的具体目标同民族复兴的伟大目标结合起来，把小我融入大我，立志作出我们这一代人的历史贡献。
  //       正是总书记的谆谆教诲，让南开大学化学学院有机化学专业博士研究生吴雄，坚定了攻读博士学位的信心。3年来，吴雄心无旁骛地投身科研，“作为一名新时代青年，能够为国家作出力所能及的贡献，就是无上荣光”。
  //       习近平总书记来到南开大学当天，广场上挤满了学生，大家高呼“总书记好”“总书记辛苦”，齐声高喊“爱我中华、振兴中华”，还唱起《我和我的祖国》。
  //       在南开大学，习近平总书记指出，爱国主义是中华民族的民族心、民族魂，培养社会主义建设者和接班人，首先要培养学生的爱国情怀。高校党组织要把抓好学校党建工作和思想政治工作作为办学治校的基本功。
  //   </div>
  //   <div class="my-12 text-neutral-700 text-sm font-normal leading-7 indent-8">本报记者 武少民【编辑:孙静波】</div>
  // </div>

    const newsDetail = document.getElementById('news-detail');
    // // Create the fragment
    const frag = document.createDocumentFragment();
    const child_img = document.createElement("img");
    child_img.className='w-full h-full';
    child_img.src=item.image;
    const child_div = document.createElement("div");
    child_div.className='relative';
    child_div.appendChild(child_img);
    const child_title = document.createElement("div");
    child_title.className = 'mt-8 md:mt-14 text-black text-base md:text-base lg:text-xl xl:text-2xl font-normal leading-14 md:leading-7 text-center';
    child_title.innerText=item.title;
    const child_info = document.createElement("div");
    child_info.className='mt-4 md:mt-8 text-zinc-400 text-base md:text-xl font-normal leading-14 md:leading-7 text-center';
    child_info.innerText=`${item.created_at}　来源：${item.source}`;

    const child_desc = document.createElement("div");
    child_desc.className = 'mt-4 md:mt-8 text-neutral-700 text-sm font-normal leading-14 md:leading-7 indent-8';
    child_desc.innerText=item.des;

    const child_bottom = document.createElement("div");
    child_bottom.className = 'my-12 text-neutral-700 text-sm font-normal leading-7 indent-8';
    child_bottom.innerText=`本报记者 ${item.author}【编辑:${item.editor}】`;

    frag.appendChild(child_div)
    frag.appendChild(child_title)
    frag.appendChild(child_info)
    frag.appendChild(child_desc)
    frag.appendChild(child_bottom)
    newsDetail.appendChild(frag)
  })
}
getNewsDetail()
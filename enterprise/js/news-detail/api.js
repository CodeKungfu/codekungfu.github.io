
function getNewsDetail() {
  const code = new URLSearchParams(window.location.search).get('id')
  if (!code){
    return
  }
  axios({
    url: `https://www.fastmock.site/mock/d8c33ca26a546a3c9be78ee13f714990/t1-0fficial/api/news/${code}`,
    method: 'get'
  }).then(res => {
    console.log(res.data)
    // <img class="w-full" alt="" src="./images/news-detail/1.png">
    //     <div class="mt-14 text-black text-4xl font-normal leading-7 text-center">把小我融入大我，立志作出我们这一代人的历史贡献</div>
    //     <div class="mt-8 text-zinc-400 text-xl font-normal leading-7 text-center">2022年05月24日11:35　来源：人民日报</div>
    //     <div class="mt-8 text-neutral-700 text-sm font-normal leading-7 indent-8">
    //       2019年1月17日，习近平总书记来到天津南开大学考察调研。在元素有机化学国家重点实验室，总书记勉励师生们把学习奋斗的具体目标同民族复兴的伟大目标结合起来，把小我融入大我，立志作出我们这一代人的历史贡献。
    //         正是总书记的谆谆教诲，让南开大学化学学院有机化学专业博士研究生吴雄，坚定了攻读博士学位的信心。3年来，吴雄心无旁骛地投身科研，“作为一名新时代青年，能够为国家作出力所能及的贡献，就是无上荣光”。
    //         习近平总书记来到南开大学当天，广场上挤满了学生，大家高呼“总书记好”“总书记辛苦”，齐声高喊“爱我中华、振兴中华”，还唱起《我和我的祖国》。
    //         在南开大学，习近平总书记指出，爱国主义是中华民族的民族心、民族魂，培养社会主义建设者和接班人，首先要培养学生的爱国情怀。高校党组织要把抓好学校党建工作和思想政治工作作为办学治校的基本功。
    //     </div>
    //     <div class="my-12 text-neutral-700 text-sm font-normal leading-7 indent-8">本报记者 武少民【编辑:孙静波】</div>

    // const news = document.getElementById('news-detail')
    // // Create the fragment
    // const frag = document.createDocumentFragment();
    // for (const item of res.data.data) {
    //   const a = document.createElement("a");
    //   a.className = 'px-2 lg:px-3 xl:px-4';
    //   a.href = `./news-detail.html?id=${item.code}`;
    //   const child_img = document.createElement("img");
    //   child_img.className='w-full h-full';
    //   child_img.src=item.img;
    //   const child_div = document.createElement("div");
    //   child_div.className='relative'
    //   child_div.appendChild(child_img)
    //   const child_title = document.createElement("div");
    //   child_title.className = 'text-black text-xl font-semibold mt-6 md:mt-9';
    //   child_title.innerText=item.title
    //   const child_des = document.createElement("div");
    //   child_des.className='text-black text-sm font-normal mt-6';
    //   child_des.innerText=item.keyword
    //   a.appendChild(child_div)
    //   a.appendChild(child_title)
    //   a.appendChild(child_des)
    //   frag.appendChild(a)
    // }
    // news.appendChild(frag)
  })
}
getNewsDetail()
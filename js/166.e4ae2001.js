"use strict";(self["webpackChunkbook_information_system"]=self["webpackChunkbook_information_system"]||[]).push([[166],{4593:function(t,o,e){e.r(o),e.d(o,{default:function(){return D}});var i=e(3396),s=e(4870),n=e(3824),a=e(678),r=e(4997),l=e(1574),c=e(7139);const u={class:"book_info_block_root"},d={class:"img_wrap"},w=["src"],m={class:"info_wrap"},p={class:"title"},v={class:"author"};var _=(0,i.aZ)({props:{title:{type:String,required:!0},author:{type:String,required:!0},imgUrl:{type:String,required:!0}},setup(t){const o=t;return(t,e)=>((0,i.wg)(),(0,i.iD)("div",u,[(0,i._)("div",d,[(0,i._)("img",{class:"img",src:o.imgUrl},null,8,w)]),(0,i._)("div",m,[(0,i._)("div",p,(0,c.zw)(o.title),1),(0,i._)("div",v,(0,c.zw)(o.author),1)])]))}}),h=e(89);const g=(0,h.Z)(_,[["__scopeId","data-v-fb650702"]]);var f=g,k=e(9813),b=e(4671);const y={class:"home_view_root"},Z={class:"main"},C={name:n.u.homeView};var I=(0,i.aZ)({...C,setup(t){const o="https://picsum.photos/800/600",{pageSetting:e,bookInfoGroup:c,getBooksInfo:u,initBooksInfo:d}=(0,b.Z)(),w=(0,a.tv)(),m=t=>{const o=p(t);w.push({name:n.u.detailView,params:{id:o}})},p=t=>{const o=t.split("/")[2];return o},v=async t=>{const{data:o}=await r.cl(t);d(),m(o["@id"])};let _=(0,s.iH)(!1);const h=async()=>{if(_.value)return;e.value.hasNextPage||window.removeEventListener("scroll",h);const{scrollY:t}=window,o=window.screen.height,i=document.body.scrollHeight,s=t+o>=i;s&&(_.value=!0,await u(),_.value=!1)};return window.addEventListener("scroll",h),(t,e)=>((0,i.wg)(),(0,i.iD)("div",y,[(0,i.Wm)(l.Z,{title:"The book shelf"},{right:(0,i.w5)((()=>[(0,i.Wm)(k.Z,{"button-text":"Create","onCreate:bookInfo":v})])),_:1}),(0,i._)("main",Z,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)((0,s.SU)(c),(t=>((0,i.wg)(),(0,i.iD)("div",{class:"block_wrap",key:t.isbn},[(0,i.Wm)(f,{title:t.title,author:t.author,"img-url":o,onClick:o=>m(t.id)},null,8,["title","author","onClick"])])))),128))])]))}});const S=(0,h.Z)(I,[["__scopeId","data-v-23b495bf"]]);var D=S}}]);
//# sourceMappingURL=166.e4ae2001.js.map
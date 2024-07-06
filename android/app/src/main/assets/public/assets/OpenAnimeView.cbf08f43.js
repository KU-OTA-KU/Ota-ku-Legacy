import{a as F}from"./axios.0ae12843.js";import{_ as k,o as T,c as I}from"./index.cb39529a.js";import{m as U}from"./moment-timezone.5878a603.js";import{d as C,Z as c,o as e,_ as t,X as u,a1 as s,U as o,F as f,a2 as D,Y as p,W as w,a3 as l,a6 as A}from"./@vue.0cfbf478.js";import{a as h,o as x,p as y,q as g,D as Y,E as H,d as L,i as z,V as q,f as b,F as R,r as j,u as M,w as B,b as E,l as N}from"./vuetify.c68a7f87.js";import"./@capacitor.20c08726.js";import"./vue-router.4615551b.js";import"./nprogress.bb8fb4be.js";import"./moment.04b2d170.js";import"./vuex.a4e772ac.js";/* empty css             */function O(i,a){return console.log(i),console.log(a),i==="\u043D\u0435\u0442\u0443"?"\u043D\u0435\u0442\u0443":U(i).tz(a).calendar(null,{sameDay:"[\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0432]  HH:mm",nextDay:"[\u0417\u0430\u0432\u0442\u0440\u0430 \u0432] HH:mm",nextWeek:"DD.MM.YYYY [\u0432] HH:mm",sameElse:"DD.MM.YYYY [\u0432] HH:mm"})}const S=C({name:"ota-ku-advertising-banner",props:{blockId:String,renderTo:String},mounted(){window.yaContextCb.push(()=>{Ya.Context.AdvManager.render({blockId:this.blockId,renderTo:this.renderTo})})}}),G=["id"];function P(i,a,r,v,n,d){return u(),c("section",null,[e(h,{style:{"max-width":"var(--ota-ku-max-width)",padding:"0 10px 10px 10px","align-items":"center"}},{default:t(()=>[s("div",{id:this.renderTo},null,8,G)]),_:1})])}const W=k(S,[["render",P]]),X=C({name:"",props:{screenshots:[]}});function J(i,a,r,v,n,d){return u(),c("section",null,[e(h,{style:{"max-width":"var(--ota-ku-max-width)",padding:"10px 10px 10px 10px","align-items":"center"}},{default:t(()=>[e(x,{rounded:"lg",variant:"text",class:"ota-anime-containers"},{default:t(()=>[e(y,{class:"ota-anime-containers-v-title pa-0"},{default:t(()=>[o("\u041A\u0430\u0434\u0440\u044B")]),_:1}),e(g,{class:"ota-anime-containers-v-subtitle pa-0"},{default:t(()=>[o("\u0422\u043E\u043F \u043A\u0430\u0434\u0440\u044B \u0438\u0437 \u0430\u043D\u0438\u043C\u0435")]),_:1}),e(Y,{class:"slide-group-gallery"},{default:t(()=>[(u(!0),c(f,null,D(i.screenshots,(_,V)=>(u(),p(H,null,{default:t(()=>[e(L,{width:"250","aspect-ratio":"1.6",rounded:"lg",cover:"",class:"ma-xxl-2 ma-xl-2 ma-lg-2 ma-md-1 ma-sm-1 ma-1","lazy-src":_,src:_},null,8,["lazy-src","src"])]),_:2},1024))),256))]),_:1})]),_:1})]),_:1})])}const K=k(X,[["render",J]]),Q=C({name:"OpenAnimePlayer",props:{currentAnime:{type:Number,required:!0}},data(){return{currentAnimeVoice:610}}}),Z={style:{width:"100%","aspect-ratio":"177 / 100","border-radius":"10px",overflow:"hidden"}},ee=["src"];function te(i,a,r,v,n,d){return u(),c("section",null,[e(h,{style:{"max-width":"var(--ota-ku-max-width)",padding:"0 10px 10px 10px","align-items":"center"}},{default:t(()=>[s("div",Z,[s("iframe",{src:"//kodik.cc/find-player?shikimoriID="+i.currentAnime+"&prioritizeTranslations=["+i.currentAnimeVoice+"]&blockInCountries=turkey,azerbadjan&types=anime,anime-serial",width:"100%",height:"100%",frameborder:"0",allowfullscreen:"",allow:"autoplay *; fullscreen *"},null,8,ee)])]),_:1})])}const se=k(Q,[["render",te]]),ne={components:{Banner:W,OpenAnimeGallery:K,OpenAnimePlayer:se},mounted(){const i=this.$route.query.animeId;this.locale=U.tz.guess(),i?(this.fetchAnime(i),this.currentAnime=i):this.goBack(),this.$watch(()=>this.$route.query.animeId,(a,r)=>{a!==r&&(this.fetchAnime(a),this.currentAnime=a)})},data(){return{animeList:null,currentAnime:"",genres:[],studios:[],screenshots:[],locale:"ru",mostList:[],openAnime:T}},methods:{formatDate:O,cleanDescription:I,async fetchAnime(i){try{const a=await F.post("https://shikimori.one/api/graphql",{query:`
                        query {
                          animes(ids: "${i}" limit: 1) {
                            name
                            russian
                            english
                            episodes
                            kind
                            status
                            description
                            nextEpisodeAt
                            genres { id russian }
                            studios { id name }
                            poster { originalUrl miniUrl mainUrl main2xUrl}
                            screenshots { id x332Url }
                            related { id anime { id russian poster { main2xUrl } } relationRu }
                          }
                        }
                    `},{headers:{"Content-Type":"application/json",Accept:"application/json"}});a.status!==200?this.$router.push("/error"):(this.animeList=a.data.data.animes[0],this.genres=this.animeList.genres.map(r=>r.russian),this.studios=this.animeList.studios.map(r=>r.name),this.screenshots=this.animeList.screenshots.map(r=>r.x332Url),this.relatedAnime=this.animeList.related.filter(r=>r.anime!==null).map(r=>({id:r.anime.id,russian:r.anime.russian,main2xUrl:r.anime.poster.main2xUrl,relationRu:r.relationRu})))}catch{this.$router.push("/error")}},goBack(){window.history.back()}}};const ie={class:"position-relative"},ae=s("div",{class:"anime-background-shadow position-absolute top-0"},null,-1),re={style:{width:"25%"},class:"name-and-other-anime-poster"},oe={style:{"font-size":"0.9em"}},ue={style:{"font-size":"0.9em"}},le={style:{"font-size":"0.9em"}},me={key:0,style:{"font-size":"0.9em"}},ce={style:{"font-size":"0.9em"}},de={style:{"font-size":"0.9em"}},pe={style:{"font-size":"0.9em"}},he=s("div",{class:"position-absolute d-flex",style:{"background-color":"#121212","align-items":"center","justify-content":"center","z-index":"1010",width:"100vw",height:"100dvh"}},[s("div",{class:"loader"})],-1);function _e(i,a,r,v,n,d){const _=w("banner"),V=w("open-anime-gallery"),$=w("open-anime-player");return u(),c(f,null,[e(z,null,{default:t(()=>[e(q,{elevation:0,color:"transparent","scroll-behavior":"hide"},{prepend:t(()=>[e(b,{icon:"mdi-arrow-left",variant:"tonal",theme:"customDarkTheme",rounded:"lg",onClick:a[0]||(a[0]=m=>d.goBack())})]),append:t(()=>[e(b,{icon:"mdi-home",variant:"tonal",theme:"customDarkTheme",rounded:"lg",class:"mr-3",onClick:a[1]||(a[1]=m=>this.$router.push("/"))}),e(b,{icon:"mdi-dots-vertical",variant:"tonal",theme:"customDarkTheme",rounded:"lg",disabled:""})]),_:1})]),_:1}),e(z,null,{default:t(()=>[n.animeList&&n.animeList.poster&&n.currentAnime?(u(),p(B,{key:0},{default:t(()=>[s("section",ie,[e(R,{src:n.animeList.poster.originalUrl,width:"100%",cover:"",class:"anime-background-image"},null,8,["src"]),ae]),s("section",null,[e(h,{style:{"max-width":"var(--ota-ku-max-width)",padding:"0 10px 10px 10px"},class:"d-flex ga-5"},{default:t(()=>[s("div",re,[e(L,{rounded:"lg","aspect-ratio":"0.7",cover:"","lazy-src":n.animeList.poster.miniUrl,src:n.animeList.poster.main2xUrl},null,8,["lazy-src","src"])]),e(x,{variant:"text",style:{width:"75%"},class:"name-and-other-anime-information"},{default:t(()=>[e(y,{class:"text-wrap pa-0 pb-1"},{default:t(()=>[o(l(n.animeList.russian),1)]),_:1}),e(g,{class:"text-wrap pa-0 pb-2",style:{"font-size":"0.9em"}},{default:t(()=>[o(l(n.animeList.english)+" / "+l(n.animeList.name),1)]),_:1}),e(j,{class:"text-wrap pa-0 pb-2 d-flex flex-column ga-2 anime-and-other-info-v-card-text"},{default:t(()=>[s("span",oe,[o("\u0422\u0438\u043F: "),s("i",null,l(n.animeList.kind),1)]),s("span",ue,[o("\u042D\u043F\u0438\u0437\u043E\u0434\u044B: "),s("i",null,l(n.animeList.episodes),1)]),s("span",le,[o("\u0421\u0442\u0430\u0442\u0443\u0441: "),s("i",null,l(n.animeList.status),1)]),n.animeList.nextEpisodeAt!=null?(u(),c("span",me,[o("\u0421\u043B\u0435\u0434\u0443\u044E\u0448\u0438\u0439 \u044D\u043F\u0438\u0437\u043E\u0434: "),s("i",null,l(d.formatDate(n.animeList.nextEpisodeAt,n.locale))+" \u043F\u043E "+l(n.locale),1)])):A("",!0),s("span",ce,[o("\u0416\u0430\u043D\u0440\u044B: "),s("i",null,l(n.genres.join(", ")),1)]),s("span",de,[o("\u0421\u0442\u0443\u0434\u0438\u0438: "),s("i",null,l(n.studios.join(", ")),1)]),s("span",pe,[o("\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435: "),s("i",null,l(d.cleanDescription(n.animeList.description)),1)])]),_:1})]),_:1})]),_:1})]),e(_,{blockId:"R-A-7609325-1",renderTo:"yandex_rtb_R-A-7609325-1"}),this.screenshots.length!==0?(u(),p(V,{key:0,screenshots:this.screenshots},null,8,["screenshots"])):A("",!0),this.currentAnime?(u(),p($,{key:1,currentAnime:this.currentAnime},null,8,["currentAnime"])):A("",!0),s("section",null,[e(h,{style:{"max-width":"var(--ota-ku-max-width)",padding:"0 10px 10px 10px","align-items":"center"}},{default:t(()=>[e(x,{variant:"text",rounded:"lg",class:"ota-anime-containers"},{default:t(()=>[e(y,{class:"ota-anime-containers-v-title pa-0"},{default:t(()=>[o("\u041F\u043E\u0445\u043E\u0436\u044B\u0435 \u0440\u0435\u043B\u0438\u0437\u044B")]),_:1}),e(g,{class:"ota-anime-containers-v-subtitle pa-0"},{default:t(()=>[o("\u0410\u043D\u0438\u043C\u0435 \u0438 \u0444\u0438\u043B\u044C\u043C\u044B \u0441\u0432\u044F\u0437\u0435\u043D\u044B\u0435 \u0441 \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u043E\u0439")]),_:1}),e(M,{"no-gutters":""},{default:t(()=>[i.relatedAnime.length===0?(u(),c(f,{key:0},D(4,m=>e(E,{cols:"6",xxl:"3",xl:"3",lg:"3",md:"4",sm:"4",xs:"5",class:"pa-2"},{default:t(()=>[e(N,{type:"image, list-item-two-line"})]),_:1})),64)):(u(!0),c(f,{key:1},D(i.relatedAnime,m=>(u(),p(E,{cols:"6",xxl:"3",xl:"3",lg:"3",md:"4",sm:"4",xs:"5",class:"pa-1 pa-xs-1 pa-sm-1 pa-md-2 pa-lg-2 pa-xl-2 pa-xxl-2",onClick:fe=>{this.openAnime(m.id)}},{default:t(()=>[e(x,{link:"",variant:"text"},{default:t(()=>[e(L,{width:"100%","aspect-ratio":"1.6",rounded:"lg",cover:"","lazy-src":m.main2xUrl,src:m.main2xUrl},null,8,["lazy-src","src"]),e(y,{class:"pa-0 pt-2",style:{"font-size":"0.9em"}},{default:t(()=>[o(l(m.russian),1)]),_:2},1024),e(g,{class:"pa-0 pt-1",style:{"font-size":"0.8em"}},{default:t(()=>[o(l(m.relationRu),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"]))),256))]),_:1})]),_:1})]),_:1})])]),_:1})):(u(),p(B,{key:1},{default:t(()=>[he]),_:1}))]),_:1})],64)}const Ve=k(ne,[["render",_e]]);export{Ve as default};

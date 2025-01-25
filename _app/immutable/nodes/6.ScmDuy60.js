import{s as Re,a as me,e as qe,n as ze}from"../chunks/BIf046HQ.js";import{S as We,i as Je,k as Ze,l as Ke,m as Ne,n as Qe,o as Ve,p as Xe,e as o,s as i,H as ce,c as r,q as u,f as a,r as he,u as x,g as l,d as s}from"../chunks/CEBVHJ3f.js";import{P as Ye,g as et,a as Oe}from"../chunks/KoCA0eQa.js";function tt(O){let n,f="<p>Picture: Gaël G.</p>",h,p,d='<a href="#introduction">Introduction</a>',c,m,fe="If you’re like me, you probably have an old <strong>Mac mini</strong> lying around that you no longer use. Instead of letting it gather dust, why not recycle it into a home server? That’s exactly what I did with my <strong>2011 Mac mini</strong>, and I’m happy to share the process with you.",J,v,ve='<a href="#hardware-upgrade">Hardware upgrade</a>',Z,H,ye='First, I replaced the hard drive with an SSD. This decade-old device originally had 2GB of RAM, but I had already upgraded it to 8GB at the time. The SSD upgrade gave the machine a much-needed boost in speed and performance, making it more suitable for use as a home server. The whole thing is powered by an i5-2415M CPU from Intel Sandy Bridge architecture family. See technical specifications for more details: <a href="https://support.apple.com/kb/sp632" rel="nofollow noopener noreferrer external" target="_blank">Mac mini (Mid 2011) - Technical Specifications</a>',K,y,we='<a href="#set-up">Set up</a>',N,w,ge='<a href="#operating-system">Operating system</a>',Q,M,Fe='MacOS 10.13.6 High Sierra is the most recent and up-to-date OS that my mini can run. I replaced the operating system that is <a href="https://endoflife.date/macos" rel="nofollow noopener noreferrer external" target="_blank">no longer supported by Apple</a> with an Ubuntu 22.04 Server. This gave me access to all the latest server-side technologies and tools, and it also allowed me to customize the system to my liking.',V,g,be='<a href="#reboot-on-power-failure">Reboot on power failure</a>',X,k,_e="My Mac mini will automatically start up after a power failure, allowing me to boot my home server without manual intervention. On my Ubuntu system, I configured the kernel to automatically reboot after a power failure by using the following command:",Y,$,je=`<pre class="shiki material-default with-title" style="background-color: #263238; color: #EEFFFF" sh="true" title="/usr/local/bin/boot-on-power.sh"><div class='code-title'>/usr/local/bin/boot-on-power.sh</div><div class="language-id">sh</div><div class='code-container'><code><div class='line'><span style="color: #546E7A">#!/bin/bash</span></div><div class='line'><span style="color: #EEFFFF">setpci -s 0:1f.0 0xa4.b=0h</span></div></code></div></pre>`,j,T,xe='To my delight, the technique explains in this 2011 Blog post <a href="https://smackerelofopinion.blogspot.com/2011/09/mac-mini-rebooting-tweaks-setpci-s-01f0.html?showComment=1364653744596#c121835951350041303" rel="nofollow noopener noreferrer external" target="_blank">Mac Mini rebooting tweaks: setpci -s 0:1f.0 0xa4.b=0</a> worked perfectly for me and I was able to solve my problem quickly and efficiently. I would highly recommend checking out the article I mentioned. It provides a wealth of information on why I have changed theses values.',ee,C,He="Unfortunately, this kernel tweak won’t stick around forever. Upon your next restart, the kernel will go back to its default settings and you’ll have to reapply the change. But hey, no worries! With a little bit of effort, you can make this tweak a permanent fixture in your setup.",te,L,Me="Ubuntu 22.04 is built on Systemd, so the most straightforward and suggested method for executing a script on startup is to create a Systemd service file. This allows you to run scripts, such as bash or python, through the service when the system boots. Here’s how to run my boot <code>boot-on-power.sh</code> script:",le,E,ke="<li><p>Create a new service file <code>/etc/systemd/system/your-service-name.service</code></p></li> <li><p>Enter the following content into the file, replacing “your-script.sh” with the path to your script and “User” with the username under which you want to run the script:</p></li>",se,A,Ae=`<pre class="shiki material-default" style="background-color: #263238; color: #EEFFFF" sh="true"><div class="language-id">sh</div><div class='code-container'><code><div class='line'><span style="color: #89DDFF">[</span><span style="color: #EEFFFF">Unit</span><span style="color: #89DDFF">]</span></div><div class='line'><span style="color: #EEFFFF">After=network.target</span></div><div class='line'></div><div class='line'><span style="color: #89DDFF">[</span><span style="color: #EEFFFF">Service</span><span style="color: #89DDFF">]</span></div><div class='line'><span style="color: #EEFFFF">ExecStart=/usr/local/bin/boot-on-power.sh</span></div><div class='line'></div><div class='line'><span style="color: #89DDFF">[</span><span style="color: #EEFFFF">Install</span><span style="color: #89DDFF">]</span></div><div class='line'><span style="color: #EEFFFF">WantedBy=default.target</span></div></code></div></pre>`,B,I,Te="<li>Set correct permissions on both files</li>",ie,G,Be=`<pre class="shiki material-default" style="background-color: #263238; color: #EEFFFF" sh="true"><div class="language-id">sh</div><div class='code-container'><code><div class='line'><span style="color: #EEFFFF">sudo chmod 744 /usr/local/bin/boot-on-power.sh</span></div><div class='line'><span style="color: #EEFFFF">sudo chmod 664 /etc/systemd/system/enabled-startup-on-power.service</span></div></code></div></pre>`,R,S,Ce="<li>Reload the Systemd daemon to recognize the new service file with the following command</li>",ae,z,Ge=`<pre class="shiki material-default" style="background-color: #263238; color: #EEFFFF" sh="true"><div class="language-id">sh</div><div class='code-container'><code><div class='line'><span style="color: #EEFFFF">sudo systemctl daemon-reload</span></div><div class='line'><span style="color: #EEFFFF">sudo systemctl </span><span style="color: #82AAFF">enable</span><span style="color: #EEFFFF"> enabled-startup-on-power.service</span></div></code></div></pre>`,W,F,Le='<a href="#containers">Containers</a>',ne,P,Ee="The resource constraints in my home lab prevent me from running multiple virtual machines using solutions like Proxmox or VMWare. In other words, my home lab setup doesn’t have the juice to handle that kind of setup.",oe,U,Ie="As a home server administrator, I have always strived to keep my infrastructure as easy and simple as possible. One way I have found to do this is by using containers to run all of my services. With containers, you can simply pull down the images you need and run them on your server. This makes it much easier to set up and manage multiple services on a single host. A future article will present you the services that are installed on my server.",re,b,Se='<a href="#final-thoughts">Final thoughts</a>',ue,D,Pe="Overall, turning my old Mac mini into a home server was a fun and rewarding project. Not only did it give my old machine a new lease on life, but it also provided me with a powerful and reliable home server that I can use for all sorts of tasks. If you have an old Mac mini that you’re not using, I highly recommend giving a second life to your old device a try as a Home!",de,_,Ue='<a href="#useful-resources-">Useful resources ✨</a>',pe,q,De='<li><a href="https://smackerelofopinion.blogspot.com/2011/09/mac-mini-rebooting-tweaks-setpci-s-01f0.html?showComment=1364653744596#c121835951350041303" rel="nofollow noopener noreferrer external" target="_blank">Mac Mini rebooting tweaks: setpci -s 0:1f.0 0xa4.b=0</a></li> <li><a href="https://linuxconfig.org/how-to-run-script-on-startup-on-ubuntu-22-04-jammy-jellyfish-server-desktop" rel="nofollow noopener noreferrer external" target="_blank">How to run script on startup on Ubuntu 22.04 Jammy Jellyfish Server/Desktop</a></li>';return{c(){n=o("blockquote"),n.innerHTML=f,h=i(),p=o("h2"),p.innerHTML=d,c=i(),m=o("p"),m.innerHTML=fe,J=i(),v=o("h2"),v.innerHTML=ve,Z=i(),H=o("p"),H.innerHTML=ye,K=i(),y=o("h2"),y.innerHTML=we,N=i(),w=o("h3"),w.innerHTML=ge,Q=i(),M=o("p"),M.innerHTML=Fe,V=i(),g=o("h3"),g.innerHTML=be,X=i(),k=o("p"),k.textContent=_e,Y=i(),$=new ce(!1),j=i(),T=o("p"),T.innerHTML=xe,ee=i(),C=o("p"),C.textContent=He,te=i(),L=o("p"),L.innerHTML=Me,le=i(),E=o("ul"),E.innerHTML=ke,se=i(),A=new ce(!1),B=i(),I=o("ul"),I.innerHTML=Te,ie=i(),G=new ce(!1),R=i(),S=o("ul"),S.innerHTML=Ce,ae=i(),z=new ce(!1),W=i(),F=o("h2"),F.innerHTML=Le,ne=i(),P=o("p"),P.textContent=Ee,oe=i(),U=o("p"),U.textContent=Ie,re=i(),b=o("h2"),b.innerHTML=Se,ue=i(),D=o("p"),D.textContent=Pe,de=i(),_=o("h2"),_.innerHTML=Ue,pe=i(),q=o("ul"),q.innerHTML=De,this.h()},l(e){n=r(e,"BLOCKQUOTE",{"data-svelte-h":!0}),u(n)!=="svelte-1mdymf7"&&(n.innerHTML=f),h=a(e),p=r(e,"H2",{id:!0,"data-svelte-h":!0}),u(p)!=="svelte-ccveyw"&&(p.innerHTML=d),c=a(e),m=r(e,"P",{"data-svelte-h":!0}),u(m)!=="svelte-1y15kl"&&(m.innerHTML=fe),J=a(e),v=r(e,"H2",{id:!0,"data-svelte-h":!0}),u(v)!=="svelte-nr5h9g"&&(v.innerHTML=ve),Z=a(e),H=r(e,"P",{"data-svelte-h":!0}),u(H)!=="svelte-msm3lk"&&(H.innerHTML=ye),K=a(e),y=r(e,"H2",{id:!0,"data-svelte-h":!0}),u(y)!=="svelte-1rgn96p"&&(y.innerHTML=we),N=a(e),w=r(e,"H3",{id:!0,"data-svelte-h":!0}),u(w)!=="svelte-t1et7m"&&(w.innerHTML=ge),Q=a(e),M=r(e,"P",{"data-svelte-h":!0}),u(M)!=="svelte-cvi9t6"&&(M.innerHTML=Fe),V=a(e),g=r(e,"H3",{id:!0,"data-svelte-h":!0}),u(g)!=="svelte-gcr30r"&&(g.innerHTML=be),X=a(e),k=r(e,"P",{"data-svelte-h":!0}),u(k)!=="svelte-knnfrk"&&(k.textContent=_e),Y=a(e),$=he(e,!1),j=a(e),T=r(e,"P",{"data-svelte-h":!0}),u(T)!=="svelte-b0svk"&&(T.innerHTML=xe),ee=a(e),C=r(e,"P",{"data-svelte-h":!0}),u(C)!=="svelte-19lttw4"&&(C.textContent=He),te=a(e),L=r(e,"P",{"data-svelte-h":!0}),u(L)!=="svelte-dbh7q4"&&(L.innerHTML=Me),le=a(e),E=r(e,"UL",{"data-svelte-h":!0}),u(E)!=="svelte-1x4hj9m"&&(E.innerHTML=ke),se=a(e),A=he(e,!1),B=a(e),I=r(e,"UL",{"data-svelte-h":!0}),u(I)!=="svelte-1bvcggs"&&(I.innerHTML=Te),ie=a(e),G=he(e,!1),R=a(e),S=r(e,"UL",{"data-svelte-h":!0}),u(S)!=="svelte-kt7b98"&&(S.innerHTML=Ce),ae=a(e),z=he(e,!1),W=a(e),F=r(e,"H2",{id:!0,"data-svelte-h":!0}),u(F)!=="svelte-kjbcgw"&&(F.innerHTML=Le),ne=a(e),P=r(e,"P",{"data-svelte-h":!0}),u(P)!=="svelte-6fhs0z"&&(P.textContent=Ee),oe=a(e),U=r(e,"P",{"data-svelte-h":!0}),u(U)!=="svelte-mf5jp8"&&(U.textContent=Ie),re=a(e),b=r(e,"H2",{id:!0,"data-svelte-h":!0}),u(b)!=="svelte-2qh8hi"&&(b.innerHTML=Se),ue=a(e),D=r(e,"P",{"data-svelte-h":!0}),u(D)!=="svelte-f8a0n5"&&(D.textContent=Pe),de=a(e),_=r(e,"H2",{id:!0,"data-svelte-h":!0}),u(_)!=="svelte-z3y4n5"&&(_.innerHTML=Ue),pe=a(e),q=r(e,"UL",{"data-svelte-h":!0}),u(q)!=="svelte-qxxlad"&&(q.innerHTML=De),this.h()},h(){x(p,"id","introduction"),x(v,"id","hardware-upgrade"),x(y,"id","set-up"),x(w,"id","operating-system"),x(g,"id","reboot-on-power-failure"),$.a=j,A.a=B,G.a=R,z.a=W,x(F,"id","containers"),x(b,"id","final-thoughts"),x(_,"id","useful-resources-")},m(e,t){l(e,n,t),l(e,h,t),l(e,p,t),l(e,c,t),l(e,m,t),l(e,J,t),l(e,v,t),l(e,Z,t),l(e,H,t),l(e,K,t),l(e,y,t),l(e,N,t),l(e,w,t),l(e,Q,t),l(e,M,t),l(e,V,t),l(e,g,t),l(e,X,t),l(e,k,t),l(e,Y,t),$.m(je,e,t),l(e,j,t),l(e,T,t),l(e,ee,t),l(e,C,t),l(e,te,t),l(e,L,t),l(e,le,t),l(e,E,t),l(e,se,t),A.m(Ae,e,t),l(e,B,t),l(e,I,t),l(e,ie,t),G.m(Be,e,t),l(e,R,t),l(e,S,t),l(e,ae,t),z.m(Ge,e,t),l(e,W,t),l(e,F,t),l(e,ne,t),l(e,P,t),l(e,oe,t),l(e,U,t),l(e,re,t),l(e,b,t),l(e,ue,t),l(e,D,t),l(e,de,t),l(e,_,t),l(e,pe,t),l(e,q,t)},p:ze,d(e){e&&(s(n),s(h),s(p),s(c),s(m),s(J),s(v),s(Z),s(H),s(K),s(y),s(N),s(w),s(Q),s(M),s(V),s(g),s(X),s(k),s(Y),$.d(),s(j),s(T),s(ee),s(C),s(te),s(L),s(le),s(E),s(se),A.d(),s(B),s(I),s(ie),G.d(),s(R),s(S),s(ae),z.d(),s(W),s(F),s(ne),s(P),s(oe),s(U),s(re),s(b),s(ue),s(D),s(de),s(_),s(pe),s(q))}}}function lt(O){let n,f;const h=[O[0],$e];let p={$$slots:{default:[tt]},$$scope:{ctx:O}};for(let d=0;d<h.length;d+=1)p=me(p,h[d]);return n=new Ye({props:p}),{c(){Ze(n.$$.fragment)},l(d){Ke(n.$$.fragment,d)},m(d,c){Ne(n,d,c),f=!0},p(d,[c]){const m=c&1?et(h,[c&1&&Oe(d[0]),c&0&&Oe($e)]):{};c&2&&(m.$$scope={dirty:c,ctx:d}),n.$set(m)},i(d){f||(Qe(n.$$.fragment,d),f=!0)},o(d){Ve(n.$$.fragment,d),f=!1},d(d){Xe(n,d)}}}const $e={title:"Give a second life to my 2011 Mac mini",image:"/2023/mac-mini-as-homeserver/mac-mini-homelab.webp",summary:"Recycling your 2011 Mac mini into a Home lab Server",created:"2023-02-09T00:00:00.000Z",tags:["Home lab","Container"],updated:"2025-01-25T23:55:06.601Z",images:[],slug:"/2023/mac-mini-as-homeserver/+page.svelte.md",path:"/2023/mac-mini-as-homeserver",toc:[{depth:2,title:"Introduction",slug:"introduction"},{depth:2,title:"Hardware upgrade",slug:"hardware-upgrade"},{depth:2,title:"Set up",slug:"set-up"},{depth:3,title:"Operating system",slug:"operating-system"},{depth:3,title:"Reboot on power failure",slug:"reboot-on-power-failure"},{depth:2,title:"Containers",slug:"containers"},{depth:2,title:"Final thoughts",slug:"final-thoughts"},{depth:2,title:"Useful resources ✨",slug:"useful-resources-"}]};function st(O,n,f){return O.$$set=h=>{f(0,n=me(me({},n),qe(h)))},n=qe(n),[n]}class ot extends We{constructor(n){super(),Je(this,n,st,lt,Re,{})}}export{ot as component};

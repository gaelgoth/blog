import{s as yn,a as bt,e as pn,b as dn,n as gn}from"../chunks/BIf046HQ.js";import{S as Fn,i as bn,k as pt,l as dt,m as ct,n as ut,o as ft,p as ht,e as i,s,H as it,c as o,q as r,f as a,a as ve,d as n,r as ot,u as c,v as rt,g as l,h as b}from"../chunks/CEBVHJ3f.js";import{P as xn,g as wn,a as cn}from"../chunks/KoCA0eQa.js";import{I as Ft}from"../chunks/Dh_RXYUO.js";function _n(se){let p,x='<a href="#introduction">Introduction</a>',v,h,d="In this blog post, we’ll explore an efficient method to set up domain names and valid TLS certificates for your home lab services without exposing them to the public internet. We’ll achieve this by using a reverse proxy and obtaining a valid certificate from Let’s Encrypt, a widely (and free) recognized Certificate Authority (CA).",f,m,xt='<a href="#why-using-dns-in-my-homelab-">Why using DNS in my homelab ?</a>',ye,S,wt='I opted to purchase the domain name gothuey.dev from <a href="https://www.infomaniak.com/en/domains" rel="nofollow noopener noreferrer external" target="_blank">Infomaniak</a>. While there are free alternatives available, such as <a href="https://www.duckdns.org/" rel="nofollow noopener noreferrer external" target="_blank">Duck DNS</a>. In my case, I’m going to do the set-up with a domain name purchased from Infomaniak.',ge,ae,P,Fe,I,_t="The objective I’m striving for involves utilizing my domain directly – for instance, <code>service.homelab.gothuey.dev</code> (as seen with <code>grafana.homelab.gothuey.dev</code>). This approach empowers me to establish subdomains for various home lab services (Grafana, Jellyfin,.PairDrop,…). By doing so, each service gains a unique and easily recognizable identity, eliminating the need to rely on IP addresses and ports for access.",be,N,Et="Keep in mind that the setup described in this guide is geared towards optimizing accessibility and organization within a <strong>local network</strong> context. All my services are not exposed outside my network.",xe,w,Ct='<a href="#set-up">Set up</a>',we,A,Tt="Popular reverse proxies like Nginx, Apache, Swag, or Traefik are excellent choices for setting up in your home lab services. Consider selecting one that aligns with your preferences and suits your specific setup requirements.",_e,$,Lt='In my scenario, I elected to employ Nginx Proxy Manager (NPM) due to its user-centric configuration process. This tool boasts an intuitive setup, rendering it an optimal choice for individuals who are either newcomers to reverse proxies or enthusiasts of a more simplified configuration journey. Of notable significance, NPM comes equipped with a feature that stands out: native support for <a href="https://letsencrypt.org/docs/challenge-types/#dns-01-challenge" rel="nofollow noopener noreferrer external" target="_blank">Let’s Encrypt Challenge DNS-01</a>, right out of the box.',Ee,_,Dt='<a href="#1-install-nginx-proxy-manager-npm">1: Install Nginx Proxy Manager (NPM)</a>',Ce,q,Ht='For my homelab, which primarily relies on Docker, we can easily install Nginx Proxy Manager (NPM) using the following docker-compose.yml configuration. To proceed, you can follow the steps outlined in the Quick Setup guide available at <a href="https://nginxproxymanager.com/guide/#quick-setup" rel="nofollow noopener noreferrer external" target="_blank">https://nginxproxymanager.com/guide/#quick-setup</a>.',Te,ue,fn=`<pre class="shiki material-default" style="background-color: #263238; color: #EEFFFF" yaml="true"><div class="language-id">yaml</div><div class='code-container'><code><div class='line'><span style="color: #F07178">version</span><span style="color: #89DDFF">:</span><span style="color: #EEFFFF"> </span><span style="color: #89DDFF">'</span><span style="color: #C3E88D">3.8</span><span style="color: #89DDFF">'</span></div><div class='line'><span style="color: #F07178">services</span><span style="color: #89DDFF">:</span></div><div class='line'><span style="color: #EEFFFF">  </span><span style="color: #F07178">app</span><span style="color: #89DDFF">:</span></div><div class='line'><span style="color: #EEFFFF">    </span><span style="color: #F07178">image</span><span style="color: #89DDFF">:</span><span style="color: #EEFFFF"> </span><span style="color: #89DDFF">'</span><span style="color: #C3E88D">jc21/nginx-proxy-manager:latest</span><span style="color: #89DDFF">'</span></div><div class='line'><span style="color: #EEFFFF">    </span><span style="color: #F07178">restart</span><span style="color: #89DDFF">:</span><span style="color: #EEFFFF"> </span><span style="color: #C3E88D">unless-stopped</span></div><div class='line'><span style="color: #EEFFFF">    </span><span style="color: #F07178">ports</span><span style="color: #89DDFF">:</span></div><div class='line'><span style="color: #EEFFFF">      </span><span style="color: #89DDFF">-</span><span style="color: #EEFFFF"> </span><span style="color: #89DDFF">'</span><span style="color: #C3E88D">80:80</span><span style="color: #89DDFF">'</span></div><div class='line'><span style="color: #EEFFFF">      </span><span style="color: #89DDFF">-</span><span style="color: #EEFFFF"> </span><span style="color: #89DDFF">'</span><span style="color: #C3E88D">81:81</span><span style="color: #89DDFF">'</span></div><div class='line'><span style="color: #EEFFFF">      </span><span style="color: #89DDFF">-</span><span style="color: #EEFFFF"> </span><span style="color: #89DDFF">'</span><span style="color: #C3E88D">443:443</span><span style="color: #89DDFF">'</span></div><div class='line'><span style="color: #EEFFFF">    </span><span style="color: #F07178">volumes</span><span style="color: #89DDFF">:</span></div><div class='line'><span style="color: #EEFFFF">      </span><span style="color: #89DDFF">-</span><span style="color: #EEFFFF"> </span><span style="color: #C3E88D">./data:/data</span></div><div class='line'><span style="color: #EEFFFF">      </span><span style="color: #89DDFF">-</span><span style="color: #EEFFFF"> </span><span style="color: #C3E88D">./letsencrypt:/etc/letsencrypt</span></div><div class='line'></div></code></div></pre>`,fe,E,Mt='<a href="#2-set-up-a-domain-name-infomaniak">2: Set up a domain name (Infomaniak)</a>',Le,O,kt='At your Infomaniak manager <a href="https://manager.infomaniak.com/v3/298166/ng/products/web/domains" rel="nofollow noopener noreferrer external" target="_blank">dashboard</a>, choose the domain you want to use.',De,C,ie,St="<p>Select Change the DNS zone and then click on the ADD AN ENTRY button. Here, you can define how you want to design your domain name.</p>",mt,u,oe,Pt="Create two entries as follows:",vt,re,It="The first entry should be of <strong>TYPE A</strong>, which will point your domain to your private homelab IP address.",yt,He,hn=`<pre class="shiki material-default" style="background-color: #263238; color: #EEFFFF" text="true"><div class="language-id">text</div><div class='code-container'><code><div class='line'><span style="color: undefined">    Type: A</span></div><div class='line'><span style="color: undefined">    Source: homelab.gothuey.dev (replace by your domain name)</span></div><div class='line'><span style="color: undefined">    target: 192.168.1.3 (replace by your private IP)</span></div><div class='line'><span style="color: undefined">    TTL: 1 hour</span></div></code></div></pre>`,Me,pe,Nt="The second entry should be of <strong>TYPE CNAME</strong>, enabling the creation of subdomains like <code>grafana.your-domain.com</code>",gt,ke,mn=`<pre class="shiki material-default" style="background-color: #263238; color: #EEFFFF" text="true"><div class="language-id">text</div><div class='code-container'><code><div class='line'><span style="color: undefined">Type: CNAME</span></div><div class='line'><span style="color: undefined">Source: *.homelab.gothuey.dev (replace by your domain name)</span></div><div class='line'><span style="color: undefined">target: homelab.gothuey.dev</span></div><div class='line'><span style="color: undefined">TTL: 1 hour</span></div></code></div></pre>`,Se,R,At="After making the necessary DNS changes, it may take several minutes for your domain to become fully available. To check the availability and ensure the correct configuration, you can use the <code>dig</code> command. When the setup is successful, you should see your private homelab address associated with the A record for your domain.",Pe,he,vn=`<pre class="shiki material-default" style="background-color: #263238; color: #EEFFFF" shell="true"><div class="language-id">shell</div><div class='code-container'><code><div class='line dim'><span style="color: #EEFFFF">$ dig homelab.gothuey.dev</span></div><div class='line'></div><div class='line dim'><span style="color: #89DDFF">;</span><span style="color: #EEFFFF"> </span><span style="color: #89DDFF">&lt;&lt;</span><span style="color: #89DDFF">&gt;&gt;</span><span style="color: #C3E88D"> DiG 9.16.1-Ubuntu &lt;&lt;&gt;&gt; homelab.gothuey.dev</span></div><div class='line dim'><span style="color: #C3E88D">;; global options: +cmd</span></div><div class='line dim'><span style="color: #C3E88D">;; Got answer:</span></div><div class='line dim'><span style="color: #C3E88D">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 42085</span></div><div class='line dim'><span style="color: #C3E88D">;; flags: qr rd ad; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0</span></div><div class='line dim'><span style="color: #C3E88D">;; WARNING: recursion requested but not available</span></div><div class='line'></div><div class='line dim'><span style="color: #C3E88D">;; QUESTION SECTION:</span></div><div class='line dim'><span style="color: #C3E88D">;homelab.gothuey.dev.           IN      A</span></div><div class='line'></div><div class='line highlight'><span style="color: #C3E88D">;; ANSWER SECTION:</span></div><div class='line highlight'><span style="color: #C3E88D">homelab.gothuey.dev.    0       IN      A       192.168.1.3</span></div><div class='line'></div><div class='line dim'><span style="color: #C3E88D">;; Query time: 19 msec</span></div><div class='line dim'><span style="color: #C3E88D">;; SERVER: 172.30.240.1#53(172.30.240.1)</span></div><div class='line dim'><span style="color: #C3E88D">;; WHEN: Tue Aug 01 16:31:45 CEST 2023</span></div><div class='line dim'><span style="color: #C3E88D">;; MSG SIZE  rcvd: 72</span></div><div class='line'></div></code></div></pre>`,me,T,$t='<a href="#3-issue-a-token-for-certbot-infomaniak">3: Issue a token for CertBot (Infomaniak)</a>',Ie,z,qt='As mentioned earlier, Nginx Proxy Manager has the capability to generate and manage TLS certificates for use. It utilizes the <a href="https://github.com/Infomaniak/certbot-dns-infomaniak" rel="nofollow noopener noreferrer external" target="_blank">certbot-dns-infomaniak</a> plugin behind the scenes, which necessitates a token from your Infomaniak dashboard for proper functioning.',Ne,U,Ot='<li>At your Infomaniak manager <a href="https://manager.infomaniak.com/v3/infomaniak-api" rel="nofollow noopener noreferrer external" target="_blank">dashboard</a>, to to the API section and generate a token with “Domain” scope.</li> <li><strong>Keep</strong> this token somewhere safe as we will use it in the next step.</li>',Ae,L,Rt='<a href="#4-add-new-certificate-in-npm">4: Add new certificate in NPM</a>',$e,G,zt=`<li>Go to Nginx Proxy Manager (<a href="http://192.168.1.3:81/" rel="nofollow noopener noreferrer external" target="_blank">http://192.168.1.3:81/</a>) and navigate to the SSL <strong>Certificates</strong> tab.</li> <li>Click on “Add SSL Certificate” and select “Let’s Encrypt.”</li> <li>Configure your Let’s Encrypt Certificate as follows:
<ul><li><strong>Domain Names</strong>: Add the domain and subdomain records.
-Enable the <strong>Use a DNS challenge</strong> option.</li> <li>DNS Provider: Select “Infomaniak.”</li> <li><strong>Credentials File Content</strong>: Replace x values with the token issued in the last step.</li></ul></li> <li>Click on the Save button to save the configuration.</li>`,qe,W,Ut="If the configuration is completed successfully, you should be able to see your certificate.",Oe,de,Y,Re,D,Gt='<a href="#5-using-dns-with-services">5: Using DNS with services</a>',ze,j,Wt="Now we are ready to set up a proxy entry.  In my case, I would like to direct requests from my Grafana instance, <code>grafana.homelab.gothuey.dev</code>, to be redirected to <code>http://HOMELAB_IP:3002</code>.",Ue,Q,Yt=`<li>Begin by navigating to the “Proxy Hosts” tab and selecting “Add Proxy Host.”</li> <li>Configure your host (<strong>⚡Details</strong> tab)
<ul><li><strong>Domain Name</strong>s**: <code>HOMELAB_SERVICE.your.domain.name</code></li> <li><strong>Scheme</strong>: http</li> <li><strong>Forward Hostname / IP</strong>: <code>HOMELAB_IP</code></li> <li><strong>Forward Port</strong>: <code>SERVICE_PORT</code></li> <li>Feel free to adjust other settings according to your requirements.</li></ul></li>`,Ge,y,jt,We,B,Qt="Next, proceed to the  <strong>🛡️SLL</strong> tab o choose an SSL certificate for this host:",Ye,V,Bt='<li><strong>SSL Certificate</strong>: Choose the certificate that was created during <a href="#4-add-new-certificate-in-npm">4: Add new certificate in NPM</a></li> <li>Enable <strong>Force SSL</strong> and <strong>HTTP/2 Support</strong></li> <li>Finally, click on the “Save” button to apply these settings</li>',je,g,Vt,Qe,H,Kt='<a href="#6-lets-test-the-set-up">6: Let’s test the set up</a>',Be,K,Jt="To confirm the proper functionality of our proxy setup, let’s conduct a straightforward test.",Ve,J,Zt="Open your preferred web browser.",Ke,Z,Xt='In the address bar, enter the URL <a href="https://service.your.domain.name/" rel="nofollow noopener noreferrer external" target="_blank">https://service.your.domain.name/</a> and then press Enter.',Je,X,en="Upon completing the Grafana setup, my browser automatically redirected me to the Grafana instance situated at <code>http:/HOMELAB_IP:3002</code>. This seamless redirection granted me access to the Grafana dashboard without any SSL/TSL warning.",Ze,ce,ee,Xe,M,tn='<a href="#final-thoughts">Final thoughts</a>',et,te,nn="This solution provides a straightforward approach for achieving DNS-based access and SSL/TLS encryption without encountering SSL warnings for your local services.",tt,ne,ln='If you’re interested in a visual guide, I recommend watching the <a href="https://youtu.be/qlcVx-k-02E?si=HQnJamrhbyYTaCKU" rel="nofollow noopener noreferrer external" target="_blank">“Quick and Easy SSL Certificates for Your Homelab!” video on Wolfgang’s Channel</a>. Although the video focuses on a similar setup using Duck DNS, the core principles align closely with what we’ve discussed here, offering an additional resource to guide you through the process.',nt,k,sn='<a href="#useful-resources-">Useful resources ✨</a>',lt,le,an='<li><a href="https://letsencrypt.org/docs/challenge-types/#dns-01-challenge" rel="nofollow noopener noreferrer external" target="_blank">Let’s Encrypt Challenge DNS-01</a></li> <li><a href="https://youtu.be/qlcVx-k-02E?si=HQnJamrhbyYTaCKU" rel="nofollow noopener noreferrer external" target="_blank">“Quick and Easy SSL Certificates for Your Homelab!” video on Wolfgang’s Channel</a></li> <li><a href="https://nginxproxymanager.com/" rel="nofollow noopener noreferrer external" target="_blank">Nginx Proxy Manager</a></li>',st;return P=new Ft({props:{src:"/2023/dns-setup-homelab/example-with-dashboard.webp",alt:"Demo with homelab dashboard"}}),Y=new Ft({props:{src:"/2023/dns-setup-homelab/add-new-certificate.webp",alt:"Generate Certificate"}}),ee=new Ft({props:{src:"/2023/dns-setup-homelab/test-set-up.webp",alt:"Test proxy"}}),{c(){p=i("h2"),p.innerHTML=x,v=s(),h=i("p"),h.textContent=d,f=s(),m=i("h3"),m.innerHTML=xt,ye=s(),S=i("p"),S.innerHTML=wt,ge=s(),ae=i("p"),pt(P.$$.fragment),Fe=s(),I=i("p"),I.innerHTML=_t,be=s(),N=i("p"),N.innerHTML=Et,xe=s(),w=i("h2"),w.innerHTML=Ct,we=s(),A=i("p"),A.textContent=Tt,_e=s(),$=i("p"),$.innerHTML=Lt,Ee=s(),_=i("h3"),_.innerHTML=Dt,Ce=s(),q=i("p"),q.innerHTML=Ht,Te=s(),ue=new it(!1),fe=s(),E=i("h3"),E.innerHTML=Mt,Le=s(),O=i("p"),O.innerHTML=kt,De=s(),C=i("ol"),ie=i("li"),ie.innerHTML=St,mt=s(),u=i("li"),oe=i("p"),oe.textContent=Pt,vt=s(),re=i("p"),re.innerHTML=It,yt=s(),He=new it(!1),Me=s(),pe=i("p"),pe.innerHTML=Nt,gt=s(),ke=new it(!1),Se=s(),R=i("p"),R.innerHTML=At,Pe=s(),he=new it(!1),me=s(),T=i("h3"),T.innerHTML=$t,Ie=s(),z=i("p"),z.innerHTML=qt,Ne=s(),U=i("ol"),U.innerHTML=Ot,Ae=s(),L=i("h3"),L.innerHTML=Rt,$e=s(),G=i("ol"),G.innerHTML=zt,qe=s(),W=i("p"),W.textContent=Ut,Oe=s(),de=i("p"),pt(Y.$$.fragment),Re=s(),D=i("h3"),D.innerHTML=Gt,ze=s(),j=i("p"),j.innerHTML=Wt,Ue=s(),Q=i("ol"),Q.innerHTML=Yt,Ge=s(),y=i("img"),We=s(),B=i("p"),B.innerHTML=Qt,Ye=s(),V=i("ul"),V.innerHTML=Bt,je=s(),g=i("img"),Qe=s(),H=i("h3"),H.innerHTML=Kt,Be=s(),K=i("p"),K.textContent=Jt,Ve=s(),J=i("p"),J.textContent=Zt,Ke=s(),Z=i("p"),Z.innerHTML=Xt,Je=s(),X=i("p"),X.innerHTML=en,Ze=s(),ce=i("p"),pt(ee.$$.fragment),Xe=s(),M=i("h2"),M.innerHTML=tn,et=s(),te=i("p"),te.textContent=nn,tt=s(),ne=i("p"),ne.innerHTML=ln,nt=s(),k=i("h2"),k.innerHTML=sn,lt=s(),le=i("ul"),le.innerHTML=an,this.h()},l(e){p=o(e,"H2",{id:!0,"data-svelte-h":!0}),r(p)!=="svelte-ccveyw"&&(p.innerHTML=x),v=a(e),h=o(e,"P",{"data-svelte-h":!0}),r(h)!=="svelte-90rfaz"&&(h.textContent=d),f=a(e),m=o(e,"H3",{id:!0,"data-svelte-h":!0}),r(m)!=="svelte-14ah83r"&&(m.innerHTML=xt),ye=a(e),S=o(e,"P",{"data-svelte-h":!0}),r(S)!=="svelte-1dolp5z"&&(S.innerHTML=wt),ge=a(e),ae=o(e,"P",{});var t=ve(ae);dt(P.$$.fragment,t),t.forEach(n),Fe=a(e),I=o(e,"P",{"data-svelte-h":!0}),r(I)!=="svelte-4h1ay3"&&(I.innerHTML=_t),be=a(e),N=o(e,"P",{"data-svelte-h":!0}),r(N)!=="svelte-1lpvncv"&&(N.innerHTML=Et),xe=a(e),w=o(e,"H2",{id:!0,"data-svelte-h":!0}),r(w)!=="svelte-1rgn96p"&&(w.innerHTML=Ct),we=a(e),A=o(e,"P",{"data-svelte-h":!0}),r(A)!=="svelte-1rxh0l"&&(A.textContent=Tt),_e=a(e),$=o(e,"P",{"data-svelte-h":!0}),r($)!=="svelte-bnwp20"&&($.innerHTML=Lt),Ee=a(e),_=o(e,"H3",{id:!0,"data-svelte-h":!0}),r(_)!=="svelte-fqfa33"&&(_.innerHTML=Dt),Ce=a(e),q=o(e,"P",{"data-svelte-h":!0}),r(q)!=="svelte-1mjrrl0"&&(q.innerHTML=Ht),Te=a(e),ue=ot(e,!1),fe=a(e),E=o(e,"H3",{id:!0,"data-svelte-h":!0}),r(E)!=="svelte-16p6egr"&&(E.innerHTML=Mt),Le=a(e),O=o(e,"P",{"data-svelte-h":!0}),r(O)!=="svelte-1ylr6c1"&&(O.innerHTML=kt),De=a(e),C=o(e,"OL",{});var at=ve(C);ie=o(at,"LI",{"data-svelte-h":!0}),r(ie)!=="svelte-1fbcwt7"&&(ie.innerHTML=St),mt=a(at),u=o(at,"LI",{});var F=ve(u);oe=o(F,"P",{"data-svelte-h":!0}),r(oe)!=="svelte-1324p8y"&&(oe.textContent=Pt),vt=a(F),re=o(F,"P",{"data-svelte-h":!0}),r(re)!=="svelte-1koj2em"&&(re.innerHTML=It),yt=a(F),He=ot(F,!1),Me=a(F),pe=o(F,"P",{"data-svelte-h":!0}),r(pe)!=="svelte-yblaeo"&&(pe.innerHTML=Nt),gt=a(F),ke=ot(F,!1),F.forEach(n),at.forEach(n),Se=a(e),R=o(e,"P",{"data-svelte-h":!0}),r(R)!=="svelte-inyfxa"&&(R.innerHTML=At),Pe=a(e),he=ot(e,!1),me=a(e),T=o(e,"H3",{id:!0,"data-svelte-h":!0}),r(T)!=="svelte-p131ko"&&(T.innerHTML=$t),Ie=a(e),z=o(e,"P",{"data-svelte-h":!0}),r(z)!=="svelte-3ty63g"&&(z.innerHTML=qt),Ne=a(e),U=o(e,"OL",{"data-svelte-h":!0}),r(U)!=="svelte-7czxez"&&(U.innerHTML=Ot),Ae=a(e),L=o(e,"H3",{id:!0,"data-svelte-h":!0}),r(L)!=="svelte-ath4e2"&&(L.innerHTML=Rt),$e=a(e),G=o(e,"OL",{"data-svelte-h":!0}),r(G)!=="svelte-1bkwoma"&&(G.innerHTML=zt),qe=a(e),W=o(e,"P",{"data-svelte-h":!0}),r(W)!=="svelte-1r684pz"&&(W.textContent=Ut),Oe=a(e),de=o(e,"P",{});var on=ve(de);dt(Y.$$.fragment,on),on.forEach(n),Re=a(e),D=o(e,"H3",{id:!0,"data-svelte-h":!0}),r(D)!=="svelte-1019cv2"&&(D.innerHTML=Gt),ze=a(e),j=o(e,"P",{"data-svelte-h":!0}),r(j)!=="svelte-1nifqyk"&&(j.innerHTML=Wt),Ue=a(e),Q=o(e,"OL",{"data-svelte-h":!0}),r(Q)!=="svelte-1nl2bnf"&&(Q.innerHTML=Yt),Ge=a(e),y=o(e,"IMG",{src:!0,alt:!0,width:!0,style:!0}),We=a(e),B=o(e,"P",{"data-svelte-h":!0}),r(B)!=="svelte-175gz6m"&&(B.innerHTML=Qt),Ye=a(e),V=o(e,"UL",{"data-svelte-h":!0}),r(V)!=="svelte-1lp8z3j"&&(V.innerHTML=Bt),je=a(e),g=o(e,"IMG",{src:!0,alt:!0,width:!0,style:!0}),Qe=a(e),H=o(e,"H3",{id:!0,"data-svelte-h":!0}),r(H)!=="svelte-1920rhn"&&(H.innerHTML=Kt),Be=a(e),K=o(e,"P",{"data-svelte-h":!0}),r(K)!=="svelte-1pntlwu"&&(K.textContent=Jt),Ve=a(e),J=o(e,"P",{"data-svelte-h":!0}),r(J)!=="svelte-1fqzt6"&&(J.textContent=Zt),Ke=a(e),Z=o(e,"P",{"data-svelte-h":!0}),r(Z)!=="svelte-d490gz"&&(Z.innerHTML=Xt),Je=a(e),X=o(e,"P",{"data-svelte-h":!0}),r(X)!=="svelte-5eqy1g"&&(X.innerHTML=en),Ze=a(e),ce=o(e,"P",{});var rn=ve(ce);dt(ee.$$.fragment,rn),rn.forEach(n),Xe=a(e),M=o(e,"H2",{id:!0,"data-svelte-h":!0}),r(M)!=="svelte-2qh8hi"&&(M.innerHTML=tn),et=a(e),te=o(e,"P",{"data-svelte-h":!0}),r(te)!=="svelte-1665ptc"&&(te.textContent=nn),tt=a(e),ne=o(e,"P",{"data-svelte-h":!0}),r(ne)!=="svelte-1j3dsbe"&&(ne.innerHTML=ln),nt=a(e),k=o(e,"H2",{id:!0,"data-svelte-h":!0}),r(k)!=="svelte-z3y4n5"&&(k.innerHTML=sn),lt=a(e),le=o(e,"UL",{"data-svelte-h":!0}),r(le)!=="svelte-1kbbhsk"&&(le.innerHTML=an),this.h()},h(){c(p,"id","introduction"),c(m,"id","why-using-dns-in-my-homelab-"),c(w,"id","set-up"),c(_,"id","1-install-nginx-proxy-manager-npm"),ue.a=fe,c(E,"id","2-set-up-a-domain-name-infomaniak"),He.a=Me,ke.a=null,he.a=me,c(T,"id","3-issue-a-token-for-certbot-infomaniak"),c(L,"id","4-add-new-certificate-in-npm"),c(D,"id","5-using-dns-with-services"),dn(y.src,jt="/2023/dns-setup-homelab/set-up-host.webp")||c(y,"src",jt),c(y,"alt","Set up host"),c(y,"width","400"),rt(y,"display","block"),rt(y,"margin","0 auto"),dn(g.src,Vt="/2023/dns-setup-homelab/select-ssl-certificate.webp")||c(g,"src",Vt),c(g,"alt","Select certificate"),c(g,"width","400"),rt(g,"display","block"),rt(g,"margin","0 auto"),c(H,"id","6-lets-test-the-set-up"),c(M,"id","final-thoughts"),c(k,"id","useful-resources-")},m(e,t){l(e,p,t),l(e,v,t),l(e,h,t),l(e,f,t),l(e,m,t),l(e,ye,t),l(e,S,t),l(e,ge,t),l(e,ae,t),ct(P,ae,null),l(e,Fe,t),l(e,I,t),l(e,be,t),l(e,N,t),l(e,xe,t),l(e,w,t),l(e,we,t),l(e,A,t),l(e,_e,t),l(e,$,t),l(e,Ee,t),l(e,_,t),l(e,Ce,t),l(e,q,t),l(e,Te,t),ue.m(fn,e,t),l(e,fe,t),l(e,E,t),l(e,Le,t),l(e,O,t),l(e,De,t),l(e,C,t),b(C,ie),b(C,mt),b(C,u),b(u,oe),b(u,vt),b(u,re),b(u,yt),He.m(hn,u),b(u,Me),b(u,pe),b(u,gt),ke.m(mn,u),l(e,Se,t),l(e,R,t),l(e,Pe,t),he.m(vn,e,t),l(e,me,t),l(e,T,t),l(e,Ie,t),l(e,z,t),l(e,Ne,t),l(e,U,t),l(e,Ae,t),l(e,L,t),l(e,$e,t),l(e,G,t),l(e,qe,t),l(e,W,t),l(e,Oe,t),l(e,de,t),ct(Y,de,null),l(e,Re,t),l(e,D,t),l(e,ze,t),l(e,j,t),l(e,Ue,t),l(e,Q,t),l(e,Ge,t),l(e,y,t),l(e,We,t),l(e,B,t),l(e,Ye,t),l(e,V,t),l(e,je,t),l(e,g,t),l(e,Qe,t),l(e,H,t),l(e,Be,t),l(e,K,t),l(e,Ve,t),l(e,J,t),l(e,Ke,t),l(e,Z,t),l(e,Je,t),l(e,X,t),l(e,Ze,t),l(e,ce,t),ct(ee,ce,null),l(e,Xe,t),l(e,M,t),l(e,et,t),l(e,te,t),l(e,tt,t),l(e,ne,t),l(e,nt,t),l(e,k,t),l(e,lt,t),l(e,le,t),st=!0},p:gn,i(e){st||(ut(P.$$.fragment,e),ut(Y.$$.fragment,e),ut(ee.$$.fragment,e),st=!0)},o(e){ft(P.$$.fragment,e),ft(Y.$$.fragment,e),ft(ee.$$.fragment,e),st=!1},d(e){e&&(n(p),n(v),n(h),n(f),n(m),n(ye),n(S),n(ge),n(ae),n(Fe),n(I),n(be),n(N),n(xe),n(w),n(we),n(A),n(_e),n($),n(Ee),n(_),n(Ce),n(q),n(Te),ue.d(),n(fe),n(E),n(Le),n(O),n(De),n(C),n(Se),n(R),n(Pe),he.d(),n(me),n(T),n(Ie),n(z),n(Ne),n(U),n(Ae),n(L),n($e),n(G),n(qe),n(W),n(Oe),n(de),n(Re),n(D),n(ze),n(j),n(Ue),n(Q),n(Ge),n(y),n(We),n(B),n(Ye),n(V),n(je),n(g),n(Qe),n(H),n(Be),n(K),n(Ve),n(J),n(Ke),n(Z),n(Je),n(X),n(Ze),n(ce),n(Xe),n(M),n(et),n(te),n(tt),n(ne),n(nt),n(k),n(lt),n(le)),ht(P),ht(Y),ht(ee)}}}function En(se){let p,x;const v=[se[0],un];let h={$$slots:{default:[_n]},$$scope:{ctx:se}};for(let d=0;d<v.length;d+=1)h=bt(h,v[d]);return p=new xn({props:h}),{c(){pt(p.$$.fragment)},l(d){dt(p.$$.fragment,d)},m(d,f){ct(p,d,f),x=!0},p(d,[f]){const m=f&1?wn(v,[f&1&&cn(d[0]),f&0&&cn(un)]):{};f&2&&(m.$$scope={dirty:f,ctx:d}),p.$set(m)},i(d){x||(ut(p.$$.fragment,d),x=!0)},o(d){ft(p.$$.fragment,d),x=!1},d(d){ht(p,d)}}}const un={title:"How to use DNS and TLS in your homelab",image:"/2023/dns-setup-homelab/npm-ssl-certificate.webp",summary:"Easy TLS certificate set up with Nginx Proxy Manager",created:"2023-08-01T00:00:00.000Z",tags:["Home lab","Container"],updated:"2025-01-25T23:55:06.600Z",images:[],slug:"/2023/dns-setup-homelab/+page.svelte.md",path:"/2023/dns-setup-homelab",toc:[{depth:2,title:"Introduction",slug:"introduction"},{depth:3,title:"Why using DNS in my homelab ?",slug:"why-using-dns-in-my-homelab-"},{depth:2,title:"Set up",slug:"set-up"},{depth:3,title:"1: Install Nginx Proxy Manager (NPM)",slug:"1-install-nginx-proxy-manager-npm"},{depth:3,title:"2: Set up a domain name (Infomaniak)",slug:"2-set-up-a-domain-name-infomaniak"},{depth:3,title:"3: Issue a token for CertBot (Infomaniak)",slug:"3-issue-a-token-for-certbot-infomaniak"},{depth:3,title:"4: Add new certificate in NPM",slug:"4-add-new-certificate-in-npm"},{depth:3,title:"5: Using DNS with services",slug:"5-using-dns-with-services"},{depth:3,title:"6: Let’s test the set up",slug:"6-lets-test-the-set-up"},{depth:2,title:"Final thoughts",slug:"final-thoughts"},{depth:2,title:"Useful resources ✨",slug:"useful-resources-"}]};function Cn(se,p,x){return se.$$set=v=>{x(0,p=bt(bt({},p),pn(v)))},p=pn(p),[p]}class Mn extends Fn{constructor(p){super(),bn(this,p,Cn,En,yn,{})}}export{Mn as component};

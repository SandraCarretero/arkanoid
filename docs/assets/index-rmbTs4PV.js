(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const k of s.addedNodes)k.tagName==="LINK"&&k.rel==="modulepreload"&&l(k)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const n=document.getElementById("canvas"),d=n.getContext("2d"),T=document.getElementById("sprite"),A=document.getElementById("bricks");n.width=448;n.height=400;const c=4;let a=n.width/2,f=n.height-30,h=3,r=-3;const m=50,g=10;let u=(n.width-m)/2,R=n.height-g-10,b=!1,B=!1;const D=5,P=6,L=13,p=32,y=16,I=0,O=80,S=16,w=[],E={ACTIVE:1,DESTROYED:0};for(let t=0;t<L;t++){w[t]=[];for(let e=0;e<P;e++){const i=t*(p+I)+S,l=e*(y+I)+O,o=Math.floor(Math.random()*8);w[t][e]={x:i,y:l,status:E.ACTIVE,color:o}}}const Y=()=>{d.beginPath(),d.arc(a,f,c,0,Math.PI*2),d.fillStyle="#fff",d.fill(),d.closePath()},C=()=>{d.drawImage(T,29,174,m,g,u,R,m,g)},X=()=>{for(let t=0;t<L;t++)for(let e=0;e<P;e++){const i=w[t][e];if(i.status===E.DESTROYED)continue;const l=i.color*32;d.drawImage(A,l,0,p,y,i.x,i.y,p,y)}},x=()=>{for(let t=0;t<L;t++)for(let e=0;e<P;e++){const i=w[t][e];if(i.status===E.DESTROYED)continue;const l=a+c>i.x&&a-c<i.x+p,o=f+c>i.y&&f-c<i.y+y;l&&o&&(r=-r,i.status=E.DESTROYED)}},M=()=>{(a+h>n.width-c||a+h<c)&&(h=-h),f+r<c&&(r=-r);const t=a>u&&a<u+m,e=f+r>R;t&&e?r=-r:f+r>n.height-c-g&&document.location.reload(),a+=h,f+=r},H=()=>{b&&u<n.width-m?u+=D:B&&u>0&&(u-=D)},N=()=>{d.clearRect(0,0,n.width,n.height)},j=t=>{const e=t.key;e==="Right"||e==="ArrowRight"?b=!0:(e==="Left"||e==="ArrowLeft")&&(B=!0)},q=t=>{const e=t.key;e==="Right"||e==="ArrowRight"?b=!1:(e==="Left"||e==="ArrowLeft")&&(B=!1)},v=()=>{N(),Y(),C(),X(),x(),M(),H(),window.requestAnimationFrame(v)};v();document.addEventListener("keydown",j);document.addEventListener("keyup",q);

import {useEffect,useRef,useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {experience} from './data.js'
gsap.registerPlugin(ScrollTrigger)
function Photo({src,alt,priority=false,className=''}){return <img className={className} src={src} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'}/>}
export default function App(){
 const [entered,setEntered]=useState(false); const root=useRef(null)
 useEffect(()=>{document.body.style.overflow=entered?'':'hidden';if(!entered)scrollTo(0,0);return()=>{document.body.style.overflow=''}},[entered])
 useEffect(()=>{if(!entered||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const ctx=gsap.context(()=>{gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{y:36,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}}));gsap.utils.toArray('.drift').forEach(el=>gsap.to(el,{yPercent:-5,ease:'none',scrollTrigger:{trigger:el,scrub:1}}))},root);return()=>ctx.revert()},[entered])
 const p=experience.photos,s=experience.scenes
 return <main ref={root} className="site-shell">
  {!entered&&<section className="entry"><div className="orbit"/><p>JODHPUR · 07 FEB 2027</p><h1>SAFFRON<br/>ORBIT</h1><small>ROOFTOP MEHFIL</small><button onClick={()=>setEntered(true)}>Enter the terrace</button></section>}
  <div className={entered?'story is-live':'story'} aria-hidden={!entered}>
   <section className="scene hero"><Photo src={p[0]} alt="Rooftop celebration portrait" priority className="hero-photo drift"/><div className="scrim"/><div className="hero-copy reveal"><p>{s[0].label}</p><h2>{s[0].title}</h2><span>{s[0].note}</span></div></section>
   <section className="scene split cream"><div className="copy reveal"><p>{s[1].label}</p><h2>{s[1].title}</h2><span>{s[1].note}</span></div><Photo src={p[1]} alt="Evening toast" className="portrait"/></section>
   <section className="scene arch"><Photo src={p[2]} alt="Couple portrait" className="arch-photo drift"/><div className="arch-copy reveal"><p>{s[2].label}</p><h2>{s[2].title}</h2></div></section>
   <section className="scene family"><Photo src={p[3]} alt="Family celebration"/><Photo src={p[4]} alt="Guests together"/><div className="reveal"><p>{s[3].label}</p><h2>{s[3].title}</h2></div></section>
   <section className="scene sound"><div className="number">05</div><div className="copy reveal"><p>{s[4].label}</p><h2>{s[4].title}</h2><span>{s[4].note}</span></div></section>
   <section className="scene interlude"><p>{s[5].label}</p><h2>{s[5].title}</h2><span>{s[5].note}</span></section>
   <section className="scene contact"><div className="contact-title reveal"><p>{s[6].label}</p><h2>{s[6].title}</h2></div>{p.slice(0,6).map((x,i)=><Photo key={i} src={x} alt={`Contact frame ${i+1}`}/>)}</section>
   <section className="scene spotlight"><Photo src={p[5]} alt="Spotlight portrait" className="spot-photo"/><div className="spot-copy reveal"><p>{s[7].label}</p><h2>{s[7].title}</h2></div></section>
   <section className="scene details"><div className="detail-copy reveal"><p>{s[8].label}</p><h2>{s[8].title}</h2></div><div className="detail-track">{p.slice(2,7).map((x,i)=><Photo key={i} src={x} alt={`Evening detail ${i+1}`}/>)}</div></section>
   <section className="scene rooftop"><Photo src={p[6]} alt="Rooftop dancing" className="rooftop-photo drift"/><div className="rooftop-copy reveal"><p>{s[9].label}</p><h2>{s[9].title}</h2></div></section>
   <section className="scene last"><div className="copy reveal"><p>{s[10].label}</p><h2>{s[10].title}</h2><span>{s[10].note}</span></div><Photo src={p[7]} alt="Last song"/></section>
   <section className="scene finale"><p>{s[11].label}</p><h2>{s[11].title}</h2><div className="meta"><span>{experience.couple.first} + {experience.couple.second}</span><span>{experience.couple.location}</span></div></section>
  </div>
 </main>
}

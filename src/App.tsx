import React, { PropsWithChildren, ReactElement } from 'react';
import './App.css';
import { FaEnvelope, FaPhone, FaGithub, FaCalendar, FaMapMarker, FaLinkedin } from 'react-icons/fa';

const Divider = () => <hr style={{borderTop: '.5px dashed grey', borderBottom: '0px', margin: '.5rem'}} />

const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return <section>
    <h1 style={{fontSize: '1.5rem'}}>{title}</h1>
    { children }
  </section>
}

interface ContactProps {
  display: string,
  url: string,
  icon: ReactElement
}

interface EducationProps {
  institution: string,
  degree: string,
  gpa: string,
  start: Date,
  end?: Date,
  location: string,
}

interface ResearchProps {
  title: string,
  institution: string,
  supervisor?: string,
  start: Date,
  end?: Date,
  location: string
}

interface BasicProps {
  title: string,
  start: Date,
  end?: Date,
  location: string
}

const format = (d: Date) => `${d.getFullYear()}/${d.getMonth() + 1}`

const Education = ({ institution, degree, gpa, start, end, location, children }: PropsWithChildren<EducationProps>) => <article>
  <Wrapper title={institution} start={start} end={end} location={location}/>
  <p style={{fontSize: '.8rem', margin: '0'}}>{ degree } (GPA: { gpa })</p>
  <ul style={{fontSize: '.8rem', padding: '0 1rem'}}>
    { children }
  </ul>
</article>

const Wrapper = ({ title, start, end, location }: BasicProps) => <div style={{display: 'flex', margin: '.5rem 0'}}>
  <h2 style={{fontSize: '1rem', width: '50%', margin: 0}}>{ title }</h2>
  <div style={{fontSize: '.7rem', display: 'flex', width: '50%'}}>
    <span style={{width: '50%'}}>
      <FaCalendar />
      <span>{ format(start) } - { end ? format(end) : "Current" }</span>
    </span>
    <span>
      <FaMapMarker />
      <span>{ location }</span>
    </span>
  </div>
</div>

const Research = ({ title, institution, supervisor, start, end, location, children }: PropsWithChildren<ResearchProps>) => <article>
  <Wrapper title={title} start={start} end={end} location={location}/>
  <p style={{fontSize: '.8rem', margin: '0'}}>{ institution } <br /> Supervisor: { supervisor }</p>
  <ul style={{fontSize: '.8rem'}}>
    { children }
  </ul>
</article>

const Contact = ({ display, url, icon }: ContactProps) => <span>
  { icon }
  <a href={url} target="_blank" rel="noreferrer">{display}</a>
</span>

interface AwardProps {
  title: string,
  awarder?: string,
  date: Date
}

interface Article {
  authors: ReactElement,
  journal: string,
  year: number,
  doi?: string,
}

const Article = ({ authors, journal, year, doi }: Article) => <article style={{ fontSize: '.8rem', margin: '.3rem'}}>
  { authors }; &nbsp;
  <em>{ journal } &nbsp;</em>
  <strong>{ year } &nbsp;</strong>
  { doi ? <a href={`https://doi.org/${doi}`} style={{textDecoration: 'none', color: 'var(--main-color)'}}><code>{ doi }</code></a> : <></> }
</article>

const Award = ({ title, awarder, date }: AwardProps) => <article style={{display: 'flex', justifyContent: 'space-between', padding: '0 2rem 0 .5rem', margin: '.5rem 0', fontSize: '.9rem'}}>
  <div>
    <strong>{ title }</strong>
    { awarder ? <span>, &nbsp;{ awarder }</span> : <></>}
  </div>
  <div>
    { format(date) }
  </div>
</article>

function App() {
  return <>
  <header>
    <div id="name">Songchen Tan</div>
    <div id="contacts">
      <Contact display='i@tansongchen.com' url='mailto:i@tansongchen.com' icon={<FaEnvelope />} />
      <Contact display='+1 (857) 298-9702' url='tel:+1 (857) 298-9702' icon={<FaPhone />} />
      <Contact display='tansongchen' url='https://github.com/tansongchen' icon={<FaGithub />} />
      <Contact display='songchentan' url='https://linkedin.com/in/songchentan' icon={<FaLinkedin />} />
    </div>
  </header>
  <main>
    <Section title="Education">
      <Education institution='Massachusetts Institute of Technology' degree='MSc in Computational Science and Engineering' gpa='5.00 / 5.00' start={new Date('2021-09-02')} location='Cambridge, MA'>
        <li>Selected coursework: Numerical Methods for Partial Differential Equations (A+), Optimization Methods (A), Introduction to Numerical Methods (A), Parallel Computing & Scientific Machine Learning (A)</li>
      </Education>
      <Divider />
      <Education institution='Peking University' degree='BSc in Chemistry & BSc in Physics' gpa='3.89 / 4.00, rank 1 / 137' start={new Date('2017-09-01 4:00')} end={new Date('2021-07-01 4:00')} location='Beijing'>
        <li>Selected coursework: Numerical Methods for Partial Differential Equations (A+), Optimization Methods (A), Introduction to Numerical Methods (A), Parallel Computing & Scientific Machine Learning (A)</li>
        <li>Graduated with the highest academic honors (Weiming Bachelor)</li>
      </Education>
      <Divider />
      <Education institution='University of California, Los Angeles' degree='Exchange Student' gpa='4.00 / 4.00' start={new Date('2019-09-17')} end={new Date('2019-12-13')} location='Los Angeles, CA'>
        <li>Selected coursework: Numerical Methods for Partial Differential Equations (A+), Optimization Methods (A), Introduction to Numerical Methods (A), Parallel Computing & Scientific Machine Learning (A)</li>
      </Education>
    </Section>
    <Section title="Awards">
      <Award title="Weiming Bachelor" awarder="Peking University (top 1%)" date={new Date('2021-07-02')}/>
      <Award title="Academic Award" awarder="College of Chemistry and Molecular Engineering, Peking University (top 2%)" date={new Date('2021-07-02')}/>
      <Award title="2020 Wusi Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2021-07-02')}/>
      <Award title="National Second Prize in Contemporary Undergraduate Mathematical Contest in Modeling" date={new Date('2021-07-02')}/>
      <Award title="2019 National Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2021-07-02')}/>
      <Award title="2018 National Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2021-07-02')}/>
    </Section>
    <Section title="Research Experience">
      <Research title="" institution='Massachusetts Institute of Technology' supervisor='Christopher Rackauckas & Alan Edelman' start={new Date('2022-09-01 4:00')}  location='Cambridge, MA'>
        <li>123</li>
      </Research>
      <Divider />
      <Research title="" institution='Massachusetts Institute of Technology' supervisor='Christopher Rackauckas & Alan Edelman' start={new Date('2021-09-01 4:00')} end={new Date('2022-06-01 4:00')} location='Cambridge, MA'>
        <li>123</li>
      </Research>
      <Divider />
      <Research title="" institution='Peking University' supervisor='Weinan E' start={new Date('2020-12-01 4:00')} end={new Date('2021-06-01 4:00')} location='Cambridge, MA'>
        <li>123</li>
      </Research>
      <Divider />
      <Research title="" institution='Massachusetts Institute of Technology' supervisor='Bin Zhang' start={new Date('2020-05-01 4:00')} end={new Date('2020-08-01 4:00')} location='Cambridge, MA'>
        <li>123</li>
      </Research>
      <Divider />
      <Research title="" institution='' supervisor='Teresa Head-Gordon' start={new Date('2021-09-01 4:00')} end={new Date('2022-06-01 4:00')} location='Cambridge, MA'>
        <li>123</li>
      </Research>
      <Divider />
      <Research title="" institution='' supervisor='Daniel Neuhauser' start={new Date('2021-09-01 4:00')} end={new Date('2022-06-01 4:00')} location='Cambridge, MA'>
        <li>123</li>
      </Research>
      <Divider />
      <Research title="" institution='' supervisor='Jian Liu' start={new Date('2021-09-01 4:00')} end={new Date('2022-06-01 4:00')} location='Cambridge, MA'>
        <li>123</li>
      </Research>
    </Section>
    <Section title="Publication">
      <Article authors={<span><strong>S. Tan</strong>: Density Functional Theory</span>} journal="Bachelor's Thesis at Peking University" year={2021}/>
      <Article authors={<span>I. Leven, H. Hao, <strong>S. Tan</strong>, ..., T. Head‐Gordon</span>} journal="J. Chem. Theory Comput." year={2021} doi='10.1021/acs.jctc.1c00118'/>
      <Article authors={<span><strong>S. Tan</strong>, I. Leven, ..., T. Head‐Gordon</span>} journal="J. Chem. Theory Comput." year={2020} doi='10.1021/acs.jctc.0c00514'/>
    </Section>
    <Section title="Skills">
    </Section>
  </main>
  </>;
}

export default App;

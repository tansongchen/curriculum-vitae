import React, { PropsWithChildren, ReactElement } from 'react';
import './App.css';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';

const Divider = () => <hr style={{borderTop: '.5px dashed grey', borderBottom: '0px', margin: '.5rem'}} />

const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return <section>
    <h1 style={{fontSize: '1.7rem'}}>{title}</h1>
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
  location: string,
  description?: string,
}

const format = (d: Date) => `${d.getFullYear()}/${d.getMonth() + 1}`

const Education = ({ institution, degree, gpa, start, end, location, children }: PropsWithChildren<EducationProps>) => <article>
  <Basic title={institution} start={start} end={end} location={location} description={degree}/>
  <p style={{margin: '0'}}>GPA: <strong>{ gpa }</strong></p>
  <ul style={{padding: '0 1.5rem', margin: '.4rem 0'}}>
    { children }
  </ul>
</article>

const Basic = ({ title, start, end, location, description }: BasicProps) => <div style={{margin: '.5rem 0 .2rem 0', padding: '0 2rem 0 0'}}>
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 .3rem 0'}}>
    <h2 style={{fontSize: '1.2rem', margin: 0}}>{ title }</h2>
    <div style={{color: 'var(--main-color)'}}>{ location }</div>
  </div>
  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <span>{ description }</span>
    <em>{ format(start) } - { end ? format(end) : "Current" }</em>
  </div>
</div>

const Research = ({ title, institution, supervisor, start, end, location, children }: PropsWithChildren<ResearchProps>) => <article>
  <Basic title={title} start={start} end={end} location={location} description={institution}/>
  <p style={{margin: '0'}}>Advisor: <strong>{ supervisor }</strong></p>
  <ul style={{padding: '0 2rem', margin: '.4rem 0'}}>
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

interface ArticleProps {
  authors: ReactElement,
  journal: string,
  year: number,
  doi?: string,
}

const Article = ({ authors, journal, year, doi }: ArticleProps) => <article style={{ margin: '.5rem 0'}}>
  { authors }; &nbsp;
  <em>{ journal } &nbsp;</em>
  <strong>{ year } &nbsp;</strong>
  { doi ? <a href={`https://doi.org/${doi}`} style={{textDecoration: 'none', color: 'var(--main-color)'}}><code>{ doi }</code></a> : <></> }
</article>

const Award = ({ title, awarder, date }: AwardProps) => <article style={{display: 'flex', justifyContent: 'space-between', padding: '0 2rem 0 0', margin: '.5rem 0'}}>
  <div>
    <strong>{ title }</strong>
    { awarder ? <span>, &nbsp;{ awarder }</span> : <></>}
  </div>
  <div>
    { format(date) }
  </div>
</article>

interface SkillListProps {
  category: string,
  content: string[]
}

const SkillList = ({ category, content }: SkillListProps) => <article style={{margin: '.5rem 0'}}>
    <strong>{ category }</strong>: &nbsp;
    { content.join(', ') }
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
      <Education institution='Massachusetts Institute of Technology' degree='Master of Science in Computational Science and Engineering' gpa='5.00 / 5.00' start={new Date('2021-09-02')} location='Cambridge, MA'>
        <li><strong>Selected coursework</strong>: Numerical Methods for Partial Differential Equations (A+), Optimization Methods (A), Introduction to Numerical Methods (A), Parallel Computing & Scientific Machine Learning (A)</li>
      </Education>
      <Divider />
      <Education institution='Peking University' degree='Bachelor of Science in Chemistry & Bachelor of Science in Physics' gpa='3.89 / 4.00, rank 1 / 137' start={new Date('2017-09-01 04:00')} end={new Date('2021-07-01 04:00')} location='Beijing'>
        <li><strong>Selected coursework</strong>: Introduction to Computation (97), Data Structure and Algorithms (96), Computational Physics (92), Ordinary Differential Equations (92), Mathematical Method in Physics (95), Advanced Mathematics I & II (92 & 96), Advanced Algebra I & II (92 & 94)</li>
        <li>Graduated with the highest honor (<strong>Weiming Bachelor</strong>, top 1%)</li>
      </Education>
      <Divider />
      <Education institution='University of California, Los Angeles' degree='Exchange Student' gpa='4.00 / 4.00' start={new Date('2019-09-17')} end={new Date('2019-12-13')} location='Los Angeles, CA'>
        <li><strong>Selected coursework</strong>: Introduction to Probability (A+), Applied Numerical Methods (A)</li>
      </Education>
    </Section>
    <Section title="Research Experience">
      <Research title="High-Performance Code Generation in Automatic Differentiation" institution='Massachusetts Institute of Technology' supervisor='Christopher Rackauckas & Alan Edelman' start={new Date('2021-09-01 04:00')}  location='Cambridge, MA'>
        <li>Participating in the Enzyme (enzyme.mit.edu) project, an automatic differentiation framework based on source code transformation at LLVM IR level</li>
        <li>Synthesizing efficient gradient code by operating LLVM IR with Clang custom pass written in C++</li>
        <li>Adding CPU parallelism and distributed system functionality to this project</li>
      </Research>
      <Divider />
      <Research title="Data-Driven Density Functional Models" institution='Peking University' supervisor='Weinan E' start={new Date('2020-12-01 04:00')} end={new Date('2021-06-01 04:00')} location='Beijing'>
        <li>Establishes a general theory of the dependence between the labels used for training and the parameters of the functional model, and implements the training process with multiple electronic structure properties as labels, using two physical quantities (energy band structure and dipole moment) as examples</li>
        <li>The results show that the use of more kinds of labels can improve the accuracy and generalization performance of the model, and the trained generalized function makes effective use of the data and demonstrates high accuracy and efficiency</li>
      </Research>
      <Divider />
      <Research title="Coarse-Grained Force Fields for DNAs and RNAs" institution='Massachusetts Institute of Technology' supervisor='Bin Zhang' start={new Date('2020-05-01 04:00')} end={new Date('2020-08-01 04:00')} location='(Remote)'>
        <li>Combined normalizing flows and contrastive learning for constructing coarse-grained force fields from atomistic data</li>
        <li>Obtained an efficient and systematic machine learn- ing scheme, outperforming force-mapping schemes</li>
      </Research>
      <Divider />
      <Research title="Charge Equilibration Simulation of Reactive Systems" institution='University of California, Berkeley' supervisor='Teresa Head-Gordon' start={new Date('2021-09-01 04:00')} end={new Date('2022-06-01 04:00')} location='Berkeley, CA'>
        <li>Developed an extended Lagrangian scheme together with Langevin thermostat for fluctuating charges</li>
        <li>Eliminated the iterative charge determination, the main bo􏰁leneck in reactive force fields like ReaxFF, and accu- rately reproduced statistic and dynamic properties</li>
      </Research>
      <Divider />
      <Research title="Dynamic Effect in Bethe-Salpeter Equation" institution='University of California, Los Angeles' supervisor='Daniel Neuhauser' start={new Date('2021-09-01 04:00')} end={new Date('2022-06-01 04:00')} location='Los Angeles, CA'>
        <li>Introduced a screened potential correction within the framework of time-dependent Bethe-Salpeter equation</li>
        <li>Improved the accuracy of optical properties</li>
      </Research>
      <Divider />
      <Research title="Efficient Integrators for Path Integral MD" institution='Peking University' supervisor='Jian Liu' start={new Date('2021-09-01 04:00')} end={new Date('2022-06-01 04:00')} location='Beijing'>
        <li>Analyzed integrators in path-integral molecular dy- namics with symplectic geometry and discrete-time Lyapunov equations</li>
        <li>Designed a novel sampling scheme that can obtain more accurate statistics</li>
      </Research>
    </Section>
    <Section title="Publication">
      <Article authors={<span><strong>S. Tan</strong>: Data-Driven Density Functional Models</span>} journal="Bachelor's Thesis at Peking University" year={2021}/>
      <Article authors={<span>I. Leven, H. Hao, <strong>S. Tan</strong>, ..., T. Head‐Gordon</span>} journal="J. Chem. Theory Comput." year={2021} doi='10.1021/acs.jctc.1c00118'/>
      <Article authors={<span><strong>S. Tan</strong>, I. Leven, ..., T. Head‐Gordon</span>} journal="J. Chem. Theory Comput." year={2020} doi='10.1021/acs.jctc.0c00514'/>
    </Section>
    <Section title="Awards">
      <Award title="Weiming Bachelor" awarder="Peking University (top 1%)" date={new Date('2021-07-02')}/>
      <Award title="Academic Award" awarder="College of Chemistry and Molecular Engineering, Peking University (top 2%)" date={new Date('2021-07-02')}/>
      <Award title="2020 Wusi Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2020-11-02')}/>
      <Award title="National Second Prize in Contemporary Undergraduate Mathematical Contest in Modeling" date={new Date('2019-12-02')}/>
      <Award title="2019 National Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2019-11-02')}/>
      <Award title="Education Aboard Program Scholarhsip" awarder="Peking University" date={new Date('2019-05-02')}/>
      <Award title="2018 National Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2018-11-02')}/>
    </Section>
    <Section title="Skills">
      <SkillList category='Programming Languages' content={['Julia', 'C/C++', 'Python', 'Fortran', 'JavaScript/TypeScript']} />
      <SkillList category='Scientific Computing & Machine Learning Software' content={['PySCF', 'OpenMM', 'LAMMPS', 'PyTorch', 'Flux']} />
      <SkillList category='High-Performance Computing Techniques' content={['parallel computing with MPI & OpenMP', 'compiler optimizations with LLVM']} />
    </Section>
  </main>
  </>;
}

export default App;

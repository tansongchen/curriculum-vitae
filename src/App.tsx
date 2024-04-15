import React, { PropsWithChildren, ReactElement } from 'react';
import './App.css';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';

interface ContactProps {
  display: string,
  url: string,
  icon: ReactElement
}

interface BasicProps {
  title: string,
  start: Date,
  end?: Date,
  location: string,
  description?: string,
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

interface SkillListProps {
  category: string,
  content: string[]
}

const Divider = () => <hr style={{borderTop: '.5px dashed grey', borderBottom: '0px', margin: '.5rem'}} />

const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return <section>
    <h1 style={{fontSize: '1.7rem'}}>{title}</h1>
    { children }
  </section>
}

const format = (d: Date) => `${d.getFullYear()}/${d.getMonth() + 1}`

const Contact = ({ display, url, icon }: ContactProps) => <span>
  { icon }
  <a href={url} target="_blank" rel="noreferrer">{display}</a>
</span>

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

const Education = ({ institution, degree, gpa, start, end, location, children }: PropsWithChildren<EducationProps>) => <article>
  <Basic title={institution} start={start} end={end} location={location} description={degree}/>
  <p style={{margin: '0'}}>GPA: <strong>{ gpa }</strong></p>
  <ul style={{padding: '0 1.5rem', margin: '.4rem 0'}}>
    { children }
  </ul>
</article>

const Research = ({ title, institution, supervisor, start, end, location, children }: PropsWithChildren<ResearchProps>) => <article>
  <Basic title={title} start={start} end={end} location={location} description={institution}/>
  <p style={{margin: '0'}}>Advisor: <strong>{ supervisor }</strong></p>
  <ul style={{padding: '0 2rem', margin: '.4rem 0'}}>
    { children }
  </ul>
</article>

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

const SkillList = ({ category, content }: SkillListProps) => <article style={{margin: '.5rem 0'}}>
    <strong>{ category }</strong>: &nbsp;
    { content.join(', ') }
</article>

// Blocks

const Educations = () => <Section title="Education">
  <Education institution='Massachusetts Institute of Technology' degree='Doctor of Science in Computational Science and Engineering' gpa='5.00 / 5.00' start={new Date('2023-09-02')} location='Cambridge, MA'>
    <li><strong>Selected coursework</strong>: Eigenvalue of Random Matrices (A)</li>
  </Education>
  <Divider />
  <Education institution='Massachusetts Institute of Technology' degree='Master of Science in Computational Science and Engineering' gpa='5.00 / 5.00' start={new Date('2021-09-02')} end={new Date('2023-06-02')} location='Cambridge, MA'>
    <li><strong>Selected coursework</strong>: Parallel Computing & Scientific Machine Learning (A), Optimization Methods (A), Numerical Methods for Partial Differential Equations (A+), Introduction to Numerical Methods (A) </li>
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

const Publication = () => <Section title="Publication">
  <Article authors={<span><strong>S. Tan</strong>: Higher-Order Automatic Differentiation and Its Applications</span>} journal="Master's Thesis at MIT" year={2023}/>
  <Article authors={<span><strong>S. Tan</strong>: Data-Driven Density Functional Models</span>} journal="Bachelor's Thesis at Peking University" year={2021}/>
  <Article authors={<span>I. Leven, H. Hao, <strong>S. Tan</strong>, ..., T. Head‐Gordon</span>} journal="J. Chem. Theory Comput." year={2021} doi='10.1021/acs.jctc.1c00118'/>
  <Article authors={<span><strong>S. Tan</strong>, I. Leven, ..., T. Head‐Gordon</span>} journal="J. Chem. Theory Comput." year={2020} doi='10.1021/acs.jctc.0c00514'/>
</Section>

const ProfessonalExperience = () => <Section title="Professional Experience">
  <Research title="Deep Learning Compiler Engineer Intern" institution='NVIDIA' supervisor='Yuan Lin (Deep Learning Compiler Team)' start={new Date('2022-05-01 04:00')} end={new Date('2022-08-01 04:00')} location='Santa Clara, CA'>
    <li>Investigated the heuristics of choosing kernels and compilation parameters during GEMM + epilogue fusion, and improved the optimal tactic hit by 70%</li>
    <li>Accelerated the layer fusion compilation by 40%, by a combination of caching, multi-threading and reducing trial compilations</li>
  </Research>
</Section>

const ResearchExperience = () => <Section title="Research Experience">
  <Research title="Efficient Higher-order Automatic Differentiation for Differential Models" institution='Massachusetts Institute of Technology' supervisor='Christopher Rackauckas & Alan Edelman' start={new Date('2022-09-01 04:00')}  location='Cambridge, MA'>
    <li>Developing higher-order forward-mode automatic differentiation (AD) algorithms that scale linearly with the order, suitable for differential models like ODEs and PDEs</li>
    <li>Synthesizing code that is compiler-friendly and compatible with reverse-mode AD libraries like Zygote.jl, by aggressively specializing with compile-time type information</li>
    <li>Deriving higher-order differentiation rules automatically from first-order chain rules with symbolic computation and metaprogramming in Julia</li>
  </Research>
  <Divider />
  <Research title="Low-level Automatic Differentiation for Linear Algebra Routines" institution='Massachusetts Institute of Technology' supervisor='Christopher Rackauckas & Alan Edelman' start={new Date('2021-09-01 04:00')} end={new Date('2022-06-01 04:00')}  location='Cambridge, MA'>
    <li>Joined the Enzyme project (enzyme.mit.edu), an automatic differentiation framework based on source code transformation at LLVM intermediate representation (IR) level, which can differentiate through all languages with a LLVM backend (e.g. Julia, C++, Fortran)</li>
    <li>Synthesized derivatives of BLAS/LAPACK kernels with generated kernels and calls to other BLAS/LAPACK kernels, and performed extensive optimizations based on linear algebra relations</li>
    <li>Outperformed other high-level AD frameworks in Julia with 1.3× speed on a linear algebra benchmark set</li>
  </Research>
  <Divider />
  <Research title="Optimization Methods for Self-Consistent Field Functional Models" institution='Peking University' supervisor='Weinan E & Linfeng Zhang' start={new Date('2020-12-01 04:00')} end={new Date('2021-06-01 04:00')} location='Beijing'>
    <li>Modeled the exchange-correlation density functional in generalized Kohn-Sham theory with deep neural networks and descriptors from density matrices</li>
    <li>Established a comprehensive theory for using physical quantities data that depends on the functional minimization result to train the functional model, in other words, addressed the “differentiate through argmin” problem</li>
    <li>Implemented the training process with multiple types of physical quantity data, such as energy band structure and dipole moment</li>
    <li>Improved the accuracy and generalization performance of the model, obtained an average energy error of 0.06 kcal/mol on a test set that includes 1200 water molecule configurations labeled with SCAN0 functional (48% less than previous methods)</li>
  </Research>
  <Divider />
  <Research title="Coarse-Grained Modeling of Force Fields with Noise Contrastive Learning" institution='Massachusetts Institute of Technology' supervisor='Bin Zhang' start={new Date('2020-05-01 04:00')} end={new Date('2020-08-01 04:00')} location='Cambridge, MA (Remote)'>
    <li>Modeled the coarse-grained force fields of DNAs from configurations sampled from all-atom simulation trajectories</li>
    <li>Utilized noise contrastive learning for smooth and tractable training of force field parameters</li>
    <li>Constructed the “noise” distribution with normalizing flows in which probability distribution functions are computationally tractable and easy to sample, thereby provided a good baseline for the force fields</li>
    <li>Obtained an efficient and systematic coarse-graining workflow, outperforming traditional force-mapping scheme that is hard to train</li>
  </Research>
  <Divider />
  <Research title="Extended Lagrangian Scheme for Simulating Reactive Chemical Systems" institution='University of California, Berkeley' supervisor='Teresa Head-Gordon & Lin Lin' start={new Date('2019-12-01 04:00')} end={new Date('2020-04-01 04:00')} location='Berkeley, CA'>
    <li>Investigated reactive chemial systems with fluctuating charges described with differential-algebraic equations</li>
    <li>Developed an extended Lagrangian scheme to replace the algebraic part with differential dynamics of an extended system, thereby eliminating the expensive charge-equilibration step (i.e. algebraic equation solving) in simulation</li>
    <li>Proved the correctness of this scheme both theoretically and practically (the modified simulation still reproduced statistic and dynamic properties of that system)</li>
  </Research>
</Section>

const Awards = () => <Section title="Awards">
  <Award title="MathWorks Prize for Outstanding Masters Research" awarder="MIT Center for Computational Science and Engineering" date={new Date('2023-03-02')}/>
  <Award title="Weiming Bachelor" awarder="Peking University (top 1%)" date={new Date('2021-07-02')}/>
  <Award title="Academic Award" awarder="College of Chemistry and Molecular Engineering, Peking University (top 2%)" date={new Date('2021-07-02')}/>
  <Award title="2020 Wusi Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2020-11-02')}/>
  <Award title="National Second Prize in Contemporary Undergraduate Mathematical Contest in Modeling" date={new Date('2019-12-02')}/>
  <Award title="2019 National Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2019-11-02')}/>
  <Award title="Education Aboard Program Scholarhsip" awarder="Peking University" date={new Date('2019-05-02')}/>
  <Award title="2018 National Scholarship & Merit Student" awarder="Peking University (top 1%)" date={new Date('2018-11-02')}/>
</Section>

const Skills = () => <Section title="Skills">
  <SkillList category='Programming Languages' content={['C/C++', 'Julia', 'Python', 'Rust', 'Fortran', 'JavaScript/TypeScript']} />
  <SkillList category='High-Performance Computing' content={['CUDA', 'MPI & OpenMP', 'compiler optimizations with LLVM']} />
  <SkillList category='Scientific Computing & Machine Learning Software' content={['PyTorch', 'Flux.jl', 'PySCF', 'OpenMM', 'LAMMPS']} />
</Section>

export default function App() {
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
    <Educations />
    <Publication />
    <ProfessonalExperience />
    <ResearchExperience />
    <Awards />
    <Skills />
  </main>
  </>;
}

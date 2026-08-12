/* Validated recruiter-answer layer. Keeps the 6 x 50-question catalog but routes many phrasings to concise, fact-checked answers. No answer claims an unfinished project produced results. */
(function(){
  const faq=window.recruiterFAQ;
  if(!faq)return;
  const extra="What does accounting add to your business skill set?";
  if(Array.isArray(faq.questions?.accounting) && !faq.questions.accounting.includes(extra) && faq.questions.accounting.length<50) faq.questions.accounting.push(extra);
  const A={
    profile:"Erik is an NYU Stern BS/MS in Accounting candidate (B.S. in Business, Accounting, GPA 3.933, expected May 2028; M.S. expected August 2028). His experience spans investment analysis, accounting operations, legislative advocacy, legal editing, debate, research, and organizational leadership.",
    education:"Erik is pursuing NYU Stern’s BS/MS in Accounting program. His B.S. in Business, Accounting has a 3.933 GPA and is expected in May 2028; the M.S. in Accounting is expected in August 2028. He previously earned an A.A. with Highest Honors from Hillsborough College, GPA 4.0, in July 2025.",
    fblaBusinessLaw:"Erik won 1st place nationally in FBLA Business Law in 2025. The competition covered contracts, torts, criminal law, cyberlaw, administrative law, agency, family and labor law, tenancy, probate, insurance and warranties, business structures, alternative dispute resolution, loans and bailments, bankruptcy, real estate, trusts, negotiable instruments, and related doctrines and agencies. He also served separately as Durant FBLA Treasurer, where he digitized record-keeping and used Excel for tracking, forecasting, and budgeting.",
    fbla:"As Durant FBLA Treasurer, Erik digitized the chapter’s record-keeping, used Excel to track and forecast revenues and expenses, helped prepare the annual budget report, and expanded state-competition access through roughly $20,000 of member cost coverage while maintaining the carry-over balance and programs.",
    monsoon:"At Monsoon Asset Management, Erik is a Strategic Real Estate and Investments Analyst. His current work includes executing MCMC simulations for portfolio risk assessment, planning the divestment of more than $500,000 from equity into diversified asset classes, and assessing rental-property management options following a distressed situation.",
    raise:"Erik coauthored Florida SB 1676, the RAISE Act. He proposed targeted changes for rural, impoverished, and underrepresented students; modeled more than $600 million of redirected educational funding to keep the proposal cost-neutral; contacted 50+ legislators and relevant organizations; and met with organizations including USACO, The Algebra Project, FACTE, FloridaMakes, FLATE, and SkillsUSA. He also worked with FIRST Robotics to secure lobbying support and helped build bipartisan support.",
    senate:"In the Florida Senate Page Program, Erik was elected by his peers as mock Rules Chair, the third-highest rank. He helped enforce parliamentary procedure during mock sessions, met with 10+ senators, drafted and advanced mock legislation through committees and a mock floor vote, and received special recognition for impromptu speeches.",
    lawreview:"Erik is an Associate Editor for the Undergraduate Law Review at NYU. He reviews legal articles for grammar, factual accuracy, and conceptual consistency and approves articles before submission. His intended spring writing interests include AI legality, environmental law, and animal-rights law.",
    debate:"Erik competes in policy debate through NYU CEDA. At the Jacob M. Weigler Gotham Debate Tournament, he and his partner qualified as quarterfinalists and the team was the 6th seed; Erik also placed 5th as a speaker in the novice division. He has also graded hundreds of pages of IPPF essays and debates and provided detailed feedback to advancing competitors.",
    llm:"The LLM temperature/stability project is not finished. It reached late-stage planning, but repeated sponsor issues delayed implementation and access to the required supercomputer came only a few months ago. The proposed study was designed around 9.76M+ data points and included hierarchical modeling, Fligner-Killeen and Levene’s tests, rules/model/embedding-based sentiment measures, SQL storage, and the Torch HPC cluster. It should be presented as planned research, not as completed analysis or results.",
    mixedllm:"A separate mixed-method project, Changing Social Landscapes, examined LLM bias using 1,600+ sentiment analyses across 54 treatment conditions. Erik also consulted subject-matter experts at Nvidia, Microsoft, Google, Brown University, and UChicago.",
    book:"Erik is writing an autobiographical anthology of more than 100 pages, with intended publication around 2028. It uses unconventional literary structures and philosophical analysis, including a chapter written as a letter of resignation and a four-page consideration of human life relative to other animals that constructs a logarithmic model. He has worked with five expert mentors for feedback and review.",
    aps:"As Co-Founder and Co-President of Accelerated Preparation Society, Erik led a college-essay competition with a scholarship, organized a panel of seven student and teacher judges, met with underprivileged students for college and career planning, trained succeeding staff, and managed weekly leadership operations.",
    homework:"Erik founded Homework Helping and ran the community for more than four years. He grew it to 70+ members, managed 12 staff, supported 200+ individual help tickets, coded a Discord bot to enforce community rules, and organized community events. The server accumulated more than 120,000 messages.",
    scer:"Erik co-founded and led the Student Collective for Educational Reform. He organized 20+ peers, communicated student concerns to Northshore School District leadership, coauthored an extended paper proposing alternatives to an online educational program, ran a school-wide survey with 70+ respondents, and coordinated an annual district-wide survey whose results were discussed with education-technology program leaders.",
    research:"Erik’s research interests include LLM behavior and stability, AI legality around patent/copyright/trademark issues, South Florida environmental systems including Lake Okeechobee, and the future of warfare with particular interest in autonomous systems. These are research interests and should not be represented as completed studies unless a completed project is specifically identified.",
    whyAccounting:"Erik chose accounting because he wants a rigorous foundation in financial reporting, analysis, controls, and business decision-making while retaining flexibility across finance, advisory, law, and technology. He is committed to NYU Stern’s BS/MS in Accounting program.",
    whyFinance:"Erik’s finance interest is grounded in his current investment-analysis work at Monsoon and his accounting training. He is particularly interested in risk, real assets, financial analysis, and strategic decision-making. He should not claim transaction experience he has not had.",
    whyConsulting:"Erik’s strongest consulting-style experience is analytical and stakeholder work rather than a consulting job title. The RAISE Act required modeling, policy design, outreach to 50+ legislators and organizations, and coalition building. His organizational leadership adds experience structuring teams and translating analysis into action.",
    whyLaw:"Erik’s law interest is supported by business-law competition, legal editing, legislative work, debate, and the Florida Senate Page Program. He is especially interested in AI legality, environmental law, and animal-rights law. His record supports an interest in legal work; he is not a lawyer or law-school student.",
    whyTech:"Erik is not a CS major. His technology profile comes from quantitative research, SQL/Python work, LLM research planning, statistical analysis, and interests in AI governance and legality. The strongest positioning is analytical, strategy, policy, or data work around technology rather than software engineering.",
    whyPolicy:"Erik’s policy work combines quantitative modeling and direct stakeholder engagement. The RAISE Act involved more than $600 million of funding analysis, legislative drafting, outreach to 50+ legislators and organizations, and bipartisan coalition building. The Florida Senate Page Program added direct exposure to legislative procedure.",
    data:"Erik has worked with Excel, SQL, and Python in quantitative and research contexts. His strongest verified examples are the planned LLM stability architecture, the 1,600+ sentiment analyses in the mixed-method LLM project, Excel financial/accounting work, and the $600M+ RAISE modeling. He should not claim completed 9.76M-point analysis.",
    writing:"Erik’s writing experience includes legal editing, policy drafting, debate feedback, an autobiographical book manuscript of 100+ pages, and award-winning nonfiction. He also won 1st place in the Hillsborough Council of Teachers of English 2025 Spring Writing Awards for nonfiction.",
    leadership:"Erik’s leadership examples include founding Homework Helping, Accelerated Preparation Society, and Student Collective for Educational Reform; serving as FBLA Treasurer; and leading stakeholder work on the RAISE Act. The common thread is organizing people, creating processes, and communicating goals.",
    uncertainty:"Erik distinguishes research design from research results. The LLM stability project is the clearest example: he developed the research design and technical architecture, but implementation was delayed by sponsorship and supercomputer-access constraints. He should present that work honestly rather than imply results that do not exist.",
    recruiting:"Erik is recruiting across accounting, Big Four and advisory, investment banking and finance, consulting, law firms, policy/public affairs, and non-CS technology or tech-adjacent roles. The common thread is analytical work where evidence has to become a practical decision, argument, or recommendation.",
    interests:"Erik’s interests include backpacking, governance, art, philosophy, creative writing, and cooking."
  };
  const rules=[
    [/tell me about fbla business law|fbla business law|win nationals|business law competition|business law nationals/,'FBLA Business Law',A.fblaBusinessLaw],
    [/fbla treasurer|accounting process|20,000|forecast expenses|budget|control costs/,'FBLA',A.fbla],
    [/monsoon|500,000|mcmc|portfolio risk|divestment|real estate analyst/,'Monsoon',A.monsoon],
    [/raise|sb 1676|600 million|legislator|bipartisan|first robotics/,'RAISE Act',A.raise],
    [/florida senate page|rules chair|senators|parliamentary procedure/,'Florida Senate Page Program',A.senate],
    [/law review|associate editor|legal articles/,'Undergraduate Law Review',A.lawreview],
    [/gotham|debate|speaker|quarterfinal|ipff judge/,'Debate',A.debate],
    [/llm|temperature|9\.76|fligner|levene|torch|hpc|hierarchical|cosine|sentiment stability/,'LLM stability research',A.llm],
    [/1,600|1600|mixed-method|changing social landscapes/,'Changing Social Landscapes',A.mixedllm],
    [/book|anthology|100 pages|author/,'Autobiographical Anthology',A.book],
    [/homework helping|70\+ members|200\+ tickets|12 staff/,'Homework Helping',A.homework],
    [/accelerated preparation|aps|college essay competition/,'Accelerated Preparation Society',A.aps],
    [/student collective|scer|northshore school/,'Student Collective for Educational Reform',A.scer],
    [/research interest|lake okeechobee|autonomous warfare|future of war|ai legality/,'Research interests',A.research],
    [/gpa|graduation|expected may|expected august|education|degree/,'Education',A.education],
    [/why accounting|why stern|bs\/ms|audit|big four|transaction advisory/,'Why accounting',A.whyAccounting],
    [/why investment banking|why ib|why finance|banking|private equity|asset management|real estate finance/,'Finance & investing',A.whyFinance],
    [/why consulting|strategy consulting|management consulting|advisory/,'Consulting',A.whyConsulting],
    [/why law|law firm|big law|corporate law|regulatory law|legal technology/,'Why law',A.whyLaw],
    [/why tech|non-cs|technology strategy|why ai|data analytics|tech-adjacent/,'Technology',A.whyTech],
    [/why policy|government|public-sector|political consulting|regulatory analysis|policy advising/,'Policy',A.whyPolicy],
    [/quantitative|sql|python|technical skill|data|analytics/,'Quantitative & technical work',A.data],
    [/writing|book|editor|fact-check|persuasive/,'Writing',A.writing],
    [/leadership|lead|founder|president|treasurer/,'Leadership',A.leadership],
    [/strength|different|hire you|why should we|what do you bring/,'Profile',A.profile],
    [/incomplete|uncertainty|failed|did not reach|not finished/,'Incomplete research',A.uncertainty],
    [/roles|career goals|targeting|what are you looking for/,'Recruiting direction',A.recruiting],
    [/interest|hobbies|outside work|outside school/,'Interests',A.interests]
  ];
  function answer(question){
    const q=String(question||'').trim();
    if(!q)return {title:'Ask a recruiter question',text:'Try asking about accounting, finance, consulting, law, technology, policy, education, research, or a specific experience.'};
    const s=q.toLowerCase();
    for(const [re,title,text] of rules)if(re.test(s))return {title,text};
    if(/accounting|audit|big four/.test(s))return {title:'Accounting',text:A.whyAccounting+' '+A.fbla};
    if(/finance|bank|invest|real estate/.test(s))return {title:'Finance & investing',text:A.whyFinance+' '+A.monsoon};
    if(/consult/.test(s))return {title:'Consulting',text:A.whyConsulting+' '+A.raise};
    if(/law|legal/.test(s))return {title:'Law',text:A.whyLaw+' '+A.lawreview};
    if(/tech|ai|data/.test(s))return {title:'Technology & analytics',text:A.whyTech+' '+A.data};
    if(/policy|government|regulat/.test(s))return {title:'Policy',text:A.whyPolicy+' '+A.raise};
    return {title:'Erik Mesic',text:A.profile};
  }
  faq.answer=answer;
  const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const render=(question,panel)=>{const result=answer(question);const out=panel?.querySelector('.assistant-answer');if(out)out.innerHTML='<strong>'+esc(result.title)+'</strong><p>'+esc(result.text)+'</p>';};
  document.addEventListener('submit',e=>{const form=e.target;if(!form?.classList?.contains('assistant-form'))return;e.preventDefault();e.stopImmediatePropagation();render(form.querySelector('input')?.value,form.closest('#assistant-panel'));},true);
  document.addEventListener('click',e=>{const button=e.target.closest?.('.assistant-suggestions button');if(!button)return;e.preventDefault();e.stopImmediatePropagation();render(button.textContent,button.closest('#assistant-panel'));},true);
})();
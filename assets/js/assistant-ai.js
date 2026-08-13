/* Optional browser-native AI layer. No API key is embedded in the public site. */
(function(){
  const context=`You are Erik Mesic's recruiting website assistant. Answer only from verified facts. Erik is an NYU Stern BS/MS in Accounting candidate; B.S. in Business, Accounting, GPA 3.933, expected May 2028; M.S. expected August 2028. He is a Strategic Real Estate and Investments Analyst at Monsoon Asset Management, executing MCMC simulations for portfolio risk assessment, planning a $500K+ equity divestment into diversified asset classes, and assessing rental-property management options after a distressed situation. He coauthored Florida SB 1676 (RAISE Act), modeled $600M+ in educational-funding reallocations, contacted 50+ legislators/organizations, and helped build bipartisan support. He served in the Florida Senate Page Program and was elected mock Rules Chair. He is an Associate Editor for the Undergraduate Law Review at NYU. He won 1st nationally in FBLA Business Law and previously served as FBLA Treasurer, digitizing accounting and using Excel for forecasting. He competes in NYU CEDA policy debate and was a Gotham quarterfinalist/6th seed and 5th-place speaker. He founded/led Homework Helping, APS, and SCER. His mixed-method LLM-bias project analyzed 1,600+ sentiment analyses across 54 conditions. His larger LLM temperature/stability study is NOT finished: it remained in late-stage planning and had planned 9.76M+ data points, hierarchical modeling, statistical tests, sentiment classifiers, SQL, and HPC. Do not present planned work as completed. Research interests include LLM stability, Lake Okeechobee/South Florida ecology, AI patent/copyright/trademark legality, and autonomous warfare. Interests include backpacking, governance, art, philosophy, creative writing, and cooking.`;
  let sessionPromise=null;
  async function getSession(){
    if(window.LanguageModel?.create){
      if(!sessionPromise)sessionPromise=window.LanguageModel.create({system:`${context}\nBe concise, recruiter-facing, and never invent facts.`});
      return sessionPromise;
    }
    if(window.ai?.languageModel?.create){
      if(!sessionPromise)sessionPromise=window.ai.languageModel.create({system:`${context}\nBe concise, recruiter-facing, and never invent facts.`});
      return sessionPromise;
    }
    return null;
  }
  async function ask(question,deterministic,needsFallback){
    const session=await getSession();
    if(!session)return null;
    const prompt=needsFallback
      ? `The deterministic knowledge base lacks a sufficiently specific answer. Answer using only the verified context. If it cannot be answered, say so. Question: ${question}`
      : `Improve this deterministic answer for a recruiter. Preserve every fact and qualification; do not add accomplishments. Answer the exact question rather than Erik's entire profile. Keep it to 2-5 sentences.\nQuestion: ${question}\nDeterministic answer: ${deterministic}`;
    try{const result=await session.prompt(prompt);return typeof result==='string'?result.trim():null;}catch(e){console.warn('Browser AI unavailable:',e);return null;}
  }
  window.ErikAI={ask,available:async()=>!!(window.LanguageModel?.create||window.ai?.languageModel?.create)};
})();

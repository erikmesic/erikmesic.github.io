/* Final category routing: every one of the 300 catalog questions receives a lane-appropriate answer when no more-specific rule applies. */
(function(){
  const faq=window.recruiterFAQ;if(!faq)return;
  const A={
    accounting:{title:'Accounting',text:'Erik chose accounting because he wants a rigorous foundation in financial reporting, analysis, controls, and business decision-making while retaining flexibility across finance, advisory, law, and technology. His strongest accounting experience is as Durant FBLA Treasurer, where he digitized record-keeping and used Excel to track and forecast revenues and expenses.'},
    ib_finance:{title:'Finance & investing',text:'Erik’s finance interest is grounded in his current investment-analysis work at Monsoon and his accounting training. He is particularly interested in risk, real assets, financial analysis, and strategic decision-making. At Monsoon he is executing MCMC simulations for portfolio risk assessment and planning a $500K+ equity divestment into diversified asset classes.'},
    consulting:{title:'Consulting',text:'Erik’s strongest consulting-style experience is analytical and stakeholder work rather than a consulting job title. The RAISE Act required modeling, policy design, outreach to 50+ legislators and organizations, and coalition building; his organizational leadership adds experience structuring teams and translating analysis into action.'},
    law:{title:'Law',text:'Erik’s law interest is supported by business-law competition, legal editing, legislative work, debate, and the Florida Senate Page Program. He is especially interested in AI legality, environmental law, and animal-rights law. His record supports an interest in legal work; he is not a lawyer or law-school student.'},
    tech_ai_data:{title:'Technology & analytics',text:'Erik is a non-CS quantitative candidate whose technology profile comes from quantitative research, SQL/Python work, LLM research planning, and statistical analysis. The strongest positioning is analytical, strategy, policy, or data work around technology rather than software engineering.'},
    policy_government:{title:'Policy',text:'Erik’s policy work combines quantitative modeling and direct stakeholder engagement. The RAISE Act involved more than $600 million of funding analysis, legislative drafting, outreach to 50+ legislators and organizations, and bipartisan coalition building; the Florida Senate Page Program added direct exposure to legislative procedure.'}
  };
  const map=new Map();Object.entries(faq.questions||{}).forEach(([cat,qs])=>qs.forEach(q=>map.set(String(q).trim().toLowerCase(),cat)));
  const old=faq.answer;
  faq.answer=q=>{const key=String(q||'').trim().toLowerCase();const prior=old(q);const cat=map.get(key);if(!cat)return prior;const genericTitles=new Set(['Erik Mesic','Profile','Interests','Writing','Leadership','Strengths']);if(genericTitles.has(prior.title))return A[cat]||prior;return prior;};
})();

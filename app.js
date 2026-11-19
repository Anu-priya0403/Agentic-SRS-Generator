const SRSApp = (() => {
  const defaultDescription = `Build a customer support portal where customers can submit service requests, track ticket status, upload attachments, and receive notifications. Support agents should prioritize tickets and managers need reporting dashboards.`;

  const mock = {
    questions: [
      'Which platforms should the system support?',
      'Which user roles need access to the portal?',
      'Are there any required integrations or notification channels?'
    ],
    functional: [
      {id:'FR-01', text:'Customers can create and track service requests.', priority:'High'},
      {id:'FR-02', text:'Support agents can assign, prioritize, and update tickets.', priority:'High'},
      {id:'FR-03', text:'Managers can view operational reporting dashboards.', priority:'Medium'},
      {id:'FR-04', text:'Users can upload attachments to service requests.', priority:'Medium'}
    ],
    nonFunctional: [
      {id:'NFR-01', text:'The portal should be responsive across supported devices.', priority:'High', category:'Usability'},
      {id:'NFR-02', text:'Authenticated pages should enforce role-based access.', priority:'High', category:'Security'},
      {id:'NFR-03', text:'Core ticket pages should load within an agreed performance target.', priority:'Medium', category:'Performance'}
    ],
    useCases: [
      {id:'UC-01', title:'Create service request', actor:'Customer', precondition:'Customer is authenticated.', main_flow:['Open new request form','Enter request details','Attach optional files','Submit request','Receive confirmation'], postcondition:'A new ticket is stored and visible for tracking.'},
      {id:'UC-02', title:'Manage ticket', actor:'Support Agent', precondition:'Agent has access to the assigned queue.', main_flow:['Open ticket queue','Select ticket','Set priority and owner','Add response','Update status'], postcondition:'Ticket history and current state are updated.'}
    ],
    issues: [
      {id:'VAL-01', severity:'Medium', location:'Non-functional requirements', description:'Availability target is not specified.', check:'measurability', fix_target:'Add a measurable uptime target.'},
      {id:'VAL-02', severity:'Low', location:'External interfaces', description:'Notification provider is not named.', check:'completeness', fix_target:'Confirm email/SMS provider if required.'}
    ]
  };

  // window.name survives navigation between local HTML files in the same tab.
  // That makes this prototype usable by double-clicking index.html without a web server.
  function readState(){
    try {
      const parsed = JSON.parse(window.name || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeState(next){
    try { window.name = JSON.stringify(next); } catch (_) {}
  }

  function getState(key, fallback){
    const state = readState();
    return Object.prototype.hasOwnProperty.call(state, key) ? state[key] : fallback;
  }

  function setState(key, value){
    const state = readState();
    state[key] = value;
    writeState(state);
  }

  function description(){ return getState('srs_raw_input', defaultDescription); }
  function answers(){ return getState('srs_answers', {}); }
  function setDescription(v){ setState('srs_raw_input', v); }
  function setAnswers(v){ setState('srs_answers', v); }

  function esc(s=''){
    return String(s).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
  }

  function toast(message){
    let el = document.getElementById('toast');
    if(!el){
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role','status');
      el.setAttribute('aria-live','polite');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2200);
  }

  function navActive(){
    const page = document.body.dataset.page;
    document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === page));
  }

  function bootInput(){
    const form = document.getElementById('inputForm');
    const field = document.getElementById('rawInput');
    const count = document.getElementById('charCount');
    const submit = document.getElementById('generateBtn');
    if(!form || !field || !count || !submit) return;

    field.value = description();
    const update = () => {
      count.textContent = `${field.value.length} characters`;
      submit.disabled = !field.value.trim();
    };
    update();
    field.addEventListener('input', update);

    document.querySelectorAll('[data-example]').forEach(el => el.addEventListener('click', () => {
      field.value = el.dataset.example;
      update();
      field.focus();
    }));

    form.addEventListener('submit', e => {
      e.preventDefault();
      if(!field.value.trim()) return;
      setDescription(field.value.trim());
      setState('srs_skip_questions', false);
      submit.disabled = true;
      submit.textContent = 'Submitting…';
      setTimeout(() => { location.href = 'clarifications.html'; }, 300);
    });
  }

  function bootClarifications(){
    const source = document.getElementById('sourceDescription');
    const wrap = document.getElementById('questions');
    const form = document.getElementById('answersForm');
    const skip = document.getElementById('skipBtn');
    if(!source || !wrap || !form || !skip) return;

    source.textContent = description();
    const existing = answers();
    wrap.innerHTML = mock.questions.map((q,i) => `
      <div class="question">
        <div class="question-head">
          <div class="q-number">${i+1}</div>
          <div><p>${esc(q)}</p></div>
        </div>
        <div class="field">
          <label for="answer${i}">Your answer</label>
          <textarea class="textarea" style="min-height:92px" id="answer${i}" data-question="${esc(q)}" placeholder="Type your answer…">${esc(existing[q] || '')}</textarea>
        </div>
      </div>`).join('');

    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = {};
      wrap.querySelectorAll('[data-question]').forEach(el => { data[el.dataset.question] = el.value.trim(); });
      setAnswers(data);
      setState('srs_skip_questions', false);
      location.href = 'generating.html';
    });

    skip.addEventListener('click', () => {
      setState('srs_skip_questions', true);
      location.href = 'generating.html';
    });
  }

  function bootGenerating(){
    const status = document.getElementById('liveStatus');
    if(!status) return;
    const steps = [
      ['Requirement extraction', 650],
      ['Clarification merge', 1250],
      ['Use cases & SRS drafting', 1900],
      ['Validation', 2550]
    ];

    steps.forEach(([label,time],i) => setTimeout(() => {
      const row = document.querySelector(`[data-step="${i}"]`);
      if(row) row.innerHTML = `<span>${label}</span><strong>Complete</strong>`;
      status.textContent = `${label} complete.`;
    }, time));

    setTimeout(() => {
      status.textContent = 'Generation complete. Open the results when ready.';
      const btn = document.getElementById('continueBtn');
      if(btn) btn.hidden = false;
    }, 2900);
  }

  function buildSrs(){
    const desc = description();
    const a = answers();
    const answerLines = Object.entries(a)
      .filter(([,v]) => v)
      .map(([q,v]) => `<li><strong>${esc(q)}</strong><br>${esc(v)}</li>`)
      .join('') || '<li>No clarification answers supplied.</li>';

    return `<h1>Software Requirements Specification</h1>
      <p><strong>Source description:</strong> ${esc(desc)}</p>
      <h2>1. Clarifications</h2><ul>${answerLines}</ul>
      <h2>2. Functional Requirements</h2><ul>${mock.functional.map(x => `<li><strong>${x.id}</strong> — ${esc(x.text)} <em>(${x.priority})</em></li>`).join('')}</ul>
      <h2>3. Non-functional Requirements</h2><ul>${mock.nonFunctional.map(x => `<li><strong>${x.id}</strong> — ${esc(x.text)} <em>(${x.category}, ${x.priority})</em></li>`).join('')}</ul>
      <h2>4. Use Cases</h2>${mock.useCases.map(x => `<h3>${x.id}: ${esc(x.title)}</h3><p><strong>Actor:</strong> ${esc(x.actor)}<br><strong>Precondition:</strong> ${esc(x.precondition)}<br><strong>Postcondition:</strong> ${esc(x.postcondition)}</p><ol>${x.main_flow.map(s => `<li>${esc(s)}</li>`).join('')}</ol>`).join('')}`;
  }

  function copyText(text){
    if(navigator.clipboard && window.isSecureContext){
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.focus();
      area.select();
      try {
        const ok = document.execCommand('copy');
        ok ? resolve() : reject(new Error('Copy failed'));
      } catch (err) {
        reject(err);
      } finally {
        area.remove();
      }
    });
  }

  function bootResults(){
    const preview = document.getElementById('srsPreview');
    if(!preview) return;
    preview.innerHTML = buildSrs();

    const fr = document.getElementById('frList');
    const nfr = document.getElementById('nfrList');
    const uc = document.getElementById('ucList');

    if(fr) fr.innerHTML = mock.functional.map(x => `<div class="list-item"><div class="list-item-head"><strong>${x.id}</strong><span class="badge ${x.priority==='High'?'high':'medium'}">${x.priority}</span></div><p>${esc(x.text)}</p></div>`).join('');
    if(nfr) nfr.innerHTML = mock.nonFunctional.map(x => `<div class="list-item"><div class="list-item-head"><strong>${x.id} · ${esc(x.category)}</strong><span class="badge ${x.priority==='High'?'high':'medium'}">${x.priority}</span></div><p>${esc(x.text)}</p></div>`).join('');
    if(uc) uc.innerHTML = mock.useCases.map(x => `<div class="list-item"><div class="list-item-head"><strong>${x.id} · ${esc(x.title)}</strong><span class="badge pass">${esc(x.actor)}</span></div><p>${esc(x.precondition)}</p></div>`).join('');

    document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('.tab,.panel').forEach(x => x.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(btn.dataset.target);
      if(panel) panel.classList.add('active');
    }));

    const copyBtn = document.getElementById('copyBtn');
    if(copyBtn) copyBtn.addEventListener('click', () => {
      copyText(preview.innerText)
        .then(() => toast('SRS copied to clipboard'))
        .catch(() => toast('Copy is unavailable in this browser'));
    });

    const downloadBtn = document.getElementById('downloadBtn');
    if(downloadBtn) downloadBtn.addEventListener('click', () => {
      const blob = new Blob([preview.innerText], {type:'text/plain;charset=utf-8'});
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'generated-srs.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
      toast('SRS file downloaded');
    });
  }

  function bootWarnings(){
    const issues = document.getElementById('issues');
    if(!issues) return;
    issues.innerHTML = mock.issues.map(x => `<div class="list-item"><div class="list-item-head"><strong>${esc(x.id)} · ${esc(x.check)}</strong><span class="badge ${x.severity.toLowerCase()}">${esc(x.severity)} severity</span></div><p><strong>Location:</strong> ${esc(x.location)}</p><p>${esc(x.description)}</p><p class="tiny">Technical fix target: ${esc(x.fix_target)}</p></div>`).join('');
  }

  function boot(){
    navActive();
    const page = document.body.dataset.page;
    ({
      input: bootInput,
      clarifications: bootClarifications,
      generating: bootGenerating,
      results: bootResults,
      warnings: bootWarnings
    }[page] || (() => {}))();
  }

  return {boot, toast, mock};
})();

document.addEventListener('DOMContentLoaded', SRSApp.boot);

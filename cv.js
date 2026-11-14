/* ============================================================
   CV: the recruiter document, served at /cv/ and used for print.
   Built from the same DATA as the main page, but a different
   document: different order, plain language, one page in spirit.
   Uses $, esc and ext from app.js.
   ============================================================ */
function renderCV(data) {
  const p = data.person, cv = data.cv, e = data.education, l = p.links;

  /* Spaces around the separator matter: joined tight, the line becomes
     one unbreakable run and pushes a phone screen sideways. */
  const contact = [
    `<a href="mailto:${esc(l.email)}">${esc(l.email)}</a>`,
    `<a href="${esc(l.linkedin)}"${ext(l.linkedin)}>${esc(l.linkedin.replace('https://', ''))}</a>`,
    `<a href="${esc(l.github)}"${ext(l.github)}>${esc(l.github.replace('https://', ''))}</a>`,
    `<span>${esc(p.location)}</span>`
  ].join(' <i aria-hidden="true">·</i> ');

  const skillGroups = [...new Set(data.skills.map(s => s.branch))].map(b => ({
    name: b,
    items: data.skills.filter(s => s.branch === b && s.level >= 3)
      .sort((a, x) => x.level - a.level).map(s => s.name)
  })).filter(g => g.items.length);

  const role = (h, org, dates) => `
    <div class="cv-role-head">
      <h3>${esc(h)} <span class="cv-org">· ${esc(org)}</span></h3>
      <span class="cv-dates">${esc(dates)}</span>
    </div>`;

  $('#cvDoc').innerHTML = `
    <article class="cv-paper">
      <header class="cv-head">
        <div class="cv-head-main">
          <h1 class="cv-name">${esc(p.name)}</h1>
          <p class="cv-headline">${esc(cv.headline)}</p>
          <p class="cv-contact">${contact}</p>
        </div>
        <a class="btn btn-primary cv-dl" href="${esc(cv.file)}" download>Download PDF</a>
      </header>

      <div class="cv-avail">
        <span><b>Available</b> Now, full time</span>
        <span><b>Graduating</b> ${esc(e.graduating)}</span>
        <span><b>Location</b> ${esc(p.location)}</span>
      </div>

      <section class="cv-sec">
        <h2>Profile</h2>
        ${cv.summary.map(para => `<p class="cv-summary">${esc(para)}</p>`).join('')}
      </section>

      <section class="cv-sec">
        <h2>Selected Achievements</h2>
        <ul class="cv-list cv-list-tight">${cv.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
      </section>

      <section class="cv-sec">
        <h2>Technical Skills</h2>
        <div class="cv-skills">
          ${skillGroups.map(g => `
            <div class="cv-skill-group"><h3>${esc(g.name)}</h3><p>${g.items.map(esc).join(' · ')}</p></div>`).join('')}
        </div>
        <div class="cv-skill-group cv-soft">
          <h3>Professional Skills</h3><p>${cv.softSkills.map(esc).join(' · ')}</p>
        </div>
      </section>

      <section class="cv-sec">
        <h2>Selected Projects</h2>
        ${data.projects.slice(0, 5).map(pr => `
          <div class="cv-proj">
            ${role(pr.name, pr.type, pr.year)}
            <p>${esc(pr.blurb)}</p>
            <p class="cv-tech"><b>Technologies:</b> ${pr.stack.map(esc).join(', ')}</p>
          </div>`).join('')}
      </section>

      <section class="cv-sec">
        <h2>Education</h2>
        <div class="cv-role">
          ${role(e.degree, e.school, e.period)}
          <p class="cv-loc">Hobart, Tasmania · Double major: ${esc(e.majors)} · Coursework complete ${esc(e.completed)}, graduating ${esc(e.graduating)}</p>
          <p class="cv-course"><b>Relevant coursework:</b> ${cv.coursework.map(esc).join(', ')}</p>
        </div>
      </section>

      <section class="cv-sec">
        <h2>Certifications</h2>
        <ul class="cv-list cv-list-tight">${cv.certs.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      </section>

      <section class="cv-sec">
        <h2>Professional Experience</h2>
        ${cv.experience.map(x => `
          <div class="cv-role">
            ${role(x.role, x.org, x.period)}
            <p class="cv-loc cv-where">${esc(x.location)}</p>
            <ul class="cv-list">${x.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
          </div>`).join('')}
      </section>

      <section class="cv-sec">
        <h2>References</h2>
        <div class="cv-refs">
          ${cv.references.map(r => `
            <div class="cv-ref"><b>${esc(r.name)}</b><span>${esc(r.role)}</span><em>${esc(r.org)}</em></div>`).join('')}
        </div>
        <p class="cv-ref-note">Contact details available on request.</p>
      </section>

      <!-- Every term here also appears above; the block exists so a keyword
           search over the page finds them all. Collapsed, not removed. -->
      <section class="cv-sec cv-sec-keywords">
        <details class="cv-keys">
          <summary>Keyword index <span>${cv.keywords.length} terms</span></summary>
          <p class="cv-keywords">${cv.keywords.map(esc).join(' · ')}</p>
        </details>
      </section>

      <footer class="cv-foot">
        <span>${esc(p.name)} · ${esc(p.location)}</span>
        <span>Last updated ${esc(data.meta.updated)}</span>
      </footer>
    </article>`;
}

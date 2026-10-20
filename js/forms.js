/* DFL Importers - form handling.
   Posts to Supabase (REST insert into website_inquiries; anon key is insert-only via RLS).
   While SUPABASE_URL / SUPABASE_ANON_KEY are empty, forms fall back to opening the visitor's email app. */
(function () {
  var SUPABASE_URL = '';        // e.g. https://xxxx.supabase.co
  var SUPABASE_ANON_KEY = '';   // public anon key (safe in the browser ONLY because RLS is insert-only)
  var TABLE = 'website_inquiries';
  var FALLBACK_EMAIL = 'info@dflimporters.com';

  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('button[type="submit"]');

    function show(kind, text) { msg.className = 'form-msg ' + kind; msg.textContent = text; msg.setAttribute('role', 'alert'); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.hp input').value) return;            // honeypot: bots fill it, people can't see it
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var fd = new FormData(form), data = {
        type: form.dataset.form,
        first_name: fd.get('first_name') || null,
        last_name: fd.get('last_name') || null,
        company: fd.get('company') || null,
        website: fd.get('website') || null,
        email: fd.get('email'),
        phone: fd.get('phone') || null,
        parish: fd.get('parish') || null,
        industry: fd.get('industry') || null,
        product_interest: fd.getAll('product_interest'),
        message: fd.get('message') || null,
        source_page: location.pathname
      };

      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        var body = Object.keys(data).filter(function (k) { return data[k] && k !== 'type' && k !== 'source_page' && !(Array.isArray(data[k]) && !data[k].length); })
          .map(function (k) { return k.replace('_', ' ') + ': ' + data[k]; }).join('\n');
        location.href = 'mailto:' + FALLBACK_EMAIL + '?subject=' + encodeURIComponent('Website ' + data.type + ' enquiry') + '&body=' + encodeURIComponent(body);
        show('ok', 'Your email app should open with your message ready to send. If it does not, please email ' + FALLBACK_EMAIL + ' or call 876-622-6718.');
        return;
      }

      btn.disabled = true; var label = btn.textContent; btn.textContent = 'Sending...';
      fetch(SUPABASE_URL + '/rest/v1/' + TABLE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: 'Bearer ' + SUPABASE_ANON_KEY, Prefer: 'return=minimal' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset(); show('ok', 'Thank you. We have your message and will be in touch soon.');
      }).catch(function () {
        show('err', 'Sorry, something went wrong. Please call 876-622-6718 or email ' + FALLBACK_EMAIL + '.');
      }).then(function () { btn.disabled = false; btn.textContent = label; });
    });
  });
})();

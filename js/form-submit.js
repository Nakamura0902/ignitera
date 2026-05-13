/* ================================================================
   Contact Form → Supabase 送信ハンドラ
   依存: supabase.js (CDN), supabase-config.js (_supabase)
================================================================ */

function initContactForm(formEl, serviceId) {
  if (!formEl) return;

  const submitBtn = formEl.querySelector('[type="submit"]');
  const originalBtnHTML = submitBtn.innerHTML;
  const noteEl = formEl.querySelector('.sp-form-note');

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>送信中…</span>';

    const serviceTypeField =
      formEl.querySelector('[name="service-type"]') ||
      formEl.querySelector('[name="use-case"]');

    const payload = {
      service:      serviceId,
      name:         formEl.querySelector('[name="name"]').value.trim(),
      company:      formEl.querySelector('[name="company"]')?.value.trim() || null,
      email:        formEl.querySelector('[name="email"]').value.trim(),
      service_type: serviceTypeField?.value || null,
      message:      formEl.querySelector('[name="message"]')?.value.trim() || null,
    };

    const { error } = await _supabase
      .from('contact_submissions')
      .insert([payload]);

    if (error) {
      console.error('Supabase insert error:', error);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      if (noteEl) {
        noteEl.style.color = '#ef4444';
        noteEl.textContent = '送信に失敗しました。時間をおいて再度お試しください。';
      }
      return;
    }

    // 成功時: フォームを完了メッセージに置き換え
    const isPreReg = serviceId === 'shoumei-infra';
    formEl.innerHTML = `
      <div class="sp-form-success">
        <div class="sp-form-success-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="rgba(0,198,255,0.12)"/>
            <path d="M12 20l6 6 10-10" stroke="var(--color-cyan)" stroke-width="2.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>${isPreReg ? '事前登録が完了しました' : '送信が完了しました'}</h3>
        <p>${isPreReg
          ? 'ご登録ありがとうございます。<br>ローンチ情報・ベータ版招待をメールでお知らせします。'
          : 'お問い合わせいただきありがとうございます。<br>通常2営業日以内にご返信いたします。'
        }</p>
      </div>
    `;
  });
}

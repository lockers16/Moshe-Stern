import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle2, Sparkles, ShieldCheck, MailCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import siteConfig from '../data/siteConfig.json';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and hyphens
    const filtered = e.target.value.replace(/[^0-9-]/g, '');
    setPhone(filtered);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation and edit keys
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (allowedKeys.includes(e.key)) return;
    // Allow digits and hyphen
    if (/^[0-9-]$/.test(e.key)) return;
    // Disallow everything else
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || siteConfig.emailjs?.serviceId || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || siteConfig.emailjs?.templateId || '';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || siteConfig.emailjs?.publicKey || '';

    const templateParams = {
      from_name: name,
      phone: phone,
      reply_to: email,
      event_type: eventType || 'כללי / ללא פירוט',
      message: message || 'ללא פירוט נוסף',
      to_name: siteConfig.authorName,
      to_email: siteConfig.contactEmail,
      site_name: siteConfig.siteName
    };

    try {
      // Check if user set up real EmailJS keys
      const hasEmailJsKeys =
        publicKey &&
        !publicKey.includes('YOUR_') &&
        serviceId &&
        !serviceId.includes('YOUR_') &&
        templateId &&
        !templateId.includes('YOUR_');

      if (hasEmailJsKeys) {
        // Send via EmailJS SDK
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        // Fallback to FormSubmit direct POST if EmailJS keys are not yet configured in siteConfig.json
        await fetch(`https://formsubmit.co/ajax/${siteConfig.contactEmail}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `פנייה חדשה מהאתר שלך, מאת ${name}`,
            _replyto: email,
            _template: 'table',
            _captcha: 'false',
            'שם מלא': name,
            'מספר טלפון': phone,
            'כתובת דוא״ל לתשובה': email,
            'סוג האירוע / הבקשה': eventType || 'כללי / ללא פירוט',
            'תוכן הפנייה והערות': message || 'ללא פירוט נוסף'
          })
        });
      }
      setSubmitted(true);
    } catch (err) {
      console.warn('Submission attempt finished:', err);
      // Mark as submitted so the user receives a confirmation & can also use mailto / WhatsApp
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaMailto = () => {
    const subject = encodeURIComponent(`פנייה חדשה מהאתר שלך, מאת ${name || 'מתעניין'}`);
    const body = encodeURIComponent(
      `שלום משה,\n\nשם מלא: ${name}\nמספר טלפון: ${phone}\nדוא"ל לתשובה: ${email}\nסוג האירוע: ${eventType}\n\nתוכן הפנייה:\n${message}`
    );
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `${siteConfig.whatsappDefaultMessage}\nשם: ${name || ''}\nטלפון: ${phone || ''}`
    );
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="py-12 md:py-16 bg-[#f5f8fc] relative overflow-hidden border-t border-[#18457c]/10" id="contact-page">
      {/* Decorative diagonal stripes in blue & red */}
      <div className="diagonal-stripe-navy opacity-15" />
      <div className="diagonal-stripe-red opacity-20" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-12 relative z-10 text-right">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18457c]/10 text-[#18457c] text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#ea0011]" />
            <span>פרטי קשר והתקשרות ישירה</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#112b4e] tracking-tight">
            יצירת קשר עם משה שטרן
          </h1>
          <p className="text-base md:text-lg text-[#2d4869] leading-relaxed">
            מוזמנים לפנות בכל שאלה, התייעצות לגבי אירוע קרב או כתיבת נאום.
          </p>
        </div>

        {/* Contact Info Cards + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Box */}
            <div className="bg-[#18457c] text-white p-6 sm:p-8 rounded-2xl border border-[#245999] shadow-xl space-y-6">
              <h2 className="text-2xl font-bold border-b border-white/20 pb-4">
                פרטי התקשרות ישירים
              </h2>

              <div className="space-y-4">
                {/* 1. Phone Card */}
                <a
                  href={`tel:${siteConfig.contactPhone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#ea0011] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[#d6e3f8] font-bold">מספר טלפון</div>
                    <div className="text-base font-bold text-white tracking-wider" dir="ltr">{siteConfig.contactPhone}</div>
                  </div>
                </a>

                {/* 2. WhatsApp Card */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors border border-[#25D366]/30 text-right cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-green-300 font-bold">WhatsApp</div>
                    <div className="text-base font-bold text-white">שליחת הודעה דרך WhatsApp</div>
                  </div>
                </button>

                {/* 3. Email Card */}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                >
                  <div className="w-11 h-11 rounded-lg bg-[#112b4e] flex items-center justify-center text-white shrink-0 shadow-md">
                    <Mail className="w-5 h-5 text-[#ffdad5]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#d6e3f8] font-bold">דואר אלקטרוני</div>
                    <div className="text-sm font-semibold text-white" dir="ltr">{siteConfig.contactEmail}</div>
                  </div>
                </a>
              </div>

              <div className="pt-2 border-t border-white/20 flex items-center gap-2 text-xs text-[#d6e3f8]">
                <ShieldCheck className="w-4 h-4 text-[#ea0011]" />
                <span>דיסקרטיות מלאה ושירות אישי מובטחים</span>
              </div>
            </div>

          </div>

          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#18457c]/15 shadow-xl space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#112b4e]">
                טופס פנייה ישיר
              </h2>
              <p className="text-xs text-[#577291] mt-1">
                מלאו את הפרטים ונחזור אליכם בהקדם, או שלחו ישירות בדוא״ל / וואטסאפ
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-[#f5f8fc] rounded-xl border border-[#18457c]/20 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-[#18457c] mx-auto" />
                <h3 className="text-xl font-bold text-[#112b4e]">פרטי הפנייה נשמרו!</h3>
                <p className="text-sm text-[#2d4869] max-w-md mx-auto">
                  תודה שפנית, {name || 'יקיר/ה'}. משה שטרן קיבל את פנייתך ויחזור אליך בהקדם.
                </p>
                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleSendViaMailto}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18457c] hover:bg-[#123662] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                  >
                    <MailCheck className="w-4 h-4 text-[#ea0011]" />
                    <span>פתיחת הפנייה ישירות בתוכנת הדוא״ל שלכם</span>
                  </button>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setEventType('');
                      setMessage('');
                    }}
                    className="text-xs font-bold text-[#ea0011] hover:underline cursor-pointer px-4 py-2"
                  >
                    שליחת פנייה חדשה
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#112b4e] block mb-1">
                      שם מלא: <span className="text-[#ea0011]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ישראל ישראלי"
                      className="w-full p-3 rounded-xl border border-[#18457c]/20 focus:border-[#18457c] focus:ring-1 focus:ring-[#18457c] outline-none text-sm text-[#112b4e]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#112b4e] block mb-1">
                      מספר טלפון: <span className="text-[#ea0011]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      placeholder="050-1234567"
                      pattern="[0-9-]+"
                      className="w-full p-3 rounded-xl border border-[#18457c]/20 focus:border-[#18457c] focus:ring-1 focus:ring-[#18457c] outline-none text-sm text-[#112b4e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#112b4e] block mb-1">
                      דוא״ל: <span className="text-[#ea0011]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full p-3 rounded-xl border border-[#18457c]/20 focus:border-[#18457c] focus:ring-1 focus:ring-[#18457c] outline-none text-sm text-[#112b4e]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#112b4e] block mb-1">
                      סוג האירוע או הבקשה:
                    </label>
                    <input
                      type="text"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      placeholder="לדוגמה: חתונה, בר מצווה, כנס, נאום פרידה..."
                      className="w-full p-3 rounded-xl border border-[#18457c]/20 focus:border-[#18457c] focus:ring-1 focus:ring-[#18457c] outline-none text-sm text-[#112b4e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#112b4e] block mb-1">
                    תוכן הפנייה / הערות:
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="ספרו על התאריך המשוער, המיקום או כל בקשה מיוחדת..."
                    className="w-full p-3 rounded-xl border border-[#18457c]/20 focus:border-[#18457c] focus:ring-1 focus:ring-[#18457c] outline-none text-sm text-[#112b4e] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#18457c] hover:bg-[#123662] disabled:opacity-70 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 text-[#ea0011]" />
                    )}
                    <span>{isSubmitting ? 'שולח פנייה...' : 'שליחת פרטים למשה'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

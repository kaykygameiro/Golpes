import React from 'react';

function Icon({ type, className }: { type: 'alert' | 'info' | 'phone'; className?: string }) {
  if (type === 'alert') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.3 4.2l-7.7 13.3A2 2 0 004.3 20h15.4a2 2 0 001.7-2.5L13.7 4.2a2 2 0 00-3.4 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (type === 'phone') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.9v3a2 2 0 01-2.2 2c-9.2-.8-16.5-8.1-17.3-17.3A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8.9 9.1a16 16 0 006 6l.7-.9a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function HelpSection() {
  const faqs = [
    {
      title: 'Como identificar um golpe?',
      content: 'Fique atento a mensagens urgentes pedindo dinheiro, links desconhecidos por SMS ou e-mail, e promessas de dinheiro fácil online. Sempre desconfie e nunca passe senhas.',
      icon: <Icon type="alert" className="w-6 h-6 text-yellow-500" />
    },
    {
      title: 'O que fazer se eu cair num golpe?',
      content: 'Mantenha a calma. Avise seu banco imediatamente pelo número oficial no verso do cartão. Mude suas senhas. Faça um Boletim de Ocorrência na polícia.',
      icon: <Icon type="info" className="w-6 h-6 text-blue-500" />
    },
    {
      title: 'Contatos Úteis',
      content: 'Procon: Ligue 151.\nPolícia Militar: Ligue 190.\nDisque Denúncia: Ligue 181.',
      icon: <Icon type="phone" className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl border-2 border-slate-100 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            {faq.icon}
            <h3 className="text-xl font-bold text-slate-800">{faq.title}</h3>
          </div>
          <p className="text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-line">
            {faq.content}
          </p>
        </div>
      ))}
    </div>
  );
}

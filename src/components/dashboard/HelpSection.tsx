import React, { useId, useMemo, useState } from 'react';

function ChevronDown({ className }: { className?: string }) {
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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function HelpSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>('identify');

  const items = useMemo(
    () => [
      {
        id: 'identify',
        title: 'Como identificar um golpe?',
        content:
          'Desconfie de urgência ("agora"/"última chance"), pedidos de dinheiro, links encurtados e promessas fáceis.\n' +
          'Nunca compartilhe códigos de verificação ou senhas. Confirme sempre por um canal oficial.'
      },
      {
        id: 'what-to-do',
        title: 'O que fazer se eu cair num golpe?',
        content:
          'Entre em contato com o banco pelos canais oficiais, altere suas senhas e registre um boletim de ocorrência.\n' +
          'Se houver risco imediato, procure ajuda pelo telefone de emergência.'
      },
      {
        id: 'tips',
        title: 'Dicas rápidas de segurança',
        content:
          'Confira a URL completa no navegador, evite clicar em links recebidos por mensagem e valide a identidade da pessoa por ligação.\n' +
          'Quando tiver dúvida, pare e verifique: a pressa é o melhor amigo do golpista.'
      }
    ],
    []
  );

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-4">
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <header className="px-5 pt-5">
          <h2 className="text-lg font-extrabold text-slate-900">Ajuda</h2>
          <p className="mt-1 text-sm font-medium text-slate-700">
            Abra os itens abaixo e use os contatos de emergência quando necessário.
          </p>
        </header>

        <div className="px-2 pb-2 pt-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const buttonId = `${baseId}-${item.id}-button`;
            const panelId = `${baseId}-${item.id}-panel`;
            return (
              <div key={item.id} className="px-3">
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={
                    'w-full min-h-[44px] py-3 px-3 rounded-2xl flex items-center justify-between gap-3 ' +
                    'focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none ' +
                    (isOpen ? 'bg-slate-50' : 'hover:bg-slate-50')
                  }
                >
                  <span className="text-left text-sm font-extrabold text-slate-900">{item.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={
                    'grid transition-[grid-template-rows,opacity] duration-200 ease-out ' +
                    (isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')
                  }
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-2 text-sm text-slate-700 font-medium whitespace-pre-line">
                      {item.content}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-200 my-2" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
        <h3 className="text-base font-extrabold text-slate-900">Contatos de emergência</h3>
        <p className="mt-1 text-sm font-medium text-slate-700">
          Toque para ligar (use apenas em caso real).
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href="tel:151"
            aria-label="Ligar para o Procon 151"
            className="min-h-[44px] rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none px-4 py-3"
          >
            <div className="text-xs font-extrabold text-slate-600">PROCON</div>
            <div className="text-lg font-extrabold text-slate-900">151</div>
          </a>
          <a
            href="tel:190"
            aria-label="Ligar para a Polícia Militar 190"
            className="min-h-[44px] rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none px-4 py-3"
          >
            <div className="text-xs font-extrabold text-slate-600">POLÍCIA MILITAR</div>
            <div className="text-lg font-extrabold text-slate-900">190</div>
          </a>
          <a
            href="tel:181"
            aria-label="Ligar para o Disque Denúncia 181"
            className="min-h-[44px] rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none px-4 py-3"
          >
            <div className="text-xs font-extrabold text-slate-600">DISQUE DENÚNCIA</div>
            <div className="text-lg font-extrabold text-slate-900">181</div>
          </a>
          <a
            href="tel:197"
            aria-label="Ligar para a Polícia Civil 197"
            className="min-h-[44px] rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:outline-none px-4 py-3"
          >
            <div className="text-xs font-extrabold text-slate-600">POLÍCIA CIVIL</div>
            <div className="text-lg font-extrabold text-slate-900">197</div>
          </a>
        </div>
      </section>
    </div>
  );
}
